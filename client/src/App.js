import StripeCheckout from "react-stripe-checkout";
import Button from "@mui/material/Button";
import { useState } from "react";

function App() {
  const [product, setProduct] = useState({
    name: "React from fb",
    price: 10,
    productBy: "facebook",
  });
  const makePayment = async (token) => {
    const body = {
      product,
      token,
    };
    try {
      const res = await fetch(`http://[::1]:3000/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("Response :", res);
      const { status } = res;
      console.log("Status:", status);
    } catch (err) {
      console.log("Catch Error", err);
    }
  };
  return (
    <div className="App">
      <StripeCheckout
        token={makePayment}
        stripeKey="pk_test_51KNvwbEJpWsAdIisL6XXxwtIL1w0SthCdNnXu0G06lBtUaAyeJhEUFJ7DM9dBVg7jsDDfoZud8ijrIew6kDChZmg009L5lVh1v"
        name="buysomething"
        amount={product.price * 100}
      >
        <Button variant="outlined">
          Buy a Product for just {product.price}$
        </Button>
      </StripeCheckout>
    </div>
  );
}

export default App;
