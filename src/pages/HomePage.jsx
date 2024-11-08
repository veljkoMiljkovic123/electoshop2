import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import Loader from "../components/Loader";
import ProductsService from "../services/productsService";
import { saveAllProductsAction } from "../store/productSlice";
import CardProductComponent from "../components/CardProductComponent";

import { FaList } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

function HomePage() {
  const dispatch = useDispatch();
  const { allProducts, currentCategory } = useSelector(
    (state) => state.productStore
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState("listView");
  // const { isSignedIn, user, isLoaded } = useUser();
  // if (!isLoaded) {
  //   // Handle loading state however you like
  //   return null;
  // }

  // if (isSignedIn) {
  //   console.log(user);
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let response;
  //       if (currentCategory === 'allProducts') {
  //         response = await ProductsService.getAllProducts();
  //       } else {
  //         response = await ProductsService.getAllProductsByCategory(currentCategory);
  //       }
  //       dispatch(saveAllProductsAction(response.data.products));
  //       setIsLoaded(true);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();

  // }, [currentCategory]);

  useEffect(() => {
    if (currentCategory === "allProducts") {
      ProductsService.getAllProducts()
        .then((res) => {
          dispatch(saveAllProductsAction(res.data.products));
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    } else {
      ProductsService.getAllProductsByCategory(currentCategory)
        .then((res) => {
          dispatch(saveAllProductsAction(res.data.products));
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, [currentCategory]);

  return (
    <main className="container mx-auto px-4 md:px-0">
      {/* grid/list view */}
      <div className="flex justify-end mt-5 mr-5 gap-5">
        <button
          onClick={() => setActiveView("listView")}
          className={activeView === "listView" ? "layoutView" : "p-1"}
        >
          <FaList size={30} />
        </button>
        <button
          onClick={() => setActiveView("gridView")}
          className={activeView === "gridView" ? "layoutView" : "p-1"}
        >
          <IoGridOutline size={30} />
        </button>
      </div>

      {/* Our products */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={
          activeView === "listView"
            ? "grid grid-cols-1 gap-5 mt-5"
            : "grid grid-cols-1 place-items-center gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        }
      >
        {isLoaded ? (
          allProducts.map((product) => {
            return (
              <CardProductComponent
                key={product.id}
                product={product}
                activeView={activeView}
              />
            );
          })
        ) : (
          <div className="flex">
            <Loader />
          </div>
        )}
      </motion.div>
    </main>
  );
}

export default HomePage;
