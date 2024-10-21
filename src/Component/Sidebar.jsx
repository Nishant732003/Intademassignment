import React, { useState } from "react";

const Sidebar = ({ pins, onPinClick, onPinDelete, onPinEdit }) => {
  const [editingPin, setEditingPin] = useState(null);
  const [editedRemark, setEditedRemark] = useState("");

  const handleEditClick = (index, remark) => {
    setEditingPin(index);
    setEditedRemark(remark);
  };

  const handleSaveEdit = (index) => {
    onPinEdit(index, editedRemark);
    setEditingPin(null);
    setEditedRemark("");
  };

 
  const extractCityAndStreet = (address) => {
      const parts = address.split(",");
      
    const street = parts[0] ? parts[0].trim() : ""; 
    const street1= parts[1] ? parts[1].trim() : ""; 
      const place = parts[2] ? parts[2].trim() : "";
      const city = parts[5] ? parts[5].trim() : "";
      const part9 = parts[9] ? parts[9].trim() : "";
    return `${street}, ${street1} ,${place} ,${city} ${part9}`; 
  };

  return (
    <div className="w-1/5 bg-slate-800 h-screen overflow-y-auto relative no-scrollbar">
      <div className="ml-3 my-3 text-3xl font-extrabold flex items-center justify-between">
        <div className="flex items-center">
          <span className="animate-pulse bg-gradient-to-r from-orange-500 via-green-400 to-amber-400 bg-clip-text text-transparent">
            Marked Locations
          </span>
          <div className="animate-[propel_5s_infinite]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              className="h-8 w-8 mr-7 mb-7"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </div>
        </div>
      </div>
      <ul>
        {pins.map((pin, index) => (
          <li key={index} className="relative">
            <div>
              <p
                className="mt-4 ml-3 text-slate-50 cursor-pointer"
                onClick={() => onPinClick(index)}
              >
                <b className="text-amber-500">Remark:</b>{" "}
                <span className="text-yellow-200">{pin.remark}</span>
              </p>
              <p
                className="ml-3 text-slate-50 mr-3 cursor-pointer text-sm"
                onClick={() => onPinClick(index)}
              >
                <b className="text-amber-500">Address:</b>{" "}
                <span className="text-yellow-200 text-xs">{extractCityAndStreet(pin.address)}</span>
              </p>
              <div className="space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(index, pin.remark);
                  }}
                  className="mt-2 ml-5 text-sm font-bold px-2 py-1 leading-none text-lime-500 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-amber-400 from-gray-900 to-black transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPinDelete(index);
                  }}
                  className="mt-2 ml-5 text-sm font-bold px-2 py-1 leading-none text-lime-500 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-red-600 from-gray-900 to-black transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
            {editingPin === index && (
              <div className="absolute top-0 left-0 w-full bg-slate-400 shadow-lg rounded-lg p-4 z-10">
                <input
                  value={editedRemark}
                  onChange={(e) => setEditedRemark(e.target.value)}
                  className="bg-white w-full px-1 py-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-2 mr-6">
                  <button
                    onClick={() => handleSaveEdit(index)}
                    className="mr-3 px-2 py-1 text-white bg-orange-600 rounded-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPin(null)}
                    className="mr-3 px-3 py-1 text-gray-700 bg-orange-500 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
