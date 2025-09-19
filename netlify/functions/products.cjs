const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  let products = [];

  const prices = await stripe.prices.list({
    expand: ["data.product"],
  });

  prices.data.map((price) => {
    let product = price.product;
    delete price.product;

    if (product.active) {
      let existingProduct = products.find(p => p.id === product.id);

      if (existingProduct) {
        existingProduct.prices.push(price);
      } else {
        products.push({ ...product, prices: [price] });
      }
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
