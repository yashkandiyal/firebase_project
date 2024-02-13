import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const ListingPage = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [coverpic, setCoverpic] = useState("");
  const [price, setPrice] = useState("");
  
  const firebase = useFirebase();
  
  async function handleSubmit(e) {
    e.preventDefault();
    await firebase.handleCreateListing(name, number, price, coverpic);
    
   
    toast.success("Book successfully listed!", {
      position: "top-center",
    });

    setName(""); // Resetting all state values to empty strings
    setNumber("");
    setCoverpic("");
    setPrice("");
  }
 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-4">List you Book</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name of book
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Book name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ISBN number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              cover picture
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              
              onChange={(e) =>{ setCoverpic(e.target.files[0])}} // Store the selected file object
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              create
            </button>
          </div>
        </form>
        {<ToastContainer autoClose={2000} />}
      </div>
    </div>
  );
};

export default ListingPage;
