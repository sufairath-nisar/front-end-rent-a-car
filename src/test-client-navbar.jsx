import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import DarkMode from "../DarkMode";
import { useAuth } from "../../context/AuthContext";

const ClientNavbar = () => {
  const { user, logout } = useAuth(); // Use context to access logout function
  const navigate = useNavigate();

  const navLinks = [
    { path: "/client", value: "Home" },
    { path: "/clients/cars", value: "Cars", hasSubmenu: true },
    { path: "/clients/rental-deals", value: "Rental deals" },
    { path: "/clients/why-choose-us", value: "Why choose us" },
    { path: "/clients/our-locations", value: "Our locations" },
    { path: "/clients/contact-us", value: "Contact us" },
  ];

  const carDropdownLinks = [
    {
      value: "Types",
      subLinks: [
        { path: "/clients/cars/types/sedan", value: "Sedan" },
        { path: "/clients/cars/types/hatchback", value: "Hatchback" },
        { path: "/clients/cars/types/crossover-SUV", value: "Crossover SUV" },
        { path: "/clients/cars/types/large-SUV", value: "Large SUV" },
      ],
    },
    {
      value: "Category",
      subLinks: [
        { path: "/clients/cars/category/small", value: "Small" },
        { path: "/clients/cars/category/medium", value: "Medium" },
        { path: "/clients/cars/category/crossover", value: "Crossover" },
        { path: "/clients/cars/category/SUV", value: "SUV" },
        { path: "/clients/cars/category/luxury", value: "Luxury" },
        { path: "/clients/cars/category/commercial", value: "Commercial" },
      ],
    },
    {
      value: "Brand",
      subLinks: [
        { path: "/clients/cars/brand/nissan", value: "Nissan" },
        { path: "/clients/cars/brand/infiniti", value: "Infiniti" },
        { path: "/clients/cars/brand/KIA", value: "KIA" },
        { path: "/clients/cars/brand/mitsubishi", value: "Mitsubishi" },
        { path: "/clients/cars/brand/chevrolet", value: "Chevrolet" },
        { path: "/clients/cars/brand/renault", value: "Renault" },
        { path: "/clients/cars/brand/hyundai", value: "Hyundai" },
        { path: "/clients/cars/brand/MG", value: "MG" },
        { path: "/clients/cars/brand/toyota", value: "Toyota" },
      ],
    },
  ];

  const authLinks = [
    { path: "/", value: "Logout" },
    { path: "/clients/account-settings", value: "Settings", icon: faCog, hasSubmenu: true },
  ];

  const settingsDropdownLinks = [
    { path: "/clients/account-settings/view-profile", value: "View Profile" },
    { path: "/clients/account-settings/edit-profile", value: "Edit Profile" },
    { path: "/clients/account-settings/change-password", value: "Change Password" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCarsLink, setActiveCarsLink] = useState(false); // State to track active state of Cars link
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null); // State to track active submenu item
  const [activeSubLink, setActiveSubLink] = useState(null); // State to track active sub-link
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false); // State for settings dropdown

  const handleLogoutClick = async () => {
    await logout(); // Call logout function from AuthContext
    navigate("/"); // Redirect to desired route after logout
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setActiveCarsLink(!activeCarsLink); // Toggle active state of Cars link
  };

  const handleSettingsDropdownToggle = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
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

  const handleSettingsDropdownBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSettingsDropdownOpen(false);
    }
  };

  const handleNavLinkClick = () => {
    setIsDropdownOpen(false);
    setActiveSubmenuIndex(null);
    setActiveCarsLink(false);
    setActiveSubLink(null);
    setIsSettingsDropdownOpen(false); // Close settings dropdown
  };

  const handleSubLinkClick = (path) => {
    setIsDropdownOpen(false); 
    setActiveSubmenuIndex(null); 
    setActiveSubLink(path);
  };

 

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex flex-wrap justify-between items-center p-2 text-2xl shadow-lg bg-white">
      <div className="flex items-center logo-emirates w-60 h-16">
      
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
                  onClick={handleNavLinkClick}
                  className={({ isActive }) => isActive ? "text-red-700" : "text-hover"}
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
              <li key={index} className="relative">
                {link.hasSubmenu ? (
                  <div className="dropdown dropdown-left z-50" onBlur={handleSettingsDropdownBlur}>
                    <button
                      tabIndex={0}
                      onClick={handleSettingsDropdownToggle}
                      className={`btn-ghost m-1 flex items-center ${isSettingsDropdownOpen ? "text-red-700" : "text-hover"}`}
                    >
                      <FontAwesomeIcon icon={link.icon} className="mr-2 text-red-700 hover:text-red-500" />
                     
                      {/* <svg className="h-4 w-4 ml-1 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 15a1 1 0 0 1-.707-.293l-5-5a1 1 0 0 1 1.414-1.414L10 12.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5A1 1 0 0 1 10 15z"
                          clipRule="evenodd"
                        />
                      </svg> */}
                    </button>
                    {isSettingsDropdownOpen && (
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-red-200 shadow-xl bg-base-100 rounded-box w-44"
                      >
                        {settingsDropdownLinks.map((settingLink, settingIndex) => (
                          <li key={settingIndex}>
                            <NavLink
                              to={settingLink.path}
                              onClick={handleNavLinkClick}
                              className={({ isActive }) => isActive ? "bg-red-700 text-white " : "text-hover settings-hover"}
                            >
                              {settingLink.value}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                  to={link.path}
                  onClick={link.value === "Logout" ? handleLogoutClick : () => handleNavLinkClick(link.path)}
                  className={({ isActive }) => isActive ? "text-red-400" : "text-red-700 link-hover"}
                >
                  {link.value}
                </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
        <DarkMode />
      </div>
    </div>
  );
};

export default ClientNavbar;
