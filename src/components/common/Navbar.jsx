import { useState } from "react";
import logomark from "../../assets/logomark.svg";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

const MenuButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2.5rem"
        height="2.5rem"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
  );
};
const CloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2.5rem"
        height="2.5rem"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
    </button>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className=" flex-col">
        <div className="  border-b">
            <div className="container flex justify-between items-center py-4">
      <Logo />
      {isOpen ? <CloseButton onClick={menuHandler}/> : <MenuButton onClick={menuHandler} />}
      </div>
      </div>
      {isOpen && (
        <ul className="py-6 bg-white shadow-md">
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink to={'/'} className={({isActive})=>( isActive?'text-primary-500':'')}>Home</NavLink></li>
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink>Supported Platforms</NavLink></li>
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink>Find Partners</NavLink></li>
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink>My Subscriptions</NavLink></li>
        </ul>
      )}
    </nav>
  );
}
