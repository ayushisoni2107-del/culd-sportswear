import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

// --- Layout Wrapper ---
const Layout = ({ children, searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen, cart, setIsCartOpen, isCartOpen, removeFromCart }) => {
  const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);

  return (
    <div className="bg-white min-h-screen font-sans text-black overflow-x-hidden">
      
      {/* --- CART SIDEBAR --- */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[110] shadow-2xl transform transition-transform duration-500 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center border-b pb-6 mb-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Your Cart ({cart.length})</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-xl p-2 hover:rotate-90 transition-transform">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-6">
            {cart.length === 0 ? <p className="text-gray-400 text-center mt-20 italic">Your cart is empty.</p> : 
              cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center animate-in fade-in duration-300">
                  <img src={item.img} className="w-16 h-20 object-cover rounded-xl" alt={item.name} />
                  <div className="flex-1 text-sm">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-xs text-gray-400 uppercase font-bold">Size: {item.size} | Qty: {item.quantity}</p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.name, item.size)} className="text-red-500 text-[10px] uppercase font-black tracking-widest">Remove</button>
                </div>
              ))
            }
          </div>
          {cart.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between text-xl font-black mb-6 italic uppercase tracking-tighter">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full bg-black text-white text-center py-5 rounded-full font-bold uppercase tracking-widest hover:scale-[1.02] transition">Checkout Now</Link>
            </div>
          )}
        </div>
      </div>

      {/* --- SEARCH OVERLAY --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white/98 z-[120] flex flex-col items-center pt-32 animate-in fade-in slide-in-from-top-4 duration-300">
          <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="absolute top-10 right-10 text-xl font-light p-4">CLOSE ✕</button>
          <div className="w-full max-w-3xl px-6 text-center border-b border-gray-200 pb-6">
            <input 
              autoFocus 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search items..." 
              className="w-full text-5xl font-bold outline-none text-center bg-transparent" 
            />
          </div>
        </div>
      )}

      {/* --- NAVIGATION BAR --- */}
      <div className="bg-[#0e0e0e] text-white text-[10px] py-2.5 text-center uppercase tracking-[0.3em] font-medium">New season coming! Discount 10% for all products</div>
      <nav className="flex justify-between items-center px-8 md:px-16 py-6 sticky top-0 bg-white z-50 shadow-sm">
        <Link to="/" onClick={() => setSearchQuery("")} className="text-2xl font-black tracking-tighter uppercase italic">Culd.</Link>
        <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/store" className="hover:text-black transition">Store</Link>
          <Link to="/contact" className="hover:text-black transition">Contact</Link>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setIsSearchOpen(true)} className="text-lg p-2 hover:scale-110 transition">🔍</button>
          <button onClick={() => setIsCartOpen(true)} className="relative text-lg p-2 hover:scale-110 transition">
            🛒 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
};

// --- Store/Home Grid Component ---
const ProductGrid = ({ searchQuery, products }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Tops", "Bottoms", "Accessories"];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="px-8 md:px-16 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b pb-4">
        <h3 className="text-[12px] font-black tracking-[0.5em] uppercase italic">
          {searchQuery ? `Results for "${searchQuery}"` : `${activeCategory} Collection.`}
        </h3>
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`${activeCategory === cat ? "text-black border-b-2 border-black" : "text-gray-300 hover:text-black"} pb-1 transition-all`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((p, i) => (
          <Link key={i} to={`/product/${encodeURIComponent(p.name)}`} className="group">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#f6f6f6] mb-5 shadow-sm">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            </div>
            <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{p.name}</h4>
            <p className="font-bold text-lg">{p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

// --- Product Detail Component ---
const ProductDetail = ({ products, addToCart }) => {
  const { name } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const sizes = ["S", "M", "L", "XL"];
  
  const product = products.find(p => p.name === decodeURIComponent(name));
  if (!product) return <div className="p-20 text-center font-bold">Product Not Found</div>;

  return (
    <div className="flex flex-col md:flex-row gap-16 px-8 md:px-16 py-20 animate-in fade-in duration-500">
      <div className="flex-1 aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl">
        <img src={product.img} className="w-full h-full object-cover" alt={product.name} />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <Link to="/" className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 block hover:text-black transition">← Back to Shop</Link>
        <h2 className="text-6xl font-black italic mb-4 tracking-tighter uppercase leading-none">{product.name}</h2>
        <p className="text-3xl font-light mb-10 text-gray-400">{product.price}</p>
        
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Select Size</p>
          <div className="flex gap-4">
            {sizes.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)} className={`w-16 h-16 rounded-[1.25rem] border-2 text-sm font-bold transition-all duration-300 ${selectedSize === size ? "bg-black text-white border-black scale-110" : "border-gray-100 hover:border-black"}`}>{size}</button>
            ))}
          </div>
        </div>

        <button onClick={() => { if(!selectedSize) return alert("Please select a size first!"); addToCart({...product, size: selectedSize}); }} className="bg-black text-white w-full md:w-80 py-6 rounded-full font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-[1.05] transition active:scale-95">{selectedSize ? `Add To Cart — ${selectedSize}` : "Select Size First"}</button>
      </div>
    </div>
  );
};

