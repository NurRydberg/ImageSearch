import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button id="loginBtn" onClick={() => loginWithRedirect()}>Logga in</button>;
};