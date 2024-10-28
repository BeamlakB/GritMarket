import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/LandingPage';  // Ensure the correct import of your component
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FAQ from "./pages/informationpages/FAQ";
import AvoidScam from "./pages/informationpages/AvoidScam";
import Support from "./pages/informationpages/Support";
import SafteyTips from "./pages/informationpages/SafteyTips";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/FAQ" element={<FAQ/>}/>
                <Route path="/AvoidScam" element={<AvoidScam/>}/>
                <Route path="/SafteyTips" element={<SafteyTips/>}/>
                <Route path="/Support" element={<Support/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
