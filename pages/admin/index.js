"use client";

import { VscTasklist } from "react-icons/vsc";
import { useBikes } from "../../context/BikesContext";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Home() {
    const { bikes, deleteBike } = useBikes();
    const router = useRouter();
    return (
        <div className="p-10">
            <div className="flex justify-end">
                <Link
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    href={`/admin/new`}
                >
                    Add Bike
                </Link>
            </div>
            <div className="w-full mt-10">
                {bikes?.length === 0 ? (
                    <div className="block">
                        <h2 className="text-2xl">There are no bikes</h2>
                        <VscTasklist size="8rem" />
                    </div>
                ) : (
                    // bikes data in table format
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Rating
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bikes?.map((bike, i) => (
                                    <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <img src={bike.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 ">
                                            {bike.description}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 ">
                                            {bike.type}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                                            {bike.rating}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                                            {bike.price}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                                            {bike.quantity}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center">
                                            <button
                                                className="inline-flex items-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                onClick={() => router.push(`/admin/edit/${bike?.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="inline-flex items-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const accept = confirm(
                                                        "Are you sure you want to delete this bike?"
                                                    );
                                                    if (accept) deleteBike(bike?.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default Home;
