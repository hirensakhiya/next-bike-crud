"use client";
import { useForm } from "react-hook-form";
import { useBikes } from "@/context/BikesContext";
const Login = () => {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();
    const { adminLogin } = useBikes();
    const onSubmit = handleSubmit((data) => {
        adminLogin(data)        
    });

    return (
        <form className="max-w-sm mx-auto mt-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded overflow-hidden shadow-lg p-10 mt-5">
                <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 ">Fictional Bike Store</h5>
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                    <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" {...register("email", { required: "This field is required" })} />
                    {errors.email && (
                        <span className="block text-red-400 mb-2">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " {...register("password", { required: "This field is required" })} />
                    {errors.password && (
                        <span className="block text-red-400 mb-2">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">Remember me</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </div>
        </form>
    );
};

export default Login;