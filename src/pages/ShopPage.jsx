
import React, { useEffect, useState } from "react";
import Navbar from "../websiteComponents/navbar/Navbar";
import Footer from "../websiteComponents/footer/Footer";
import Product_Card from "../websiteComponents/ProductCard/Product_Card";
import "../websiteComponents/scrollbar.css";
import { getAllProducts } from "../api/product-service/productController";

const ShopPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllProducts();
        const activeProducts = data.filter(
            (item) => item.productStatus === true
        );
        setItems(activeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setFilterCategory((prev) =>
        prev.includes(categoryName)
            ? prev.filter((item) => item !== categoryName)
            : [...prev, categoryName]
    );
  };

  const filteredProducts = items.filter((product) => {
    if (filterCategory.length === 0) return true;
    return filterCategory.includes(product.productCatagory);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  const getCategoryCounts = () => {
    const counts = items.reduce((acc, product) => {
      acc[product.productCatagory] = (acc[product.productCatagory] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map((category) => ({
      name: category,
      count: counts[category],
    }));
  };

  const categories = getCategoryCounts();

  return (
      <div className="bg-[#e9e3e3]">

        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="pt-16"> {/* Added padding-top to account for fixed navbar */}
          <br />
          <div className="text-center mb-8 px-4">
            <h2 className="text-[#F4952C] font-pacifico text-2xl md:text-3xl">Best Sellings</h2>
            <h3 className="text-black font-quicksand text-xl md:text-2xl font-semibold mt-2">
              We Care About Our Customers <br /> Experience Too
            </h3>
          </div>

          {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="loader border-t-4 border-orange-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
                {/* Categories Sidebar */}
                <div className="bg-[#e9e3e3] rounded-lg shadow-lg p-4 md:p-5">
                  <p className="font-quicksand font-bold text-2xl md:text-[36px] mb-4">Category</p>
                  {categories.map((category, index) => (
                      <div className="flex gap-3 items-center py-2" key={index}>
                        <input
                            type="checkbox"
                            value={category.name}
                            checked={filterCategory.includes(category.name)}
                            onChange={handleCategoryChange}
                            className="w-4 h-4"
                        />
                        <label className="flex justify-between w-full text-sm md:text-base">
                          <span>{category.name}</span>
                          <span>({category.count})</span>
                        </label>
                      </div>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="md:col-span-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
                    <p className="font-quicksand font-bold text-2xl md:text-[36px]">
                      Featured Products
                    </p>
                    <select
                        className="border-[#F4952C] rounded-lg bg-[#F4952C] text-white px-4 py-2 hover:bg-[#F4952C] text-sm md:text-base"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                    >
                      <option value="">Sort By: Default</option>
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedProducts.map((item) => (
                        <Product_Card key={item.productId} item={item} />
                    ))}
                  </div>
                </div>
              </div>
          )}
          <Footer />
        </div>
      </div>
  );
};

export default ShopPage;
