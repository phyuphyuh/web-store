import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const BuyNowButton = ({ product }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const buy = async () => {
    // We need an access token for our API to get the
    // Stripe Customer ID from
    const accessToken = await getAccessTokenSilently();

    // Call the API endpoint, passing in the access token
    // as a header, and the Price ID as the payload
    fetch("/.netlify/functions/buy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: product.prices[0].id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // The response is a checkout session object,
        // which has a `url` attribute which we simply
        // redirect the user to
        window.location.assign(json.url);
      });
  };

  if (isLoading) return <></>;

  if (isAuthenticated) return <button onClick={buy}>Buy Now</button>;

  return <button onClick={loginWithRedirect}>Log In To Purchase</button>;
};

const Home = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch("/.netlify/functions/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [setProducts]);

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the web store!</p>
      <div className="products">
        {products &&
          products.map((product) => (
            <div key={product.id} className="product">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              {product.images && product.images[0] && (
                <img src={product.images[0]} alt={product.name} />
              )}
              <p className="sku">SKU: {product.id}</p>
              <div className="price">
                ${(product.prices[0].unit_amount / 100).toFixed(2)} {product.prices[0].currency.toUpperCase()}
              </div>
              <div className="buy">
                <BuyNowButton product={product} />
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Home;
