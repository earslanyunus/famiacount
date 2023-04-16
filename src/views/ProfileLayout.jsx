import {useState} from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function ProfileLayout() {
  
  const [activeTab, setActiveTab] = useState(1);
  const activeHandler = (e) => {
    setActiveTab(e);
  };
  return (
    <>
      <Navbar />
      <div className="tabs-boxed bg-transparent text-center">
        <NavLink to={'subs'} onClick={ ()=>activeHandler(1)} className={`tab tab-lg ${activeTab==1? 'tab-active' :''}`}>Overview</NavLink>
        <NavLink to={'notifications'} onClick={ ()=>activeHandler(2)} className={`tab tab-lg ${activeTab==2? 'tab-active' :''}`}>Notifications</NavLink>
      </div>

      <Outlet />
      <Footer />
    </>
  );
}
