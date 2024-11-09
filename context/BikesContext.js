"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
const BikeContext = createContext();

export const useBikes = () => {
  const context = useContext(BikeContext);
  if (!context) { throw new Error("useBikes must be used within a BikesProvider") };
  return context;
};

export const BikesProvider = ({ children }) => {
  const [admin, setAdmin] = useState({});
  const [bikes, setBikes] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  // interceptor for adding authorization header in admin login
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        router.push("/admin/login")
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    getBike()
    const localToken = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    if (localToken) {
      setAdmin({
        token: localToken,
        email: email
      })
      axios.defaults.headers["authorization"] = localToken
      if (pathname.includes("login")) {
        router.push("/admin")
      }
    } else if (pathname.includes("admin") && !pathname.includes("login")) {
      router.push("/admin/login")
    }
  }, [])

  const adminLogin = async (data) => {
    try {
      const response = await axios.post(`/api/auth`, data)
      if (response.status === 200) {
        const token = response.data.data?.token
        if (token) {
          setAdmin(response?.data?.data)
          axios.defaults.headers["authorization"] = response.data.data?.token // setting auth token in default header for admin
          localStorage.setItem("token", response.data.data?.token)
          localStorage.setItem("email", response.data.data?.email)
          router.push("/admin/");
        } else {
          toast.error("Error while login");
        }
      } else {
        toast.error(response.data.error);
      }
    } catch (e) {
      console.error(e.response.message)
    }
  }

  const adminLogout = async () => {
    delete axios.defaults.headers["authorization"];
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    setAdmin({})
    router.push("/admin/login");
  }

  const getBike = async () => {
    try {
      const response = await axios.get(`/api/bike`)
      if (response.status === 200 || response.status === 304 || response.status === 204) {
        setBikes(response.data.data);
      } else {
        toast.error(response.data.error);
      }
    } catch (e) {
      console.error(e.response.message)
    }
  }

  const createBike = async (bike) => {
    try {
      const response = await axios.post(`/api/bike`, bike, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status === 201) {
        toast.success(response.data.message);
        await getBike()
      } else {
        toast.error(response.data.error);
      }
    } catch (e) {
      console.error(e.response.message)
    }
  }

  const updateBike = async (id, updatedBike) => {
    try {
      const response = await axios.put(`/api/bike?id=${id}`, updatedBike, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status === 200) {
        toast.success(response.data.message);
        await getBike()
      } else {
        toast.error(response.data.error);
      }
    } catch (e) {
      console.error(e.response.message)
    }
  }

  const deleteBike = async (id) => {
    try {
      const response = await axios.delete(`/api/bike?id=${id}`)
      if (response.status === 200) {
        toast.success(response.data.message);
        await getBike()
      } else {
        toast.error(response.data.error);
      }
    } catch (e) {
      console.error(e.response.message)
    }
  }

  const searchBike = async (description = "", type = "") => {
    try {
      const response = await axios.post(`/api/search`, {
        description, type
      })
      if (response.status === 200 || response.status === 304 || response.status === 204) {
        setBikes(response.data.data);
      } else {
        toast.error(response.data.error);
      }
    } catch (e) {
      console.error(e.response.message)
    }
  }
  return (
    <BikeContext.Provider
      value={{
        bikes,
        admin,
        getBike,
        createBike,
        updateBike,
        deleteBike,
        searchBike,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};
