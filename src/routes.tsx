import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { MarketingSite } from './pages/MarketingSite';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OnboardingGuard } from './components/OnboardingGuard';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/onboarding',
        element: (
            <ProtectedRoute>
                <Onboarding />
            </ProtectedRoute>
        ),
    },
    {
        path: '/',
        element: <MarketingSite />,
    },
    {
        path: '/app',
        element: (
            <ProtectedRoute>
                <OnboardingGuard>
                    <App />
                </OnboardingGuard>
            </ProtectedRoute>
        ),
    },
]);
