import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { Products, Cart, SingleProduct, Main, NotFound } from "../pages/index";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />}>
          <Route index element={<Products />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/not-found"/>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default Index;
