import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import JobApps from "./pages/JobApp";
import Profile from "./pages/Profile";
import JobAppDetail from "./pages/JobAppDetail";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <RouterRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/jobApps" element={<JobApps />} />
                <Route path="/jobApps/:id" element={<JobAppDetail />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </RouterRoutes>
        </BrowserRouter>
    );
};

export default AppRoutes;