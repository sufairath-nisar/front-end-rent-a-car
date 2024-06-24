import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { path: "/home", value: "Home" },
    { path: "/cars", value: "Cars" },
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
        { path: "/cars/types/crossover-suv", value: "Crossover SUV" },
        { path: "/cars/types/large-suv", value: "Large SUV" },
      ],
    },
    {
      value: "Category",
      subLinks: [
        { path: "/cars/category/all-cars", value: "All Cars" },
        { path: "/cars/category/small", value: "Small" },
        { path: "/cars/category/medium", value: "Medium" },
        { path: "/cars/category/crossover", value: "Crossover" },
        { path: "/cars/category/suv", value: "SUV" },
        { path: "/cars/category/luxury", value: "Luxury" },
        { path: "/cars/category/commercial", value: "Commercial" },
      ],
    },
    {
      value: "Brands",
      subLinks: [
        { path: "/cars/brands/nissan", value: "Nissan" },
        { path: "/cars/brands/infiniti", value: "Infiniti" },
        { path: "/cars/brands/kia", value: "KIA" },
        { path: "/cars/brands/mitsubishi", value: "Mitsubishi" },
        { path: "/cars/brands/chevrolet", value: "Chevrolet" },
        { path: "/cars/brands/renault", value: "Renault" },
        { path: "/cars/brands/hyundai", value: "Hyundai" },
        { path: "/cars/brands/mg", value: "MG" },
        { path: "/cars/brands/toyota", value: "Toyota" },
      ],
    },
  ];

  const authLinks = [
    { path: "/clients/signup", value: "Signup" },
    { path: "/clients/signin", value: "Signin" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmenuToggle = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const handleDropdownBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
      setOpenSubmenuIndex(null);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center p-2 text-2xl shadow-lg top-0 sticky bg-white">
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
      <div className={`${
        isDropdownOpen ? 'block' : 'hidden'
      } w-full md:flex md:items-center md:w-auto`}>
        <ul className="flex flex-col md:flex-row items-center md:gap-x-5 text-base">
          {navLinks.map((link, index) => (
            <li key={index} className="relative">
              {link.value === "Cars" ? (
                <div
                  className="dropdown z-50"
                  onBlur={handleDropdownBlur}
                >
                  <button
                    tabIndex={0}
                    onClick={handleDropdownToggle}
                    className={`btn-ghost m-1 ${
                      isDropdownOpen ? "text-red-600" : "text-hover"
                    }`}
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
                              openSubmenuIndex === carIndex
                                ? "bg-red-50 text-red-600"
                                : "text-hover"
                            }`}
                            onClick={() => handleSubmenuToggle(carIndex)}
                            style={
                              openSubmenuIndex === carIndex
                                ? { color: "#DC2626", backgroundColor: "#FEF2F2" }
                                : {}
                            }
                          >
                            {carLink.value}
                          </button>
                          {openSubmenuIndex === carIndex && (
                            <ul className="absolute top-0 left-full bg-white shadow rounded-box w-52">
                              {carLink.subLinks.map((subLink, subIndex) => (
                                <li key={subIndex}>
                                  <NavLink
                                    to={subLink.path}
                                    className={({ isActive }) =>
                                      isActive
                                        ? "text-red-600 bg-red-50"
                                        : "hover:bg-red-50 text-hover"
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
                  className={({ isActive }) =>
                    isActive ? "text-red-600" : "text-hover"
                  }
                >
                  {link.value}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${
        isDropdownOpen ? 'block' : 'hidden'
      } w-full md:flex md:items-center md:w-auto`}>
        <ul className="flex flex-col md:flex-row items-center md:gap-x-5 text-base">
          {authLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-red-700 text-hover"
                }
              >
                <button className="btn btn-active btn-link text-red-700 text-hover">
                  {link.value}
                </button>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
