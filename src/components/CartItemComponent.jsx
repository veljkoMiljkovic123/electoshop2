import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  deleteItemCartAction,
  setPriceHandlerAction,
} from "../store/cartSlice";

function CartItemComponent({ item, index }) {
  const dispatch = useDispatch();

  function handleRemoveItem() {
    dispatch(deleteItemCartAction(item));
  }
  return (
    <div className="relative grid grid-cols-4 place-items-center mt-5 border-b-2 pb-[10px]">
      <div className="flex-cen gap-[10px]">
        {/* img */}
        <img
          className="hidden lg:block w-[100px] h-[100px] object-cover rounded-2xl"
          src={item.thumbnail}
          alt={item.title}
        />
        {/* property of product */}
        <div className="">
          <h2>{item.title}</h2>
          <p>{item.category}</p>
          <p>{item.stock}</p>
        </div>
      </div>
      <div className="">
        <p>$ {item.price}</p>
      </div>
      <div className="flex-center">
        <button
          onClick={() =>
            dispatch(
              setPriceHandlerAction({
                increment: -1,
                index,
              })
            )
          }
          className="px-2 py-1 bg-slate-300 text-[18px]"
        >
          -
        </button>
        <span className="px-2 py-1 bg-slate-300 text-[18px]">{item.count}</span>
        <button
          onClick={() =>
            dispatch(
              setPriceHandlerAction({
                increment: 1,
                index,
              })
            )
          }
          className="px-2 py-1 bg-slate-300 text-[18px]"
        >
          +
        </button>
      </div>
      {/* cartTotal */}
      <div className="">${item.cartTotal}</div>
      {/* Remove item */}
      <div>
        <RxCross2
          onClick={handleRemoveItem}
          color="red"
          size={28}
          className="absolute right-0 top-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CartItemComponent;
