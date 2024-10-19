import { Navigate, createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import HomePage from "../pages/HomePage";
import AssistantPage from "../pages/AssistantPage";
import AssistantAttendancePage from "../pages/AssistantAttendancePage";
import CALASAttendancePage from "../pages/CALASAttendancePage";
import ExportPriviewPage from "../pages/ExportPriviewPage";
import RFIDDevicesPage from "../pages/RFIDDevicesPage";
import AuthGuard from "../services/AuthGuard";
import AbsentPage from "../pages/AbsentPage";
import NotFound404Page from "../pages/NotFound404Page";

//Need 404 Not Found Page
const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/home' replace />
    },
    {
        path: '/presensi',
        element: <Navigate to='/presensi/asisten' replace />
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: 'home',
                element: <AuthGuard>
                    <HomePage />
                </AuthGuard>
            },
            {
                path: 'asisten',
                element: <AuthGuard>
                    <AssistantPage />
                </AuthGuard>
            },
            {
                path: 'export',
                element: <AuthGuard>
                    <ExportPriviewPage />
                </AuthGuard>
            },
            {
                path: 'devices',
                element: <AuthGuard>
                    <RFIDDevicesPage />
                </AuthGuard>
            },
            {
                path: 'presensi',
                children: [
                    {
                        path: 'asisten',
                        element: <AssistantAttendancePage />
                    },
                    {
                        path: 'calas',
                        element: <CALASAttendancePage />
                    }
                ]
            },
            {
                path: 'absent',
                element: <AbsentPage />
            },
            {
                path: '*',
                element: <NotFound404Page />
            }
        ]
    }
])

export default AppRouter