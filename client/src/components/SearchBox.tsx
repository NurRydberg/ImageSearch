import axios from "axios";
import { useState } from "react";

export const SearchBox = () => {
    const [inputValue, setInputValue] = useState("");
    const [images, setImages] = useState([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(inputValue);
    }

    const handleSearch = async() => {
        const URL = `https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_API_KEY}&cx=${import.meta.env.VITE_GOOGLE_ID}&num=10&searchType=image&q=${inputValue}`
        try {
            const response = await axios.get(URL);
            console.log(response.data.items);
            setImages(response.data.items);
            
        }catch(error){
            console.log("Hittade inga bilder", error);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };



    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" value={inputValue} onChange={handleInput} />
            <button type="submit" onClick={handleSearch}>Starta fotokarusellen!</button>
        </form>
    )
    };