import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

interface IImages {
  link: string;
}

export const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState<IImages[]>([]);
  const [isHeartClicked, setHeartClicked] = useState<boolean[]>([]);
  const [favoriteImages, setFavoriteImages] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false); // State to control visibility of favorited images
  
  const { user } = useAuth0();

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputValue);
  };

  const handleSearch = async () => {
    const URL = `https://www.googleapis.com/customsearch/v1?key=${
      import.meta.env.VITE_API_KEY
    }&cx=${
      import.meta.env.VITE_GOOGLE_ID
    }&num=10&searchType=image&q=${inputValue}&lr=lang_sv`;
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      setImages(response.data.items);
    } catch (error) {
      console.log("Hittade inga bilder", error);
    }
  };

  const handleInput = function (e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  };

  const createUser = function (index: number, likedImage: string) {
    const newHeartClicked = [...isHeartClicked];
    newHeartClicked[index] = !newHeartClicked[index];
    setHeartClicked(newHeartClicked);

    setFavoriteImages([...favoriteImages, likedImage]);

    axios
      .post(
        "http://localhost:3000/users",
        {
          email: user?.email,
          image: likedImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      });
  };

  const toggleFavorites = async () => {
    if (!showFavorites) {
      try {
        // Fetch favorited images if showFavorites is false
        const response = await axios.get(`http://localhost:3000/users/${user?.email}/favoriteImages`);
        setFavoriteImages(response.data); // Update favoriteImages with the fetched images
      } catch (error) {
        console.log(error);
        return;
      }
    }
    
    setShowFavorites(!showFavorites); // Toggle the display of favorited images
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInput}
      />
      <button id="searchBtn" type="submit" onClick={handleSearch}>
        Starta fotokarusellen!
      </button>

     {/* Button to toggle display of favorited images */}
     <button id="favoriteButton" onClick={toggleFavorites}>
        {showFavorites ? "Göm Favoriter" : "Visa Favoriter"}
      </button>

      {/* Conditionally render favorited images */}
      {showFavorites && (
        <div className="favorite-images">
          {favoriteImages.map((image, index) => (
            <img key={index} src={image} alt={`Favorite Image ${index}`} />
          ))}
        </div>
      )}
      {!showFavorites && (
        <div>
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <FaHeart
                className={`heart-icon ${isHeartClicked[index] ? "clicked" : ""}`}
                onClick={() => createUser(index, image.link)}
              />
              <img key={index} src={image.link} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
      )}
    </form>
  );
};
