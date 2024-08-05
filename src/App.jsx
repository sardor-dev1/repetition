import Header from "./components/header";
import Main from "./pages/main";
import Aside from "./pages/aside";
import { useReducer } from "react";
import reducer,{ initialState } from "./store/reducer";
import { Context } from "./context/Context";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{state, dispatch}}>
      <body className="h-[100vh]">
        <Header />
        <main className="grid h-[90vh] grid-cols-7">
          <Aside/>
          <Main />
        </main>
      </body>
    </Context.Provider>
  );
};

export default App;
