import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";

const HomeCard = (props) => {
  const firebase = useFirebase();

  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getimageURL(props.imageURL).then((url) => setUrl(url));
  }, [firebase, props.imageURL]);

  return (
    <div className="max-w-md w-64 rounded overflow-hidden shadow-lg">
      <img src={url} alt={props.name} className="h-64 w-full object-cover" />
      <div className="px-8 py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-gray-700 text-base mb-2">ISBN: {props.number}</p>
        <p className="text-gray-700 text-base mb-2">Price: {props.price}</p>
      </div>
    </div>
  );
};

export default HomeCard;
