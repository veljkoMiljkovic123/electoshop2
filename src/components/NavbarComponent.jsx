import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import HeadingComponent from "./HeadingComponent";
import CategoryComponent from "./CategoryComponent";

// icons
import { CiHeart, CiShoppingCart } from "react-icons/ci";

// logo
import logo from "../assets/logo.png";

function NavbarComponent() {
  const { totalProduct } = useSelector((state) => state.cartStore);
  const { favoriteTotal } = useSelector((state) => state.favoriteStore);
  return (
    <div>
      <HeadingComponent />
      <nav className="bg-mainBlue h-full lg:h-[100px] py-5">
        <div className="container mx-auto gap-5 flex flex-col lg:flex-row items-center h-full justify-between">
          {/* Logo */}
          <div>
            <Link to={"/"}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          {/* Search Bar */}
          <div className="bg-whiteTextColor rounded-[20px]">
            <input
              className="bg-transparent outline-none px-[25px] py-[17px]"
              type="text"
              placeholder="Search product"
            />
            <button className="bg-mainYellow text-whiteTextColor px-[25px] py-[17px] rounded-[20px]">
              Search
            </button>
          </div>

          {/* Links */}
          <div className="">
            <ul className="flex-center gap-5">
              <li className="flex-center">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    showName={true}
                    appearance={{
                      elements: {
                        avatarBox: "w-[40px] h-[40px]",
                      },
                      variables: {
                        colorText: "#f90",
                      },
                    }}
                  />
                </SignedIn>
              </li>
              <li className="flex-center gap-2">
                <div className="flex-center">
                  <CiHeart color="white" size={25} />
                  <span className="badge">{favoriteTotal}</span>
                </div>
                <Link to="/favorite" className="text-whiteTextColor">
                  Favorite
                </Link>
              </li>
              <li className="flex-center gap-2">
                <div className="flex-center">
                  <CiShoppingCart color="white" size={25} />
                  <span className="badge-2">{totalProduct}</span>
                </div>
                <Link to="/cart" className="text-whiteTextColor">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <CategoryComponent />
    </div>
  );
}

export default NavbarComponent;
