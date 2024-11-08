// icons
import { CiLocationOn, CiDeliveryTruck } from "react-icons/ci";

function HeadingComponent() {
  return (
    <div className="container h-[90px] gap-[10px] mx-auto flex flex-col justify-center items-center md:justify-between md:flex-row">
      <h3 className="text-blackTextColor">
        Need help? Call us: (+98) 0234 456 789
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <CiLocationOn color="black" size={25} />
          <span className="text-blackTextColor">Our Store</span>
        </div>
        <div className="flex items-center gap-1">
          <CiDeliveryTruck color="black" size={25} />
          <span className="text-blackTextColor">Track Your Order</span>
        </div>
      </div>
    </div>
  );
}

export default HeadingComponent;
