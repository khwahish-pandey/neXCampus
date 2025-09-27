import React, { useState, useEffect } from 'react';

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completingOrders, setCompletingOrders] = useState(new Set());

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:5000/api/canteen/admin/getorder');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mark order as completed
  const markOrderComplete = async (orderId) => {
    console.log(orderId)
    try {
      setCompletingOrders(prev => new Set([...prev, orderId]));
      
      // Replace with your actual backend URL
      const response = await fetch(`http://localhost:5000/api/canteen/admin/complete/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to complete order: ${response.status}`);
      }
      
      // Remove the completed order from the list
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      
      // Show success message
      alert('Order marked as completed successfully! 🎉');
      
    } catch (err) {
      setError(`Failed to complete order: ${err.message}`);
      console.error('Error completing order:', err);
      alert('Failed to complete order. Please try again.');
    } finally {
      setCompletingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN'),
      time: date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  // Get emoji for menu items
  const getItemEmoji = (itemName) => {
    const emojiMap = {
      'Samosa': '🥟',
      'Cold Drink': '🥤',
      'Ice Cream': '🍦',
      'Dosa': '🥞',
      'Idli': '🍚',
      'Egg Puff': '🥧',
      'Veg Biryani': '🍛',
      'Pav Bhaji': '🍞',
      'Tea': '☕',
      'Coffee': '☕',
      'Maggi': '🍜',
      'Sandwich': '🥪'
    };
    return emojiMap[itemName] || '🍽️';
  };

  useEffect(() => {
    fetchOrders();
    
    // Auto-refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const OrderCard = ({ order }) => {
    const { date, time } = formatDateTime(order.createdAt);
    const isCompleting = completingOrders.has(order._id);

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
        {/* Order Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Order #{order._id.slice(-6).toUpperCase()}
            </h3>
            <p className="text-gray-600">Customer: {order.customerName}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">{date}</div>
            <div className="text-sm text-gray-500">{time}</div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-3">Items Ordered:</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{getItemEmoji(item.name)}</span>
                  <span className="font-medium text-gray-800">{item.name}</span>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                  Qty: {item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Total and Action */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-xl font-bold text-green-600">
            Total: ₹{order.totalAmount}
          </div>
          <button
            onClick={() => markOrderComplete(order._id)}
            disabled={isCompleting}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              isCompleting
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg transform hover:-translate-y-1'
            }`}
          >
            {isCompleting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Completing...
              </div>
            ) : (
              '✓ Mark Complete'
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-8 text-center shadow-2xl mb-8">
          <h1 className="text-4xl md:text-5xl font-light mb-3">📋 Restaurant Orders</h1>
          <p className="text-lg opacity-90">Manage incoming orders efficiently</p>
          
          {/* Refresh Button */}
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="mt-4 bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {loading ? '🔄 Refreshing...' : '🔄 Refresh Orders'}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Loading orders...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <p className="font-semibold">Error loading orders</p>
                <p>{error}</p>
              </div>
            </div>
            <button
              onClick={fetchOrders}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && (
          <>
            {orders.length === 0 ? (
              <div className="text-center text-white py-20">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-light mb-3">No pending orders!</h2>
                <p className="text-xl opacity-80">All orders have been completed.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Pending Orders ({orders.length})
                  </h2>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Footer Info */}
        <div className="text-center text-white mt-12 opacity-70">
          <p>Orders refresh automatically every 30 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOrders;