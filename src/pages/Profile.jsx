import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Shield, KeyRound, Smartphone, CheckCircle2, Save, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/common/Avatar';
import { authService } from '../services/authService';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [twoFactor, setTwoFactor] = useState(user?.twoFactorEnabled ?? true);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors }
  } = useForm({
    defaultValues: {
      name: user?.name || 'Sarah Jenkins',
      email: user?.email || 'admin@jobpulse.io'
    }
  });

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPassForm,
    formState: { errors: passErrors }
  } = useForm();

  const onUpdateProfile = async (data) => {
    try {
      setIsUpdating(true);
      await authService.updateProfile(data);
      updateUser(data);
      toast.success('Admin profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const onChangePassword = async (data) => {
    try {
      setIsChangingPass(true);
      await authService.changePassword(data.currentPassword, data.newPassword);
      toast.success('Password changed successfully');
      resetPassForm();
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setIsChangingPass(false);
    }
  };

  const toggle2FA = () => {
    setTwoFactor(!twoFactor);
    updateUser({ twoFactorEnabled: !twoFactor });
    toast.success(!twoFactor ? '2FA enabled' : '2FA disabled');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Profile & Security</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Manage your administrator credentials, security preferences, and 2FA settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card Summary */}
        <div className="glass-card p-6 text-center space-y-4 h-fit">
          <div className="relative inline-block mx-auto">
            <Avatar
              src={user?.avatar}
              name={user?.name || 'Admin'}
              size="xl"
              className="ring-4 ring-blue-600/20"
            />
            <button
              onClick={() => toast('Photo upload drawer opened')}
              className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all"
              title="Change Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900">{user?.name || 'Sarah Jenkins'}</h3>
            <p className="text-xs font-bold text-blue-600 mt-0.5">{user?.role || 'Super Administrator'}</p>
            <p className="text-xs text-slate-500 mt-1">{user?.email || 'admin@jobpulse.io'}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-left text-xs font-medium text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Account ID:</span>
              <span className="font-bold text-slate-800">{user?.id || 'ADM-001'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Last Login:</span>
              <span className="font-semibold text-slate-800">
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10m ago'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">2FA Status:</span>
              <span className={`font-bold ${twoFactor ? 'text-emerald-600' : 'text-amber-600'}`}>
                {twoFactor ? 'Active' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Update Forms Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* General Information Form */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900">Personal Details</h3>
            </div>

            <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  {...registerProfile('name', { required: 'Name is required' })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600/30 outline-none"
                />
                {profileErrors.name && (
                  <p className="text-[11px] font-semibold text-rose-500 mt-1">{profileErrors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
                <input
                  type="email"
                  {...registerProfile('email', { required: 'Email is required' })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600/30 outline-none"
                />
                {profileErrors.email && (
                  <p className="text-[11px] font-semibold text-rose-500 mt-1">{profileErrors.email.message}</p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Save Profile
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <KeyRound className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-extrabold text-slate-900">Change Password</h3>
            </div>

            <form onSubmit={handleSubmitPass(onChangePassword)} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  {...registerPass('currentPassword', { required: 'Current password is required' })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  {...registerPass('newPassword', {
                    required: 'New password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600/30 outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Two Factor Authentication */}
          <div className="glass-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                <p className="text-[11px] text-slate-500">Add an extra layer of security using Authenticator App</p>
              </div>
            </div>

            <button
              onClick={toggle2FA}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                twoFactor
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {twoFactor ? 'Enabled' : 'Enable 2FA'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
export default Profile;
