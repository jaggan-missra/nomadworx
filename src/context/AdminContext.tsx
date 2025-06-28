import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'manager';
  lastLogin: string;
  createdAt: string;
}

interface AdminState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
}

type AdminAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AdminUser }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: AdminUser }
  | { type: 'SIGNUP_SUCCESS'; payload: AdminUser };

const AdminContext = createContext<{
  state: AdminState;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
} | undefined>(undefined);

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return { 
        isAuthenticated: true, 
        user: action.payload, 
        loading: false 
      };
    case 'LOGIN_FAILURE':
      return { 
        isAuthenticated: false, 
        user: null, 
        loading: false 
      };
    case 'LOGOUT':
      return { 
        isAuthenticated: false, 
        user: null, 
        loading: false 
      };
    case 'LOAD_USER':
      return { 
        isAuthenticated: true, 
        user: action.payload, 
        loading: false 
      };
    default:
      return state;
  }
};

// Secure storage for admin users (in production, this would be a database)
const getStoredUsers = (): AdminUser[] => {
  const stored = localStorage.getItem('admin_users');
  return stored ? JSON.parse(stored) : [];
};

const storeUsers = (users: AdminUser[]) => {
  localStorage.setItem('admin_users', JSON.stringify(users));
};

// Hash password function (simplified - in production use proper hashing)
const hashPassword = (password: string): string => {
  // This is a simple hash for demo purposes
  // In production, use bcrypt or similar
  return btoa(password + 'nomadworx_salt');
};

const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    isAuthenticated: false,
    user: null,
    loading: false
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('admin_current_user');
    if (savedUser) {
      dispatch({ type: 'LOAD_USER', payload: JSON.parse(savedUser) });
    }
  }, []);

  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
    role: 'super_admin' | 'admin' | 'manager';
    firstName: string;
    lastName: string;
    inviteCode?: string;
  }): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    
    // Check if username or email already exists
    const existingUser = users.find(u => 
      u.username === userData.username || u.email === userData.email
    );
    
    if (existingUser) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
    
    // Validate invite codes for elevated roles
    const validInviteCodes = {
      'super_admin': 'NOMADWORX-SUPER-2024',
      'admin': 'NOMADWORX-ADMIN-2024'
    };
    
    if (userData.role === 'super_admin' || userData.role === 'admin') {
      if (userData.inviteCode !== validInviteCodes[userData.role]) {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    }
    
    const newUser: AdminUser = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    // Store user with hashed password
    const userWithPassword = {
      ...newUser,
      passwordHash: hashPassword(userData.password)
    };
    
    users.push(userWithPassword);
    storeUsers(users);
    
    localStorage.setItem('admin_current_user', JSON.stringify(newUser));
    dispatch({ type: 'SIGNUP_SUCCESS', payload: newUser });
    return true;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    const user = users.find(u => u.username === username);
    
    if (user && verifyPassword(password, (user as any).passwordHash)) {
      const userWithoutPassword = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        lastLogin: new Date().toISOString(),
        createdAt: user.createdAt
      };
      
      // Update last login
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u
      );
      storeUsers(updatedUsers);
      
      localStorage.setItem('admin_current_user', JSON.stringify(userWithoutPassword));
      dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_current_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AdminContext.Provider value={{ state, login, signup, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};