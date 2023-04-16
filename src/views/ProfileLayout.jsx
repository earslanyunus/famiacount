import {useEffect, useState} from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function ProfileLayout() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    
    if (!user) {
      navigate("/");
    }
  }, [user]);

  
  const [activeTab, setActiveTab] = useState(1);
  const activeHandler = (e) => {
    setActiveTab(e);
  };
  return (
    <>
    <div className="min-h-screen flex flex-col justify-between">
    <div>
      <Navbar />
      <div className="tabs-boxed bg-transparent text-center">
        <NavLink to={'subs'} onClick={ ()=>activeHandler(1)} className={`tab tab-lg ${activeTab==1? 'tab-active' :''}`}>Overview</NavLink>
        <NavLink to={'notifications'} onClick={ ()=>activeHandler(2)} className={`tab tab-lg ${activeTab==2? 'tab-active' :''}`}>Notifications</NavLink>
      </div>

      <Outlet />
      </div>
      <Footer />
      </div>
    </>
  );
}
