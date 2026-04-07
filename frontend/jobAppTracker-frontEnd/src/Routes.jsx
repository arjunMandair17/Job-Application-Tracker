import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import SingleApp from "./pages/SingleApp";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <RouterRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="/jobApps/:id" element={<SingleApp />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </RouterRoutes>
        </BrowserRouter>
    );
};

export default AppRoutes;