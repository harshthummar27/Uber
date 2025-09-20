import React from "react";

const LocationSearchPanel = (props) => {
  const location = [
    "A40, shajanand slock, sargasan cross road, gandhinagar",
    "B41, shajanand slock, sargasan cross road, gandhinagar",
    "C42, shajanand slock, sargasan cross road, gandhinagar",
    "D43, shajanand slock, sargasan cross road, gandhinagar",
  ];
  return (
    <div>
      {location.map(function (elem, index) {
        return (
          <div key={index} onClick={() =>{props.setVehiclePanal(true)}} className="flex gap-4 items-center my-2 border-2 p-3 border-gray-50 active:border-black justify-start rounded-xl">
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
