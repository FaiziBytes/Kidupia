import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import BreadcrumbBanner from "../components/breadcrumb.jsx";
import { ChevronUp, ChevronDown } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { BsGrid3X3Gap } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext.jsx";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [priceSectionOpen, setPriceSectionOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const navigate = useNavigate();
  const { addToCart, loadingProducts } = useContext(CartContext);
  const { searchQuery } = useSearch();

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories/get");
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products/");
      setProducts(res.data.products);
    } catch (error) {
      console.error("Product fetch error:", error);
    }
  };

  useEffect(() => {
    getCategories();
    fetchProducts();
  }, []);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const filterByCategory = (list) => {
    if (selectedCategories.length === 0) return list;
    return list.filter((item) => selectedCategories.includes(item.category));
  };

  const filterByPrice = (list) => {
    if (selectedPrice === "all") return list;
    const [min, max] = selectedPrice.includes("+")
      ? [60, Infinity]
      : selectedPrice.split("-").map(Number);
    return list.filter((p) => p.price >= min && p.price <= (max || Infinity));
  };

  const filterBySearch = (list) => {
    if (!searchQuery.trim()) return list;
    return list.filter((p) =>
      (p.title + " " + p.description)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  const filteredProducts = filterBySearch(
    filterByPrice(filterByCategory(products))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const priceRanges = [
    { id: "all", label: "All" },
    { id: "0-20", label: "$0–$20" },
    { id: "20-40", label: "$20–$40" },
    { id: "40-60", label: "$40–$60" },
    { id: "60+", label: "$60+" },
  ];

  return (
    <div>
      <BreadcrumbBanner />
      <div className="py-12 px-3 flex">
        {/* LEFT FILTERS */}
        <div className="w-[22%]">
          {/* CATEGORY FILTER */}
          <div className="w-full bg-white rounded-[10px] shadow-sm border">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex justify-between p-4 text-lg font-semibold"
            >
              Shop By Categories
              {open ? <ChevronUp /> : <ChevronDown />}
            </button>
            {open && (
              <div className="p-4 space-y-4">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => handleCategoryToggle(cat._id)}
                      className="w-5 h-5"
                    />
                    <span>
                      {cat.name} ({products.filter(p => p.category === cat._id).length})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* PRICE FILTER */}
          <div className="bg-white rounded-xl shadow-sm border my-5">
            <button
              onClick={() => setPriceSectionOpen(!priceSectionOpen)}
              className="w-full flex justify-between p-4 text-lg font-semibold"
            >
              Price Filter
              {priceSectionOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {priceSectionOpen && (
              <div className="p-4 space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => {
                      setSelectedPrice(range.id);
                      setCurrentPage(1);
                    }}
                    className={`block text-left w-full ${
                      selectedPrice === range.id ? "text-pink-500 font-bold" : ""
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="w-[78%] px-5">
          <div className="flex justify-between items-center">
            <h1>
              Showing {filteredProducts.length === 0 ? 0 : indexOfFirstItem + 1}–
              {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length}
            </h1>
            {/* View toggle + sort omitted for brevity */}
          </div>

          <div className={`grid ${gridView ? "grid-cols-4" : "grid-cols-1"} gap-7 py-5`}>
            {currentProducts.map((product) => (
              <div key={product._id} className="border p-2 rounded">
                <img src={product.images[0]} alt={product.title} className="rounded" />
                <div className="px-2 flex flex-col gap-1">
                  <h2 className="line-clamp-2"
                  onClick={()=>{
                    navigate(`/product/${product._id}`)
                  }}
                  >{product.title}</h2>
                  <h1 className="font-bold text-[20px] text-[#E94A85]">${product.price}</h1>
                  <p>⭐⭐⭐⭐⭐</p>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={loadingProducts[product._id]}
                    className="bg-gray-200 py-2 w-full mt-1 hover:bg-pink-500 hover:text-white"
                  >
                    {loadingProducts[product._id] ? "ADDING..." : "ADD TO CART"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center py-10 text-gray-500">No products found.</p>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 0 && (
        <div className="flex justify-center my-10 gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 border rounded ${currentPage === i + 1 ? "bg-pink-500 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
