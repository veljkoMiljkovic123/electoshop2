import { createSlice } from "@reduxjs/toolkit";

function roundToTwoDecimals(value) {
  return Math.round(value * 100) / 100;
}

function subTotal(arrayCart) {
  return roundToTwoDecimals(
    arrayCart.reduce((acc, current) => {
      return acc + current.cartTotal;
    }, 0)
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProduct: 0,
    totalPrice: 0,
  },
  reducers: {
    saveInCartAction: (state, action) => {
      let copyArray = [...state.cart];
      let findIndex = null;

      copyArray.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex === null) {
        copyArray.push({
          ...action.payload,
          count: 1,
          cartTotal: roundToTwoDecimals(action.payload.price),
        });
        state.totalProduct++;
        state.totalPrice = roundToTwoDecimals(
          state.totalPrice + action.payload.price
        );
      } else {
        copyArray[findIndex].count++;
      }

      state.cart = copyArray;
    },
    deleteItemCartAction: (state, action) => {
      let copyArray = [...state.cart];
      let findIndex = null;

      copyArray.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex !== null) {
        copyArray.splice(findIndex, 1);
        state.totalPrice = subTotal(copyArray);
      }

      state.cart = copyArray;
    },
    setPriceHandlerAction: (state, action) => {
      const { increment, index } = action.payload;
      let copyArray = [...state.cart];

      copyArray[index].cartTotal = roundToTwoDecimals(
        copyArray[index].cartTotal + copyArray[index].price * increment
      );

      state.totalPrice = subTotal(copyArray);

      if (copyArray[index].count === 1 && increment === -1) {
        copyArray.splice(index, 1);
        state.totalProduct--;
      } else {
        copyArray[index].count += increment;
      }

      state.cart = copyArray;
    },
  },
});

export const { saveInCartAction, deleteItemCartAction, setPriceHandlerAction } =
  cartSlice.actions;
export default cartSlice.reducer;
