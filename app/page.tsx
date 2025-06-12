'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, User, UserPlus } from 'lucide-react';
import PatientOnboarding from '@/components/PatientOnboarding';
import PatientDashboard from '@/components/PatientDashboard';
import PhysicianDashboard from '@/components/PhysicianDashboard';

type UserRole = 'patient' | 'physician' | null;
type OnboardingStep = 'login' | 'onboarding' | 'dashboard';

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('login');
  const [isFirstTimePatient, setIsFirstTimePatient] = useState(true);

  const handlePortalClick = (role: UserRole) => {
    setUserRole(role);
    if (role === 'patient' && isFirstTimePatient) {
      setCurrentStep('onboarding');
    } else {
      setCurrentStep('dashboard');
    }
  };

  const handleOnboardingComplete = () => {
    setIsFirstTimePatient(false);
    setCurrentStep('dashboard');
  };

  const handleBackToLogin = () => {
    setUserRole(null);
    setCurrentStep('login');
  };

  if (currentStep === 'onboarding' && userRole === 'patient') {
    return <PatientOnboarding onComplete={handleOnboardingComplete} onBack={handleBackToLogin} />;
  }

  if (currentStep === 'dashboard' && userRole === 'patient') {
    return <PatientDashboard onLogout={handleBackToLogin} />;
  }

  if (currentStep === 'dashboard' && userRole === 'physician') {
    return <PhysicianDashboard onLogout={handleBackToLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">SereneMind</h1>
            <p className="text-slate-600 font-medium">Therapeutics</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-slate-700">Secure Portal Access</CardTitle>
            <CardDescription>
              Choose your portal to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handlePortalClick('physician')}
              variant="outline"
              size="lg"
              className="w-full h-14 text-left flex items-center gap-4 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-700">Physician Portal</div>
                <div className="text-sm text-slate-500">Monitor patient progress</div>
              </div>
            </Button>

            <Button
              onClick={() => handlePortalClick('patient')}
              variant="outline"
              size="lg"
              className="w-full h-14 text-left flex items-center gap-4 hover:bg-accent/5 hover:border-accent/30 transition-all duration-200"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-700">Patient Portal</div>
                <div className="text-sm text-slate-500">Begin your wellness journey</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center">
          <Badge variant="secondary" className="px-4 py-2 bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-2" />
            HIPAA Compliant
          </Badge>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            This is a secure, HIPAA-compliant platform. All data is encrypted in transit and at rest.
          </p>
        </div>
      </div>
    </div>
  );
}