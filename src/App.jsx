import { Outlet } from "react-router-dom";
import axios from "axios";

import NavbarComponent from "./components/NavbarComponent";

axios.defaults.baseURL = "https://dummyjson.com/";

function App() {
  return (
    <div className="">
      <NavbarComponent />
      <Outlet />
    </div>
  );
}

export default App;
