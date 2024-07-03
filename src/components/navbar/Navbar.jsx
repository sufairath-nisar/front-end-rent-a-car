import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DarkMode from "../DarkMode";

const Navbar = () => {
  const navLinks = [
    { path: "/", value: "Home" },
    { path: "/cars", value: "Cars", hasSubmenu: true },
    { path: "/rental-deals", value: "Rental deals" },
    { path: "/why-choose-us", value: "Why choose us" },
    { path: "/our-locations", value: "Our locations" },
    { path: "/contact-us", value: "Contact us" },
  ];

  const carDropdownLinks = [
    {
      value: "Types",
      subLinks: [
        { path: "/cars/types/sedan", value: "Sedan" },
        { path: "/cars/types/hatchback", value: "Hatchback" },
        { path: "/cars/types/crossover-SUV", value: "Crossover SUV" },
        { path: "/cars/types/large-SUV", value: "Large SUV" },
      ],
    },
    {
      value: "Category",
      subLinks: [
        { path: "/cars/category/small", value: "Small" },
        { path: "/cars/category/medium", value: "Medium" },
        { path: "/cars/category/crossover", value: "Crossover" },
        { path: "/cars/category/SUV", value: "SUV" },
        { path: "/cars/category/luxury", value: "Luxury" },
        { path: "/cars/category/commercial", value: "Commercial" },
      ],
    },
    {
      value: "Brand",
      subLinks: [
        { path: "/cars/brand/nissan", value: "Nissan" },
        { path: "/cars/brand/infiniti", value: "Infiniti" },
        { path: "/cars/brand/KIA", value: "KIA" },
        { path: "/cars/brand/mitsubishi", value: "Mitsubishi" },
        { path: "/cars/brand/chevrolet", value: "Chevrolet" },
        { path: "/cars/brand/renault", value: "Renault" },
        { path: "/cars/brand/hyundai", value: "Hyundai" },
        { path: "/cars/brand/MG", value: "MG" },
        { path: "/cars/brand/toyota", value: "Toyota" },
      ],
    },
  ];

  const authLinks = [
    { path: "/clients/signup", value: "Signup" },
    { path: "/clients/signin", value: "Signin" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCarsLink, setActiveCarsLink] = useState(false); 
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null); 
  const [activeSubLink, setActiveSubLink] = useState(null); 
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setActiveCarsLink(!activeCarsLink); 
  };

  const handleSubmenuToggle = (index) => {
    setActiveSubmenuIndex(activeSubmenuIndex === index ? null : index);
    setActiveCarsLink(true); 
  };

  const handleDropdownBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
      
    }
  };

  const handleNavLinkClick = () => {
    setIsDropdownOpen(false);
    setActiveSubmenuIndex(null);
    setActiveCarsLink(false);
    setActiveSubLink(null);
  };

  const handleSubLinkClick = (path) => {
    setIsDropdownOpen(false); 
    setActiveSubmenuIndex(null); 
    setActiveSubLink(path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex flex-wrap justify-between items-center  p-2 text-2xl shadow-lg bg-white">
      <div className="flex items-center">
        <img src="/images/logo1.jpeg" className="h-16 w-48" alt="Logo" />
      </div>
      <button
        className="block md:hidden px-2 text-gray-700 focus:outline-none"
        onClick={handleDropdownToggle}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className={`${isDropdownOpen ? "block" : "hidden"} w-full md:flex md:items-center md:w-auto`}>
        <ul className="flex flex-col md:flex-row items-center md:gap-x-5 text-base">
          {navLinks.map((link, index) => (
            <li key={index} className="relative">
              {link.hasSubmenu ? (
                <div className="dropdown z-50" onBlur={handleDropdownBlur}>
                  <button
                    tabIndex={0}
                    onClick={handleDropdownToggle}
                    className={`btn-ghost m-1 flex items-center ${activeCarsLink ? "text-red-700" : "text-hover"}`}
                  >
                    <span className="flex items-center">
                      Cars
                      <svg className="h-4 w-4 ml-1 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                          fillRule="evenodd"
                          d="M10 15a1 1 0 0 1-.707-.293l-5-5a1 1 0 0 1 1.414-1.414L10 12.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5A1 1 0 0 1 10 15z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>


                  {isDropdownOpen && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {carDropdownLinks.map((carLink, carIndex) => (
                        <li key={carIndex} className="relative">
                          <button
                            className={`w-full text-left hover:text-red-500 hover:bg-red-50 ${
                              activeSubmenuIndex === carIndex ? "text-red-700" : "text-hover"
                            }`}
                            onClick={() => handleSubmenuToggle(carIndex)}
                            style={activeSubmenuIndex === carIndex ? { color: "#DC2626", backgroundColor: "#FEF2F2" } : {}}
                          >
                            {carLink.value}
                          </button>
                          {activeSubmenuIndex === carIndex && (
                            <ul className="absolute top-0 p-2 left-full bg-white shadow rounded-box w-52">
                              {carLink.subLinks.map((subLink, subIndex) => (
                                <li key={subIndex}>
                                  <NavLink
                                    to={subLink.path}
                                    onClick={() => handleSubLinkClick(subLink.path)} 
                                    className={({ isActive }) =>
                                      isActive || activeSubLink === subLink.path ? "bg-red-700 text-white" : "text-hover sublink-hover"
                                    }
                                  >
                                    {subLink.value}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  onClick={handleNavLinkClick} 
                  className={({ isActive }) => isActive ? "text-red-700 " : "text-hover"}
                >
                  {link.value}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4"> {/* Add a flex container for right-aligned items */}
        <div className={`${isDropdownOpen ? "block" : "hidden"} w-full md:flex md:items-center md:w-auto`}>
          <ul className="flex flex-col md:flex-row items-center md:gap-x-1 text-base">
            {authLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    isActive ? "text-red-400 font-semibold px-3 text-sm" : "text-red-700 btn-link px-3 gap-2 font-semibold text-sm link-hover"
                  }
                >
                  {link.value}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <DarkMode /> {/* Add the DarkMode component */}
      </div>
    </div>
  );
};

export default Navbar;