// --- Contact Component ---
const Contact = () => {
  const handleContact = (e) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
  };

  return (
    <div className="px-8 md:px-16 py-20 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-16 leading-none">Get in <br/> Touch.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-12">
          <p className="text-gray-400 text-lg leading-relaxed">Have questions about our fitness collections, shipping, or your order? Reach out and our team will assist you within 24 hours.</p>
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Customer Service</h4>
              <p className="font-bold text-xl underline">hello@culd-sport.com</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Office Headquarters</h4>
              <p className="font-bold text-xl leading-snug">123 Athletic Way, New York, NY 10001</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleContact} className="space-y-6">
          <input required type="text" placeholder="Full Name" className="w-full bg-[#f6f6f6] p-6 rounded-[2rem] outline-none focus:ring-1 ring-black transition" />
          <input required type="email" placeholder="Email Address" className="w-full bg-[#f6f6f6] p-6 rounded-[2rem] outline-none focus:ring-1 ring-black transition" />
          <textarea required placeholder="How can we help?" className="w-full bg-[#f6f6f6] p-6 rounded-[2rem] outline-none h-48 focus:ring-1 ring-black transition" />
          <button type="submit" className="w-full bg-black text-white py-6 rounded-full font-bold uppercase tracking-widest hover:scale-[1.02] transition shadow-xl">Send Message</button>
        </form>
      </div>
    </div>
  );
};

// --- Checkout Component ---
const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);

  const handleOrder = (e) => {
    e.preventDefault();
    alert("Order Successful!");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="px-8 md:px-16 py-20 max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
      <div className="flex-[1.5]">
        <h2 className="text-4xl font-black italic uppercase mb-10 tracking-tighter">Checkout.</h2>
        <form onSubmit={handleOrder} className="space-y-6">
          <div className="grid grid-cols-2 gap-6"><input required placeholder="First Name" className="bg-gray-50 p-5 rounded-2xl outline-none" /><input required placeholder="Last Name" className="bg-gray-50 p-5 rounded-2xl outline-none" /></div>
          <input required placeholder="Email" className="w-full bg-gray-50 p-5 rounded-2xl outline-none" />
          <input required placeholder="Shipping Address" className="w-full bg-gray-50 p-5 rounded-2xl outline-none" />
          <button type="submit" className="w-full bg-black text-white py-6 rounded-full font-bold uppercase tracking-widest shadow-xl">Confirm Order — ${cartTotal.toFixed(2)}</button>
        </form>
      </div>
      <div className="flex-1 bg-gray-50 p-10 rounded-[3rem] h-fit">
        <h3 className="font-black uppercase italic mb-8 border-b pb-4">Order Summary</h3>
        {cart.map((item, i) => (<div key={i} className="flex justify-between text-sm mb-4"><span>{item.name} ({item.size}) x{item.quantity}</span><span className="font-bold">{item.price}</span></div>))}
        <div className="border-t pt-6 text-2xl font-black uppercase italic flex justify-between"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
      </div>
    </div>
  );
};

// --- App Root ---
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const products = [
    { name: "Rest Day Polo Shirt", category: "Tops", price: "$56", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800" },
    { name: "Rest Day shoes", category: "Bottoms", price: "$120", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800" },
    { name: "Sport T-Shirt", category: "Tops", price: "$40", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" },
    { name: "Sport shoes", category: "Bottoms", price: "$100", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800" },
    { name: "Daily Socks", category: "Accessories", price: "$15", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTWmHbPnqCEvzkR3c98zhneQoBOIWCd578CBwuoONp3hRuJFYK4lzrYJ-zlCDDMhzgNRUu0cyT4LSMwdehIDA45d6GIjrstAAFWTy12DXtENW3fGYhCe0Cl" },
    { name: "Men Fitness Tracksuit Jacket", category: "Tops", price: "$11.12", img: "https://contents.mediadecathlon.com/p2597050/af89f09d0124992bbc2d775e0560a46b/p2597050.jpg?format=auto&quality=70&f=425x0"},
    { name: "Performance Windbreaker", category: "Tops", price: "$85", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800" },
    { name: "Elite Training Shorts", category: "Bottoms", price: "$45", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800" },
    { name: "Compression Baselayer", category: "Tops", price: "$35", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" },
    { name: "Gym Duffel Bag", category: "Accessories", price: "$65", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800" },
    { name: "Aero-Ready Mesh Tank", category: "Tops", price: "$28", img: "https://gambol.in/cdn/shop/files/2_69324494-a3e3-4de4-89ce-e2cd426791c1_1800x1800.png?v=1704088357" },
    { name: "Seamless Leggings", category: "Bottoms", price: "$50", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800" }
  ];

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.name === product.name && item.size === product.size);
      if (existing) return prev.map(item => (item.name === product.name && item.size === product.size) ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (name, size) => setCart(prev => prev.filter(item => !(item.name === name && item.size === size)));

  return (
    <Router>
      <Layout 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
        isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}
        cart={cart} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart}
      >
        <Routes>
          <Route path="/" element={<ProductGrid searchQuery={searchQuery} products={products} />} />
          <Route path="/store" element={<ProductGrid searchQuery={searchQuery} products={products} />} />
          <Route path="/product/:name" element={<ProductDetail products={products} addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}
