import React, { useState } from "react";
import { NavLink } from "react-router-dom";

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
  const [activeCarsLink, setActiveCarsLink] = useState(false); // State to track active state of Cars link
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null); // State to track active submenu item
  const [activeSubLink, setActiveSubLink] = useState(null); // State to track active sub-link

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setActiveCarsLink(!activeCarsLink); // Toggle active state of Cars link
  };

  const handleSubmenuToggle = (index) => {
    setActiveSubmenuIndex(activeSubmenuIndex === index ? null : index);
    setActiveCarsLink(true); // Ensure Cars link remains active when submenu is opened
  };

  const handleDropdownBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
      // Do not reset activeCarsLink here to maintain its active state when a submenu is active
    }
  };

  const handleNavLinkClick = () => {
    setIsDropdownOpen(false);
    setActiveSubmenuIndex(null);
    // Reset activeCarsLink when another nav link (outside of Cars) is clicked
    setActiveCarsLink(false);
    // Reset active sub-link when a nav link is clicked
    setActiveSubLink(null);
  };

  const handleSubLinkClick = (path) => {
    setIsDropdownOpen(false); // Close dropdown when a sub-link is clicked
    setActiveSubmenuIndex(null); // Clear active submenu index
    // Set active sub-link to the clicked sub-link path
    setActiveSubLink(path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex flex-wrap justify-between items-center p-2 text-2xl shadow-lg bg-white">
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
                    className={`btn-ghost m-1 ${activeCarsLink ? "text-red-700" : "text-hover"}`}
                  >
                    Cars
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
                                    onClick={() => handleSubLinkClick(subLink.path)} // Handle click on sub-links to close dropdown
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
                  onClick={handleNavLinkClick} // Handle click on regular nav links to reset Cars state
                  className={({ isActive }) => isActive ? "text-red-700" : "text-hover"}
                >
                  {link.value}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${isDropdownOpen ? "block" : "hidden"} w-full md:flex md:items-center md:w-auto`}>
        <ul className="flex flex-col md:flex-row items-center md:gap-x-1 text-base">
          {authLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                onClick={handleNavLinkClick} // Handle click on auth links to reset Cars state
                className={({ isActive }) => isActive ? "text-red-400" : "text-red-700 link-hover"}
              >
                <button className="btn btn-active btn-link text-red-700 link-hover">{link.value}</button>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
