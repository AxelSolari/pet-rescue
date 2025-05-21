import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MainView from "./views/MainView";
import DashBoardView from "./views/DashboardView";
import CreatePublicationView from "./views/Publications/CreatePublicationView";
import EditPublicationView from "./views/Publications/EditPublicationView";
import NotFound from "./components/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<MainView />} index/>
                    <Route path="/dashboardview" element={<DashBoardView />} />
                    <Route path="/publications/create" element={<CreatePublicationView />} />
                    <Route path="/publications/:publicationId/edit" element={<EditPublicationView />} />
                    <Route path="/notfound" element={<NotFound />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}