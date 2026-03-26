import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyNav from "./Components/MyNav";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfileNav from "./Components/ProfileNav";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Footer from "./Components/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data?.token) {
      setCurrentUser(data);
    }
  }, []);
  return (
    <>
      <ProfileNav user={currentUser} setUser={setCurrentUser} />
      <MyNav user={currentUser} />
      <Routes>
        {currentUser?.role === "admin" ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users user={currentUser}/>} />
            <Route path="/users/:id" element={<UserDetails />} />
          </>
        ) : (
          <Route path="/*" element={<Error />} />
        )}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={setCurrentUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={currentUser} setUser={setCurrentUser}/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />


        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
