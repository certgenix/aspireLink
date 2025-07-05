import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/firebase';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  requireAuth = true 
}) => {
  const { currentUser, userProfile, loading } = useAuth();
  
  // Debug logging (can be removed in production)
  console.log('ProtectedRoute debug:', {
    currentUser: !!currentUser,
    userProfile: userProfile ? { role: userProfile.role, uid: userProfile.uid } : null,
    loading,
    allowedRoles,
    requireAuth
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (requireAuth && !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="mb-4">You need to be logged in to access this page.</p>
          <a href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Check role-based access if roles are specified
  if (allowedRoles && allowedRoles.length > 0) {
    // If user is logged in but no profile exists yet, wait a bit more
    if (currentUser && !userProfile) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading user profile...</div>
        </div>
      );
    }
    
    // If user has profile but wrong role, deny access
    if (userProfile && !allowedRoles.includes(userProfile.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="mb-4">You don't have permission to access this page.</p>
            <p className="text-sm text-gray-600">Required role: {allowedRoles.join(' or ')}</p>
            <p className="text-sm text-gray-600">Your role: {userProfile?.role || 'No role assigned'}</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};