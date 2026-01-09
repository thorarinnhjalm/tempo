import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkUserFamily, createUserProfile } from '../lib/firestore-utils';
import { AmbientBackground } from './AmbientBackground';

export function OnboardingGuard({ children }: { children: ReactNode }) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        async function checkFamilyStatus() {
            if (!currentUser) return;

            try {
                // 1. Ensure User Profile Exists
                await createUserProfile(currentUser);

                // 2. Check for Family
                const familyId = await checkUserFamily(currentUser.uid);

                if (!familyId) {
                    // Redirect to Onboarding if no family
                    navigate('/onboarding');
                }
                // If family exists, we just let the children render
            } catch (error) {
                console.error("Error checking family status:", error);
            } finally {
                setChecking(false);
            }
        }

        checkFamilyStatus();
    }, [currentUser, navigate]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <AmbientBackground themeName="indigo" />
                <div className="flex flex-col items-center gap-4 z-10 relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
                    <span className="text-slate-500 font-medium animate-pulse">Checking credentials...</span>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
