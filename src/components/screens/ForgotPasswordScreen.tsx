
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Mail, 
  CheckCircle,
  Key,
  Eye,
  EyeOff
} from "lucide-react";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'sent' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Sending reset email to:', email);
    setIsLoading(false);
    setStep('sent');
  };

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword || newPassword !== confirmPassword) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Resetting password with code:', resetCode);
    setIsLoading(false);
    
    // Show success and redirect
    alert('Password reset successfully!');
    navigate('/signin');
  };

  const handleResendEmail = () => {
    console.log('Resending reset email to:', email);
    alert('Reset email sent again!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => step === 'email' ? navigate('/signin') : setStep('email')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-sm text-gray-500">
              {step === 'email' && 'Enter your email to get started'}
              {step === 'sent' && 'Check your email for reset code'}
              {step === 'reset' && 'Create your new password'}
            </p>
          </div>
          <div className="w-9"></div>
        </div>

        {/* Email Step */}
        {step === 'email' && (
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center flex items-center justify-center">
                <Mail className="w-6 h-6 mr-2 text-blue-600" />
                Email Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-gray-600">
                We'll send you a secure link to reset your password
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  autoComplete="email"
                />
              </div>

              <Button
                onClick={handleSendResetEmail}
                disabled={!email || isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reset Link
                  </>
                )}
              </Button>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/signin')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Back to Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Email Sent Step */}
        {step === 'sent' && (
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center flex items-center justify-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                Email Sent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-700 mb-2">
                    We've sent a password reset link to:
                  </p>
                  <p className="font-semibold text-gray-900">{email}</p>
                </div>
                <p className="text-sm text-gray-600">
                  Click the link in the email to reset your password. 
                  The link will expire in 15 minutes.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setStep('reset')}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  <Key className="w-4 h-4 mr-2" />
                  I Have the Reset Code
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  className="w-full h-12"
                >
                  Resend Email
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">
                  Didn't receive the email? Check your spam folder.
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/signin')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Back to Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reset Password Step */}
        {step === 'reset' && (
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center flex items-center justify-center">
                <Key className="w-6 h-6 mr-2 text-blue-600" />
                New Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-gray-600">
                Enter the code from your email and create a new password
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-code">Reset Code</Label>
                  <Input
                    id="reset-code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="h-12 text-center tracking-widest"
                    maxLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12 pr-12"
                      autoComplete="new-password"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-red-600">Passwords do not match</p>
              )}

              <Button
                onClick={handleResetPassword}
                disabled={!resetCode || !newPassword || newPassword !== confirmPassword || isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Resetting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Reset Password
                  </>
                )}
              </Button>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setStep('email')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Back to Email Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
