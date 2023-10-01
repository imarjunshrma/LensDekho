import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import ProductDetail from "@/pages/ProductDetail";
import Wishlist from "@/pages/Wishlist";

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
