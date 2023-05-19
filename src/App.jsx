import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { MdLocationOn } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci'
import { BsPersonCircle } from 'react-icons/bs'
import { location } from "./location";

const AnyReactComponent = ({ text }) => <div className="text-2xl text-indigo-700 bg-purple-700 rounded-md border">{text}</div>;

export default function App() {
  const [select, setSelect] = useState("")
  const [view, setView] = useState([28.644800, 77.216721])
  const zoom = Number(11);

  const handleLocation = (place) => {
    setSelect(place.id);
    setView([place.lat, place.lng])

  }

  useEffect(() => { }, [view])


  return (
    <div>
      <div className="h-[5vh] bg-indigo-500 flex items-center justify-between px-5 text-2xl text-white">
        <div className="flex items-center gap-x-3">Location Viewer <CiLocationOn className="text-lg" /></div>
        <BsPersonCircle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-5 mx-5">
        <div className="order-2 md:order-1 p-2 ">
          <h1>Location Map</h1>

          <div style={{ height: '80vh', width: '100%' }} className="rounded-lg border">
            <GoogleMapReact
              bootstrapURLKeys={{ key: import.meta.env.VITE_APP_APIKEY, language: 'en' }}
              center={view}
              defaultZoom={zoom}
            >
              <AnyReactComponent
                lat={view[0]}
                lng={view[1]}
                text={<MdLocationOn className="text-4xl text-indigo-700 " />}
              />
            </GoogleMapReact>
          </div>
        </div>


        <div className="order-1 md:order-2">
          <h1 className="text-xl text-slate-400 mb-2">Select image for view Location on Map</h1>
          <div className="grid grid-cols-2  md:grid-cols-3 w-[100%] gap-3">
            {location.map(place => {
              return (<div key={place.id} className={`${select === place.id ? "border-2 border-indigo-600" : ""} rounded-md h-40 bg-slate-100`} onClick={() => handleLocation(place)}>
                <img src={place.img} className="h-[100%] rounded-md object-contain w-[100%] p-1" alt="image" />
              </div>)
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
