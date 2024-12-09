import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/LandingPage';  // Ensure the correct import of your component
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/account/LoginPage";
import SignupPage from "./pages/account/SignupPage";
import FAQ from "./pages/informationpages/FAQ";
import AvoidScam from "./pages/informationpages/AvoidScam";
import Support from "./pages/informationpages/Support";
import SafteyTips from "./pages/informationpages/SafteyTips";
import Navbar from "./components/Navbar";
import Store from "./pages/Store/Store";
import ItemDetails from "./pages/Store/ItemDetails"; // Import the new page
import CreatePost from "./pages/account/CreatePost"
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

                <Route path="/fashion" element={<Store destination="fashion" />} />
                <Route path="/electronics" element={<Store destination="electronics" />} />
                <Route path="/tickets" element={<Store destination="tickets" />} />
                <Route path="/toys" element={<Store destination="toys" />} />
                <Route path="/createpost" element={<CreatePost />} />
                
                <Route path="/:destination/:id" element={<ItemDetails />} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
