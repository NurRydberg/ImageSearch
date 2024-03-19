import React, { useEffect, useState } from "react";
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
  const [showFavorites, setShowFavorites] = useState(false); 
  const [searchTime, setSearchTime] = useState(0);
  const [spelling, setSpelling] = useState("");
  const [isSpellingClicked, setIsSpellingClicked] = useState(false);
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
      setSearchTime(response.data.searchInformation.searchTime);
      if (response.data.spelling && response.data.spelling.correctedQuery) {
        setSpelling(response.data.spelling?.correctedQuery);
      } else {
        setSpelling("");
      }
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
        const response = await axios.get(
          `http://localhost:3000/users/${user?.email}/favoriteImages`
        );
        setFavoriteImages(response.data); 
      } catch (error) {
        return;
      }
    }

    setShowFavorites(!showFavorites); 
  };
  
  useEffect(() => {
    if (isSpellingClicked) {
     handleSearch();
     setIsSpellingClicked(false);
    }
  },[isSpellingClicked]);


  const handleSpelling = () => {
    setInputValue(spelling);
    setIsSpellingClicked(true);
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
      {searchTime > 0 && <p>Sökningen tog {searchTime} sekunder</p>}
      {spelling && (
        <p>
          Menade du...{""}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={handleSpelling}
          >
            {spelling}
          </span>
          ?
        </p>
      )}
      <button id="favoriteButton" onClick={toggleFavorites}>
        {showFavorites ? "Göm Favoriter" : "Visa Favoriter"}
      </button>
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
                className={`heart-icon ${
                  isHeartClicked[index] ? "clicked" : ""
                }`}
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
