import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
   const [searchQuery,setSearchQuery]= useState({});

  // Load products (placeholder for API)
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add item to cart
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Item added to cart!");
  };

  // Update item quantity directly
  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Cart updated!");
  };

  // Remove one quantity from cart
  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Item removed from cart");
    } else {
      toast.error("Item not in cart");
    }
  };
  //Get cart items counted
  const getCartCount = () =>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }
//get cart amount
const getCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    const itemInfo = products.find(product => product._id === itemId); // Fix 1: use _id instead of id
    if (itemInfo && cartItems[itemId] > 0) {                           // Fix 2: check if itemInfo exists
      totalAmount += itemInfo.offerPrice * cartItems[itemId];
    }
  }
  return Math.floor(totalAmount * 100) / 100;

}
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
