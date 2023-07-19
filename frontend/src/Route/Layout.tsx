import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/ProductId/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Main from "./Main";
import Wishlist from "../pages/Wishlist/Wishlist";

const Layout = () => {
  return (
    <Routes>
      <Route path="" element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
      </Route>

      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>

  )
};

export default Layout;
