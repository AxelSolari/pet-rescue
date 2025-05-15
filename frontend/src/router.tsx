import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MainView from "./views/MainView";
import DashBoardView from "./views/DashboardView";
import CreatePublicationView from "./views/Publications/CreatePublicationView";
import EditPublicationView from "./views/Publications/EditPublicationView";
import NotFound from "./components/NotFound";

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
            </Routes>
        </BrowserRouter>
    )
}