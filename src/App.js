import React from "react";

export default function FitnessStore() {
  const products = [
    { name: "Rest Day Polo Shirt", price: "$56", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500" },
    { name: "Rest Day Jogger Pants", price: "$120", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500" },
    { name: "Sport T-Shirt", price: "$40", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { name: "Sport Jogger", price: "$100", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      {/* Black Promo Bar */}
      <div className="bg-black text-white text-[10px] py-2 text-center uppercase tracking-[0.2em] font-medium">
        New season coming! Discount 10% for all products
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-6 border-b border-gray-100">
        <div className="text-2xl font-bold tracking-tighter">Culd.</div>
        <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#" className="text-black">Home</a>
          <a href="#" className="hover:text-black transition">Store</a>
          <a href="#" className="hover:text-black transition">Sale</a>
          <a href="#" className="hover:text-black transition">Collections</a>
          <a href="#" className="hover:text-black transition">Coming Soon</a>
        </div>
        <div className="flex items-center gap-6">
           <button className="text-[12px] font-bold border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition">
             Login / Register
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-20 py-8">
        <div className="relative h-[550px] rounded-[2rem] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1500" 
            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
            alt="Hero Workout"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-12 md:px-20">
            <div className="max-w-xl text-white">
              <h2 className="text-5xl font-extrabold leading-[1.1] mb-6">
                Active Style with Our <br/> Latest Sportswear.
              </h2>
              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                Discover the latest collection that combines trendy design with optimal performance for every sporting activity.
              </p>
              <button className="bg-white text-black font-black uppercase text-sm tracking-widest px-10 py-4 rounded-full hover:bg-gray-200 transition-all shadow-xl">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="px-6 md:px-20 py-16">
        <div className="flex justify-between items-end mb-12">
          <h3 className="text-xs font-black tracking-[0.4em] uppercase border-b-2 border-black pb-2">New Arrival.</h3>
          <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">See All Products</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 mb-6 shadow-sm">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                  ❤️
                </div>
              </div>
              <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{p.name}</h4>
              <p className="font-bold text-lg">{p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}