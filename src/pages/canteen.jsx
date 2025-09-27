import React, { useState , useEffect} from 'react';
import { jwtDecode } from "jwt-decode";

const CanteenMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/canteen/customer/getMenu"
        );
        const data= await response.json()
        console.log(data) // replace with your endpoint
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  // Add item to cart
  const addToCart = (itemId, itemName, price) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: {
        name: itemName,
        price: price,
        quantity: (prevCart[itemId]?.quantity || 0) + 1,
      },
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId]) {
        if (newCart[itemId].quantity > 1) {
          newCart[itemId].quantity -= 1;
        } else {
          delete newCart[itemId];
        }
      }
      return newCart;
    });
  };

  // Get total items in cart
  const getTotalItems = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of cart
  const getTotalPrice = () => {
    return Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Place order
 const placeOrder = async () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Get user name from JWT
  let userName = "Unknown";
  const token = localStorage.getItem("token"); // assuming you store JWT in localStorage
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.name) userName = decoded.name;
    } catch (err) {
      console.warn("Invalid JWT token, using Unknown as user name");
    }
  }

  // Prepare order items array
  const orderItems = Object.values(cart).map((item) => ({
    name: item.name,
    quantity: item.quantity,
  }));

  const orderData = {
    customerName: userName,
    items: orderItems,
    totalAmount: getTotalPrice(),
  };

  try {
    const response = await fetch("http://localhost:5000/api/canteen/customer/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    const data = await response.json();
    alert(`✅ Order placed successfully!\nOrder ID: ${data.orderId}`);
    setCart({});
  } catch (error) {
    console.error("Error placing order:", error);
    alert("❌ Failed to place order. Please try again.");
  }
};
  const MenuItemCard = ({ item }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="text-xl font-semibold text-gray-800 mb-2">
        {item.emoji} {item.name}
      </div>
      <div className="text-xl text-green-600 font-bold mb-3">₹{item.price}</div>
      <div className="text-gray-600 mb-4 leading-relaxed">{item.description}</div>
      <button 
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        onClick={() => addToCart(item._id, item.name, item.price)}
      >
        Add to Cart
      </button>
    </div>
  );

  const CartItem = ({ itemId, item }) => {
    const itemTotal = item.price * item.quantity;
    
    return (
      <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
        <div>
          <div className="font-semibold text-gray-800">{item.name}</div>
          <div className="text-sm text-gray-600">₹{item.price} × {item.quantity} = ₹{itemTotal}</div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm transition-colors"
            onClick={() => removeFromCart(itemId)}
          >
            −
          </button>
          <span className="text-gray-700 font-medium px-2">{item.quantity}</span>
          <button 
            className="w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm transition-colors"
            onClick={() => addToCart(itemId, item.name, item.price)}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-3xl p-8 text-center shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-light mb-3">🍽️ Campus Canteen</h1>
          <p className="text-lg opacity-90">Fresh & Delicious Food Made Daily</p>
        </div>

        {/* Cart Section */}
        <div className="bg-gray-50 p-6 shadow-xl sticky top-0 z-50 border-b-4 border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex items-center text-2xl font-semibold text-gray-800 mb-2 md:mb-0">
              <span className="text-3xl mr-3">🛒</span>
              Your Cart (<span className="text-green-600">{getTotalItems()}</span> items)
            </div>
          </div>
          
          <div className="max-h-48 overflow-y-auto mb-4">
            {Object.keys(cart).length === 0 ? (
              <div className="text-center text-gray-500 italic py-4">
                Your cart is empty. Add some delicious items!
              </div>
            ) : (
              Object.entries(cart).map(([itemId, item]) => (
                <CartItem key={itemId} itemId={itemId} item={item} />
              ))
            )}
          </div>
          
          <div className="text-right text-2xl font-bold text-green-600 mb-4">
            Total: ₹{getTotalPrice()}
          </div>
          
          <button 
            className={`w-full font-bold py-4 px-6 rounded-full transition-all duration-300 transform ${
              Object.keys(cart).length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:-translate-y-1 hover:shadow-lg'
            } text-white`}
            disabled={Object.keys(cart).length === 0}
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>

        {/* Menu Section */}
        <div className="bg-white p-8 rounded-b-3xl shadow-2xl">
          <h2 className="text-4xl font-light text-center text-gray-800 mb-2">Our Menu</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanteenMenu;