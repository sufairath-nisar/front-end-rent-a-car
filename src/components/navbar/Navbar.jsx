import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { path: "/rental-deals", value: "Rental deals" },
    { path: "/how-it-works", value: "How it works" },
    { path: "/our-locations", value: "Our locations" },
    { path: "/why-choose-us", value: "Why choose us" },
  ];

  const authLinks = [
    { path: "/clients/signup", value: "Signup" },
    { path: "/clients/signin", value: "Signin" },
  ];

  return (
    <div className="flex justify-between items-center p-4 text-2xl shadow-lg top-0 sticky">
      <div className="flex items-center">
        <p>Logo</p>
      </div>
      <div className="flex-1 flex justify-center">
        <ul className="flex items-center gap-x-5 text-base">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-hover"
                }
              >
                {link.value}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-5">
      <ul className="flex items-center gap-x-5 text-base">
        {authLinks.map((link, index) => (
           <NavLink
           to={link.path}
           className={({ isActive }) =>
             isActive ? "text-red-500" : "text-red-700 text-hover"
           }
         >
           <button className="btn btn-active btn-link text-red-700 text-hover ">
             {link.value}
           </button>
         </NavLink>
          
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Navbar;
