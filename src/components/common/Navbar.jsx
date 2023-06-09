import { useEffect, useState } from "react";
import logomark from "../../assets/Logomark.svg";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "../../firebase";

// const MenuButton = ({ onClick }) => {

//   return (
//     <button onClick={onClick}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="2.5rem"
//         height="2.5rem"
//         fill="currentColor"
//         viewBox="0 0 16 16"
//       >
//         <path
//           fillRule="evenodd"
//           d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
//         />
//       </svg>
//     </button>
//   );
// };
// const CloseButton = ({ onClick }) => {
//   return (
//     <button onClick={onClick}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="2.5rem"
//         height="2.5rem"
//         fill="currentColor"
//         viewBox="0 0 16 16"
//       >
//         <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
//       </svg>
//     </button>
//   );
// };

export default function Navbar() {
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar border-b">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
              <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/supported-platforms"}>Supported Platforms</NavLink>
          </li>
          <li>
            <NavLink to={"/findpartners"}>Find Partners</NavLink>
          </li>
          </ul>
        </div>
        <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">
          <Logo />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/supported-platforms"}>Supported Platforms</NavLink>
          </li>
          <li>
            <NavLink to={"/findpartners"}>Find Partners</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        { user?.user?.photoURL &&(
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user?.user?.photoURL} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to={"/my/subs"}>Profile</NavLink>
            </li>
            <li>
              <button onClick={() => signOut()} type="button">
                Sign out
              </button>
            </li>
          </ul>
        </div>)
        }
        {!user?.user?.photoURL && (
          < >
          <NavLink to={"/login"} className="btn btn-ghost"> Login </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

/*
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
  const isLogin = useSelector((state)=> state.user.isLogin)

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
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink to={'/findpartners'}>Find Partners</NavLink></li>
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink to={'/my/subs'}>My Subscriptions</NavLink></li>
          {!isLogin && <>
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink to={'/login'}>Login</NavLink></li>
          <li className="px-4 py-3 text-text-md font-semibold"><NavLink to={'/signup'}>Signup</NavLink></li>
          </>
        }
        {isLogin && <>
          <li className="px-4 py-3 text-text-md font-semibold"><button onClick={signOut}>Signout</button></li>
          </>
        }
          
        
          
        </ul>
      )}
    </nav>
  );
}
*/
