"use client";
import { useBikes } from "../context/BikesContext";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";

export function Navbar() {
  const { searchBike, admin, adminLogout } = useBikes();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => {
    setIsOpen(false);
    adminLogout()
  }

  const searchB = (e) => {
    searchBike(e.target.value, "")
  }

  return (
    <header className="bg-gray-200 px-3 md:px-8 lg:px-28 py-3 z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <h1 className="font-black text-3xl text-gray">Fictional Bike Store</h1>

        <div className="flex sm:flex sm:flex-grow flex-row justify-end">
          <form >
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="search" onChange={searchB} className="block w-full p-2 ps-10 text-sm text-gray-700 border border-gray-800 rounded-md bg-gray-50" placeholder="Search Bikes..." required />
            </div>
          </form>
          {admin?.email && <>
            <div className="relative inline-block text-left ml-5">
              <div onClick={toggleDropdown} className="cursor-pointer">
                <RxAvatar size={40} />
              </div>

              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {admin.email}
                    </div>
                    <hr />
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={closeDropdown}>
                      Sign out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
          }
        </div>
      </div>
    </header>
  );
}
