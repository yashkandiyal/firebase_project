import React, { useState, useEffect } from "react";
import HomeCard from "./HomeCard";
import { useFirebase } from "../context/firebase";
const HomePage = () => {
  const firebase = useFirebase();
  const [booksData, setbooksData] = useState([]);
  useEffect(() => {
    firebase.listAllBooks().then((books) => setbooksData(books.docs));
  }, []);

  return (
    <div>
      <div className="flex gap-5 flex-wrap mt-5 justify-around">
        {booksData.map((book) => (
          <HomeCard {...book.data()} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
