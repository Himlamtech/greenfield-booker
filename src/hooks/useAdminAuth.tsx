
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type AdminUser = {
  email: string;
} | null;

type AdminAuthContextType = {
  admin: AdminUser;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error('Failed to parse admin data:', error);
        localStorage.removeItem('admin');
      }
    }
  }, []);

  const login = (email: string) => {
    const adminUser = { email };
    localStorage.setItem('admin', JSON.stringify(adminUser));
    setAdmin(adminUser);
  };

  const logout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ 
      admin, 
      login, 
      logout,
      isAuthenticated: !!admin
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Route guard component to protect admin routes
export const RequireAdminAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};
