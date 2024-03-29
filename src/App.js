import React from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./featuers/cart/cartSlice";
import { useEffect } from "react";

const App = () => {
  const disaptch = useDispatch()
  const { isLoading } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state?.modal)

  useEffect(() => {
    disaptch(getCartItems('testing'))
  }, [disaptch])
  
  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
