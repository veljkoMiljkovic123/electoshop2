import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartItemComponent from "../components/CartItemComponent";
import country from "../constants/country";

let countryCopy = country.map((c, index) => ({ ...c, id: index + 1 }));

function CartPage() {
  const { cart, totalPrice } = useSelector((state) => state.cartStore);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const coupon = useRef();

  function handleCoupon() {
    setCurrentCoupon(coupon.current.value);

    coupon.current.value = "";
  }

  return (
    <div className="px-4">
      <div className="mt-5 lg:mt-12">
        <div className="container mx-auto flex flex-col justify-between lg:flex-row gap-4">
          {/* Left side */}
          <div className="w-full lg:w-[70%]">
            <div className="grid grid-cols-4 bg-lightBlue h-[68px] place-items-center">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {/* Body content */}
            <div>
              {cart.length > 0 ? (
                cart.map((item, index) => {
                  return (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      index={index}
                    />
                  );
                })
              ) : (
                <h2 className="text-center text-2xl font-bold mt-4">
                  Cart is empty
                </h2>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="flex flex-col">
            <div className="bg-lightBlue">
              <h1 className="text-center text-2xl font-bold">Total price</h1>
              <p className="text-3xl text-center">
                ${currentCoupon === "alphacode" ? totalPrice / 2 : totalPrice}
              </p>
            </div>
            <div className="flex flex-col gap-[10px] mt-3">
              <label className="text-[14px]" htmlFor="coupon">
                Inser coupon for 50%
              </label>
              <input
                ref={coupon}
                type="text"
                id="coupon"
                placeholder="Insert coupon"
                className="p-[10px] rounded-lg border border-mainBlue"
              />
              <button
                onClick={handleCoupon}
                className="bg-mainBlue text-whiteTextColor px-5 py-3 rounded-lg"
              >
                Apply
              </button>
            </div>
            <div className="mt-5">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <select
                className="w-full py-2 px-1 border border-slate-500 rounded-md bg-wHiteTextColor"
                name="country"
                id="country"
              >
                {countryCopy.map((item) => {
                  return (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="bg-mainYellow text-whiteTextColor px-5 py-3 rounded-lg mt-5">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
