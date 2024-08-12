import { Context } from "./context/Context";
import ResponsiveDrawer from "./components/sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  const value = {};

  return (
    <Context.Provider value={value}>
      <Outlet/>
    </Context.Provider>
  );
};

export default App;
