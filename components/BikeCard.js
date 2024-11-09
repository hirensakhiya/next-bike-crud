export const BikeCard = ({ bike }) => {
  return (
    // Bike List Component
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-5">
      <img
        src={bike.image}
        alt="Description of the image"
        width={500}
        height={300}
        className="rounded-t"
      />
      <div className="p-5">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">{bike.description} - {bike.type}</h5>
        <div className="flex items-center mb-3">
          <p className="me-2 text-sm font-bold text-gray-900 ">{bike.rating}</p>
          <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <p className="mb-0 font-normal text-gray-900 "><span className="font-bold">$ {bike.price}*</span> </p>
      </div>
    </div>
  );
};
