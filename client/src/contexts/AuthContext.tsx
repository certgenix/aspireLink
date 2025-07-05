import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, getUserProfile, createUserProfile, updateLastActive, logOut, UserProfile } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [profileLoadTimeout, setProfileLoadTimeout] = useState<NodeJS.Timeout | null>(null);

  // Session timeout: 7 minutes
  const SESSION_TIMEOUT = 7 * 60 * 1000; // 7 minutes in milliseconds

  // Track user activity
  const updateActivity = () => {
    setLastActivity(Date.now());
    if (currentUser) {
      updateLastActive(currentUser.uid);
    }
  };

  // Set up activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimer = () => updateActivity();
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [currentUser]);

  // Check for session timeout
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser && Date.now() - lastActivity > SESSION_TIMEOUT) {
        console.log('Session expired due to inactivity');
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentUser, lastActivity]);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      // Clear any existing timeout
      if (profileLoadTimeout) {
        clearTimeout(profileLoadTimeout);
        setProfileLoadTimeout(null);
      }

      if (user) {
        setCurrentUser(user);
        
        // Set a timeout to prevent infinite loading
        const timeout = setTimeout(() => {
          console.warn('Profile loading timed out, creating fallback profile');
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            role: 'student',
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            createdAt: new Date(),
            lastActive: new Date()
          };
          setUserProfile(fallbackProfile);
          setLoading(false);
        }, 10000); // 10 second timeout
        
        setProfileLoadTimeout(timeout);
        
        try {
          // Try to get user profile from Firestore with a shorter timeout
          console.log('Attempting to load profile for:', user.email);
          let profile: UserProfile | null = null;
          
          // Create a race between profile fetch and immediate timeout
          const profilePromise = getUserProfile(user.uid);
          const timeoutPromise = new Promise<null>((resolve) => 
            setTimeout(() => {
              console.warn('Profile fetch timed out after 3 seconds');
              resolve(null);
            }, 3000)
          );
          
          profile = await Promise.race([profilePromise, timeoutPromise]);
          
          // If no profile exists, create a default one (fallback for skipped signup profiles)
          if (!profile) {
            console.log('No user profile found, creating default profile for:', user.email);
            // Default to 'student' role for now - can be updated by admin later
            const defaultRole = 'student';
            try {
              console.log('Attempting to create user profile...');
              await createUserProfile(user, defaultRole, {
                displayName: user.displayName || user.email?.split('@')[0] || 'User'
              });
              console.log('Profile created, fetching...');
              profile = await getUserProfile(user.uid);
              console.log('Profile fetched:', profile);
            } catch (profileError) {
              console.warn('Failed to create user profile, using fallback:', profileError);
              // Fallback profile for immediate UI functionality
              profile = {
                uid: user.uid,
                email: user.email || '',
                role: defaultRole,
                displayName: user.displayName || user.email?.split('@')[0] || 'User',
                createdAt: new Date(),
                lastActive: new Date()
              };
              console.log('Using fallback profile:', profile);
            }
          } else {
            console.log('Existing profile found:', profile);
          }
          
          // Clear timeout since profile loaded successfully
          if (profileLoadTimeout) {
            clearTimeout(profileLoadTimeout);
            setProfileLoadTimeout(null);
          }
          
          setUserProfile(profile);
          setLoading(false);
          updateActivity();
        } catch (error) {
          console.warn('Error handling user profile:', error);
          // Create basic fallback profile with 'student' role to prevent access denied
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            role: 'student',
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            createdAt: new Date(),
            lastActive: new Date()
          };
          console.log('Using fallback profile:', fallbackProfile);
          setUserProfile(fallbackProfile);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const { signInWithEmail } = await import('@/lib/firebase');
    await signInWithEmail(email, password);
  };

  const logout = async () => {
    await logOut();
    setCurrentUser(null);
    setUserProfile(null);
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!userProfile) return false;
    if (Array.isArray(role)) {
      return role.includes(userProfile.role);
    }
    return userProfile.role === role;
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    login,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};