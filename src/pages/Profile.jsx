import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { decode } from "js-base64";

const Profile = () => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      const [, payload] = token.split(".");
      setAccessToken(JSON.parse(decode(payload)));
    });
  }, [getAccessTokenSilently]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>ID Token</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <h2>Access Token</h2>
      <pre>{JSON.stringify(accessToken, null, 2)}</pre>
    </div>
  );
};

export default Profile;
