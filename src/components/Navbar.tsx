import { ChevronDown, Menu, X } from "lucide-react";

import { useState } from "react";
import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { tradingCards } from "../data/tradingCards";
import { toTitleCase } from "../utils/formatters";
import SearchInput from "./SearchInput";

const pages = [
  { name: "Home", href: "/" },
  {
    name: "Collections",
    href: "/collections",
    dropdown: tradingCards,
  },
  { name: "Dashboard", href: "/dashboard" },
];

type NavbarProps = {
  fixed?: boolean;
  search?: boolean;
};

export default function Navbar({ fixed = true, search = true }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleMenu() {
    const mobileMenu = document.querySelector("#mobile-menu");
    if (mobileMenu) mobileMenu.classList.toggle("translate-x-full");
  }

  return (
    <header
      className={`${
        fixed ? "fixed" : "relative"
      } inset-x-0 top-0 z-50 bg-white`}
    >
      <div id="desktop-menu" className="px-2 sm:px-4 md:px-8">
        <div className="h-16 flex items-center justify-between lg:justify-start">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="sr-only">Webscout</span>
              <img
                className="h-8 w-auto"
                src={logo}
                alt="Webscout logo"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex ms-12 space-x-8">
            {pages.map((page) => (
              <div key={page.name} className="relative group">
                {page.dropdown ? (
                  <div className="relative group">
                    <button
                      className="text-black font-bold transition-colors duration-300 tracking-wide text-base relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 group-hover:after:w-full after:transition-all after:duration-300 after:delay-150 flex items-center"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {page.name}
                      <ChevronDown className="ml-1 mt-1 size-5 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-1">
                        {page.dropdown.map((item) => (
                          <NavLink
                            key={item.title}
                            to={item.href}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm text-gray-700 ${
                                isActive
                                  ? "bg-yellow-200 text-black font-bold"
                                  : "hover:bg-yellow-100"
                              }`
                            }
                          >
                            {toTitleCase(item.title)}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={page.href}
                    className={({ isActive }) =>
                      `text-black font-bold transition-colors duration-300 tracking-wide text-base relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 ${
                        isActive ? "after:w-full" : "hover:after:w-full"
                      } after:transition-all after:duration-300 after:delay-150`
                    }
                  >
                    {page.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Search  */}
          {search && (
            <div className="hidden lg:flex flex-1">
              <div className="relative w-full flex justify-end">
                <SearchInput />
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle  */}
          <div className="lg:hidden">
            <button className="text-black" onClick={toggleMenu}>
              <span className="sr-only" aria-label="Open main menu">
                Open main menu
              </span>
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search  */}
        {search && (
          <div className="lg:hidden">
            <div className="relative">
              <SearchInput className="w-full" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu  */}
      <div
        id="mobile-menu"
        className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black p-6 sm:max-w-sm transform translate-x-full transition-transform duration-700 delay-150 ease-in-out"
      >
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Webscout</span>
            <img
              className="h-8 w-auto"
              src={logo}
              alt="Webscout Logo"
              loading="lazy"
            />
          </a>
          <button className="text-yellow-400" onClick={toggleMenu}>
            <span className="sr-only">Close menu</span>
            <X className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-white">
            <div className="space-y-2 py-6">
              {pages.map((page) => (
                <div key={page.name}>
                  <a
                    href={page.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:text-black hover:bg-yellow-100 transition-colors duration-300"
                  >
                    {page.name}
                  </a>
                  {page.dropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {page.dropdown.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:text-black hover:bg-yellow-100 transition-colors duration-300"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
