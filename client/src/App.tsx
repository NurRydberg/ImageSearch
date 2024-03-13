import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";
import { useEffect } from "react";
import { SearchBox } from "./components/SearchBox";
import axios from "axios";
import fotokarusellen from "../src/assets/fotokarusellen.png";

function App() {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/customsearch/v1?key=${
          import.meta.env.VITE_API_KEY
        }&cx=${import.meta.env.VITE_GOOGLE_ID}&q=flowers`
      )
      .then(function (response) {
      });
  }, []);


  return (
    <div className="app-container">
      <img
        src={fotokarusellen}
        alt=""
        style={{ maxWidth: "40%", height: "auto" }}
      />
      <div className="centered-container">
        {isAuthenticated ? (
          <>
            <SearchBox />

            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}

export default App;
