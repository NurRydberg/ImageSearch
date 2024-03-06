import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";
import { useEffect } from "react";
import { SearchBox } from "./components/SearchBox";

function App() {
  // useEffect(() => {
  //   const search = async () => {
  //     const response = await fetch("https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146")
  //     const data = await response.json()
  //     console.log(data)
  //   }
  // }, []);

  const { isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <>
          <SearchBox />
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default App;
