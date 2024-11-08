import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { saveInCartAction } from "../store/cartSlice";
import Rating from "@mui/material/Rating";
import ProductsService from "../services/productsService";
import Loader from "../components/Loader";

// icons
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { saveFavoriteAction } from "../store/favoriteSlice";

function SingleProductPage() {
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);

  const { allFavorite } = useSelector((state) => state.favoriteStore);

  // dispatch
  const dispatch = useDispatch();
  // 1. uzmi ID
  const { productId } = useParams();

  useEffect(() => {
    // 2. Poslati request.. Service
    ProductsService.getSingleProduct(productId)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCurrentImage(index) {
    setCurrentImage(index);
  }

  function handleAddToCart() {
    dispatch(saveInCartAction(product));
  }

  function handleAddFavorite() {
    dispatch(saveFavoriteAction(product));
  }

  // Framer animtion
  const fadeInAnimationVariantsLeft = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.5,
      },
    },
  };

  // Framer animtion
  const fadeInAnimationVariantsRight = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.5,
      },
    },
  };

  // useEffect(() => {
  //   allFavorite.find((item) => {
  //     if ((item.id = parseInt(productId))) {
  //       setFavoriteIdIcon(item.id);
  //       return;
  //     }
  //   });
  // }, [allFavorite]);
  // console.log(favoriteIdIcon);

  return (
    <div className="mt-[50px] px-[10px] py-5">
      {isLoading ? (
        <div className="container mx-auto flex items-start gap-5 flex-col md:flex-row">
          {/* Left side */}
          <motion.div
            variants={fadeInAnimationVariantsLeft}
            initial="initial"
            whileInView="animate"
            className="w-full md:w-[50%]"
          >
            <img
              className="h-[400px]"
              src={product.images[currentImage]}
              alt={product.title}
            />
            <div className="flex items-center gap-5 flex-wrap">
              {product.images.map((imgSrc, index) => {
                return (
                  <img
                    className="w-[100px] h-[100px] object-cover border-2 border-mainBlue rounded-xl mt-5"
                    src={imgSrc}
                    key={index}
                    onClick={() => handleCurrentImage(index)}
                  />
                );
              })}
            </div>
          </motion.div>
          {/* right side */}
          <motion.div
            variants={fadeInAnimationVariantsRight}
            initial="initial"
            whileInView="animate"
            className="w-full md:w-[50%] flex flex-col gap-3"
          >
            <h2 className="font-extrabold text-2xl text-mainBlue">
              {product.title}
            </h2>
            <span className="text-blueTextColor text-[20px]">
              $ {product.price}
            </span>
            <p className="flex-center gap-[10px]">
              <span className="text-balckTextColor text-[20px]">Reviews:</span>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
            </p>
            <p className="flex items-center gap-[10px] text-[20px] text-blackTextColor">
              Availibility:
              {product.stock ? (
                <span className="flex-center text-lightGreen gap-[5px]">
                  <FaCheck /> In stock
                </span>
              ) : (
                <span className="flex-center text-mainRed gap-[5px]">
                  <RxCross2 size={24} /> Out of stock
                </span>
              )}
            </p>
            <p className="text-[20px] text-blackTextColor">
              Hurry up! only <span className="font-bold">{product.stock}</span>{" "}
              product left in stock!
            </p>
            <p className="text-[20px] text-blackTextColor">
              Total price:{" "}
              <span className="text-blueTextColor text-[20px]">
                {" "}
                ${product.price}
              </span>
            </p>
            {/* ADD / Favorite Button */}
            <div className="flex-center mt-12 gap-5">
              <Link
                className="bg-mainYellow text-whiteTextColor px-6 py-3 rounded-xl shadow-lg text-[20px]"
                to="/cart"
                onClick={handleAddToCart}
              >
                Add To Cart
              </Link>
              <Link
                className="bg-lightBlue px-6 py-3 rounded-xl shadow-lg border-2 border-blackTextColor"
                to="/favorite"
                onClick={handleAddFavorite}
              >
                {/* {favoriteIdIcon === parseInt(productId) ? (
                  <CiHeart size={28} color="red" />
                ) : (
                  <CiHeart size={28} />
                )} */}
                <CiHeart size={28} />
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default SingleProductPage;
