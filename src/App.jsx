import { Context } from "./context/Context";
import ResponsiveDrawer from "./components/sidebar";

const App = () => {
  const value = {};

  return (
    <Context.Provider value={value}>
      <ResponsiveDrawer />
    </Context.Provider>
  );
};

export default App;
