"use client"
import { Navbar } from "../components/Navbar";
import { BikesProvider } from "../context/BikesContext";

import { usePathname } from "next/navigation";
export const Layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <BikesProvider>
      {pathname === "/admin/login"
        ?
        children // display login form without layout
        :
        <>
          <Navbar />
          <Component children={children} />
        </>
      }
    </BikesProvider>
  )

};

const Component = ({children}) => (
  <div className="text-white h-[calc(100vh-4rem)]">
    <main className="h-5/6 px-3 md:px-8 lg:px-28 py-10">{children}</main>
  </div>
)
