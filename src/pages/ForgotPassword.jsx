import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

export const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { email: 'admin@jobpulse.io' }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await authService.forgotPassword(data.email);
      setIsSent(true);
      toast.success('Password reset link sent to your email');
    } catch (err) {
      toast.error(err.message || 'Failed to request reset link');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md space-y-6">
        
        <div className="glass-card p-6 sm:p-8 space-y-6 shadow-xl">
          
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Forgot Password?</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your registered administrator email address and we'll send you reset instructions.
            </p>
          </div>

          {isSent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Reset Email Sent</h4>
              <p className="text-xs text-emerald-700">
                Check your inbox for step-by-step instructions to reset your administrator password.
              </p>
              <Link
                to="/reset-password?token=demo_reset_token_123"
                className="inline-block mt-2 text-xs font-bold text-blue-600 hover:underline"
              >
                Proceed to Reset Password Page (Demo Link) →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/30 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] font-semibold text-rose-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <span>Send Reset Instructions</span>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
export default ForgotPassword;
