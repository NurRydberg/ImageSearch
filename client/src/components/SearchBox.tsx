import axios from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";


interface IImages {
    link: string;
}

export const SearchBox = () => {
    const [inputValue, setInputValue] = useState("");
    const [images, setImages] = useState <IImages[]>([]);
    const [isHeartClicked, setHeartClicked] = useState<boolean[]>([]);



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(inputValue);
    }

    const handleSearch = async() => {
        const URL = `https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_API_KEY}&cx=${import.meta.env.VITE_GOOGLE_ID}&num=10&searchType=image&q=${inputValue}&lr=lang_sv`
        try {
            const response = await axios.get(URL);
            console.log(response.data);
            setImages(response.data.items);
            
        }catch(error){
            console.log("Hittade inga bilder", error);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };


    const handleHeartClick = (index: number) => {
        const newHeartClicked = [...isHeartClicked];
        newHeartClicked[index] = !newHeartClicked[index];
        setHeartClicked(newHeartClicked);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" value={inputValue} onChange={handleInput} />
            <button id="searchBtn" type="submit" onClick={handleSearch}>Starta fotokarusellen!</button>
        <div>
            {images.map((images, index) => (
                <div key={index} className="image-container">
                   <FaHeart 
                            className={`heart-icon ${isHeartClicked[index] ? 'clicked' : ''}`} 
                            onClick={() => handleHeartClick(index)}
                        />
                    <img key={index} src={images.link} alt={`Image ${index}`}/>
                </div>
            ))}
        </div>
        
        </form>
    )
    };