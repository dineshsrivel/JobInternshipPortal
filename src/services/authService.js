import api from './api';

const simulateDelay = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 400));

export const authService = {
  login: async (email, password, rememberMe) => {
    // In production: const response = await api.post('/auth/login', { email, password }); return response.data;
    if (email === 'admin@jobpulse.io' && password === 'admin123') {
      const authData = {
        token: 'jwt_mock_token_admin_987654321_secret',
        user: {
          id: 'ADM-001',
          name: 'Sarah Jenkins',
          email: 'admin@jobpulse.io',
          role: 'Super Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          lastLogin: new Date().toISOString(),
          twoFactorEnabled: true
        }
      };
      return await simulateDelay(authData);
    }
    // Allow any demo login if valid email structure for seamless testing
    if (email && password && password.length >= 6) {
      const authData = {
        token: `jwt_mock_token_${Date.now()}`,
        user: {
          id: 'ADM-001',
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email,
          role: 'Portal Administrator',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          lastLogin: new Date().toISOString(),
          twoFactorEnabled: false
        }
      };
      return await simulateDelay(authData);
    }
    throw new Error('Invalid email address or password. (Demo: admin@jobpulse.io / admin123)');
  },

  forgotPassword: async (email) => {
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    return await simulateDelay({
      success: true,
      message: `Password reset instructions have been sent to ${email}.`
    });
  },

  resetPassword: async (token, newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    return await simulateDelay({
      success: true,
      message: 'Your password has been successfully reset. Please log in with your new password.'
    });
  },

  getProfile: async () => {
    const userStr = localStorage.getItem('admin_user') || sessionStorage.getItem('admin_user');
    if (!userStr) throw new Error('Not authenticated');
    return await simulateDelay(JSON.parse(userStr));
  },

  updateProfile: async (profileData) => {
    return await simulateDelay({
      success: true,
      message: 'Admin profile updated successfully',
      user: profileData
    });
  },

  changePassword: async (currentPassword, newPassword) => {
    if (currentPassword !== 'admin123' && currentPassword !== 'password') {
      throw new Error('Current password is incorrect');
    }
    return await simulateDelay({
      success: true,
      message: 'Password changed successfully'
    });
  }
};
