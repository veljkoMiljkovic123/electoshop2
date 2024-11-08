import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
//import Loader from '../components/Loader';
import CardProductComponent from "../components/CardProductComponent";

function FavoritePage() {
  const { allFavorite } = useSelector((state) => state.favoriteStore);

  // Framer animtion
  const fadeInAnimationVariants = {
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
  return (
    <div className="container mx-auto py-3">
      <h1 className="text-center my-7 text-3xl text-mainBlue uppercase">
        Favorite items
      </h1>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        className="flex flex-wrap items-center justify-center flex-col lg:flex-row gap-7"
      >
        {allFavorite.map((fav) => {
          return <CardProductComponent key={fav.id} product={fav} />;
        })}
      </motion.div>
      {/* {isLoaded ? (
        allFavorite.map((fav) => {
          return <CardProductComponent key={fav.id} product={fav} />;
        })
      ) : (
        <div className="flex">
          <Loader />
        </div>
      )} */}
    </div>
  );
}

export default FavoritePage;
