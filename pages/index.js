"use client";

import { VscTasklist } from "react-icons/vsc";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useBikes } from "@/context/BikesContext";
import { BikeCard } from "@/components/BikeCard";

function Bikes({ type, bikes }) {
  return (
    <div className="flex justify-center">
      {bikes?.length === 0 ? (
        <div className="block">
          <h2 className="text-2xl">There are no bikes</h2>
          <VscTasklist size="8rem" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bikes?.map((bike, i) => (
            <BikeCard bike={bike} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function Home() {
  const { bikes, searchBike, getBike } = useBikes();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(()=>{
    getBike();
  }, [])

  const selectTab = (index) => {
    setActiveTab(index)
    searchBike("", index === 0 ? "" : tabTitles[index])
  }

  const tabTitles = ['All', 'Road Bike', 'Mountain Bike', 'Sports Bike'];
  const tabContents = [
    <div>
      <Bikes type="" bikes={bikes} />
    </div>,
    <div>
      <Bikes type="Road Bike" bikes={bikes} />
    </div>,
    <div>
      <Bikes type="Mountain Bike" bikes={bikes} />
    </div>,
    <div>
      <Bikes type="Sports Bike" bikes={bikes} />
    </div>,
  ];

  return (
    <div className="mt-3">
      <Image
        src="/images/bike4.jpg"
        alt="Description of the image"
        width={1600}
        height={300}
        className="rounded-lg"
      />
      <div className="rounded overflow-hidden shadow-lg p-10 my-10">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Bikes in Spotlight</h5>

        <div className="mx-auto mt-2">
          <div className="tabs flex border-b">
            {tabTitles.map((title, index) => (
              <button
                key={index}
                className={`tab-button py-2 px-4 ${activeTab === index ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} focus:outline-none`}
                onClick={() => selectTab(index)}
              >
                {title}
              </button>
            ))}
          </div>
          <div className="tab-content mt-4">
            {tabContents[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
