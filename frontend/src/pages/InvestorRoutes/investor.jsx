import { Routes, Route } from "react-router-dom";
import CompleteProfile from "./pages/CompleteProfile/completeProfile";
import  Home from "./pages/InvestorHome/InvestorHome";
import SingleBuisness from "./pages/SingleBusiness/SingleBusiness";

function Investor() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CompleteProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/single-business/*" element={<SingleBuisness />} />
      </Routes>
    </div>
  );
}
export default Investor;