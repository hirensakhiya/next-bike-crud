"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useBikes } from "@/context/BikesContext";
import Link from "next/link";

const BikeFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { createBike, updateBike, bikes } = useBikes();
  const params = useParams();
  const router = useRouter();

  const onSubmit = (data) => {
    if (!data.image[0]?.type?.includes("image") && !params.id) {
      toast.error("Please upload image file only.")      
    } else {
      const submittedData = {
        ...data,
        rating: parseFloat(data.rating),
        quantity: parseInt(data.quantity, 10),
        price: parseFloat(data.price),
      };
      var formData = new FormData();
      formData.append("description", submittedData.description);
      formData.append("rating", submittedData.rating);
      formData.append("quantity", submittedData.quantity);
      formData.append("price", submittedData.price);
      formData.append("type", submittedData.type);
      formData.append('image', submittedData?.image ? submittedData.image[0] : null);
      if (!params?.id) {
        createBike(formData);
      } else {
        formData.append("id", params?.id);
        updateBike(params?.id, formData);
      }
      router.push("/admin/");
    }

  };

  useEffect(() => {
    if (params?.id) {
      const bikeFound = bikes.find((bike) => bike?.id === params?.id);
      if (bikeFound) {
        setValue("description", bikeFound.description);
        setValue("rating", parseInt(bikeFound.rating));
        setValue("quantity", bikeFound.quantity);
        setValue("price", parseInt(bikeFound.price));
        setValue("type", bikeFound.type);
      }
    }
  }, [params?.id, bikes, setValue]);

  return (
    <div className="p-10">
      <div className="flex justify-start">
        <Link
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          href={`/admin`}
        >
          Back
        </Link>
      </div>
      <form className="max-w-sm mx-auto" style={{ marginTop: '30px' }} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
          <input name="description" type="text" autoFocus id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("description", { required: "This field is required" })}
          />
          {errors.description && (
            <span className="block text-red-400 mb-2">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 ">Rating</label>
          <input name="rating" type="number" id="rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " step="0.01" min="1"
            {...register("rating", {
              required: "This field is required",
              min: { value: 1, message: "Rating should be between 1 to 5" },
              max: { value: 5, message: "Rating should be between 1 to 5" }
            })}
          />
          {errors.rating && (
            <span className="block text-red-400 mb-2">
              {errors.rating.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Quantity</label>
          <input name="quantity" type="number" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("quantity", { required: "This field is required", min: { value: 1, message: "Quantify should be minimum 1" } })}
          />
          {errors.quantity && (
            <span className="block text-red-400 mb-2">
              {errors.quantity.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
          <input name="price" type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " step="0.01"
            {...register("price", { required: "This field is required", min: { value: 1, message: "Please enter a valid price." } })}
          />
          {errors.price && (
            <span className="block text-red-400 mb-2">
              {errors.price.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 ">Bike Type</label>
          <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " {...register("type", {
            required: "This field is required", validate: {
              isValidType: (value) =>
                value === "Road Bike" || value === "Mountain Bike" || value === "Sports Bike" || "Please select a valid bike type."
            }
          })}>
            <option value="">Choose a bike type</option>
            <option value="Road Bike">Road Bike</option>
            <option value="Mountain Bike">Mountain Bike</option>
            <option value="Sports Bike">Sports Bike</option>
          </select>
          {errors.type && (
            <span className="block text-red-400 mb-2">
              {errors.type.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">Upload file</label>
          {params?.id ?
            <input multiple className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" accept="image/*"
              {...register("image")}
            />
            :
            <input multiple className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" accept="image/*"
              {...register("image", {
                required: "This field is required",
              })}
            />
          }
          {errors.image && (
            <span className="block text-red-400 mb-2">
              {errors.image.message}
            </span>
          )}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>
    </div>
  );
};

export default BikeFormPage;