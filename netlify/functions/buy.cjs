const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { NetlifyJwtVerifier } = require("@serverless-jwt/netlify");

const verifyJwt = NetlifyJwtVerifier({
  issuer: "https://" + process.env.VITE_AUTH0_DOMAIN + "/",
  audience: process.env.VITE_AUTH0_AUDIENCE,
});

exports.handler = verifyJwt(async function (event, context) {
  // Get Stripe Customer ID from Access Token
  const stripeCustomerId = context.identityContext.claims[process.env.VITE_AUTH0_AUDIENCE + "/stripe_customer_id"];

  // Decode the payload
  const payload = JSON.parse(event.body);

  // Create a new Stripe Checkout Session
  //
  // See Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    success_url: process.env.VITE_AUTH0_AUDIENCE + "/success",
    cancel_url: process.env.VITE_AUTH0_AUDIENCE + "/",
    payment_method_types: ["card"],
    customer: stripeCustomerId,
    line_items: [
      {
        price: payload.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  };
});
