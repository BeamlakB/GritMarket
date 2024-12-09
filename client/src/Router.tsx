import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/LandingPage';  // Ensure the correct import of your component
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/account/LoginPage";
import Profile from "./pages/account/Profile";
import SignupPage from "./pages/account/SignupPage";
import FAQ from "./pages/informationpages/FAQ";
import AvoidScam from "./pages/informationpages/AvoidScam";
import Support from "./pages/informationpages/Support";
import SafteyTips from "./pages/informationpages/SafteyTips";
import Navbar from "./components/Navbar";
import Store from "./pages/Store/Store";
import CreatePost from "./pages/account/CreatePost";
const Router = () => {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/FAQ" element={<FAQ/>}/>
                <Route path="/AvoidScam" element={<AvoidScam/>}/>
               
                <Route path="/SafteyTips" element={<SafteyTips/>}/>

                <Route path="/Support" element={<Support/>}/>
                <Route path="/Store" element={<Store/>}/>

                <Route path="*" element={<NotFound/>}/>
                <Route path="/add-post" element={<CreatePost/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
