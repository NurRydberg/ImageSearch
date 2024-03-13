import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface IImages {
  link: string;
}

export const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState<IImages[]>([]);
  const [isHeartClicked, setHeartClicked] = useState<boolean[]>([]);


  const { user } = useAuth0();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const createUser = (index: number, likedImage: string) => {
    const newHeartClicked = [...isHeartClicked];
    newHeartClicked[index] = !newHeartClicked[index];
    setHeartClicked(newHeartClicked);

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

  //FAVORITBILDER

  const getFavorite = () => {
    axios
        .get(`http://localhost:3000/users/${user?.email}/favoriteImages`)
        .then(function (response) {
            console.log(response.data);
        });
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
      <div>
        {images.map((images, index) => (
          <div key={index} className="image-container">
            <FaHeart
              className={`heart-icon ${isHeartClicked[index] ? "clicked" : ""}`}
              onClick={() => createUser(index, images.link)}
            />
            <img key={index} src={images.link} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      
      <button id="favoriteButton" onClick={getFavorite}>
        Favoriter
      </button>
    </form>
  );
};
