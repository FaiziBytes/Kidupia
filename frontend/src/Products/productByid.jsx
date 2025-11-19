import React, { useEffect, useState, useContext } from "react";
import BreadcrumbBanner from "../components/breadcrumb";
import { FaShieldAlt, FaCoins, FaTruck } from "react-icons/fa";
import ProductDescription from "./productDescription";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";
import BreadcrumbBanner2 from "../components/breadcrumb2";

const ProductById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [centerImage, setCenterImage] = useState('');

  const getProductById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${id}`);
      setProduct(res.data.product);
      console.log(res.data);
      const imgs = res.data.product.images;
      if (imgs && imgs.length > 0) {
        setCenterImage(imgs[0]); // FIRST image
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  // Add to cart
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setQuantity(1);
  };

  // Buy now
  const handleBuyNow = () => {
    if (!product) return;
    // Navigate to checkout with this product only
    navigate("/checkout", { state: { buyNowProduct: product, buyNowQuantity: quantity } });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <BreadcrumbBanner2
        category={product.category.name}
        title={product.title}
      />

      {/* MAIN PRODUCT SECTION */}
      <div className="flex flex-col lg:flex-row mt-10 w-full gap-6 px-3">

        {/* Thumbnails */}
        <div className="lg:w-[13%] flex lg:flex-col gap-3 overflow-x-auto">
          {product.images?.map((img, index) => (
            <img
              key={index}
              onClick={() => setCenterImage(img)}
              src={img}
              alt="Thumbnail"
              className="border rounded-md w-20 h-20 object-cover cursor-pointer hover:border-[#E94A85] transition"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="lg:w-[46%] w-full">
          <img
            src={centerImage}
            alt={product.title}
            className="rounded-md border w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-[41%] w-full">
          <p className="text-gray-600 text-lg">
            Brand: <span className="text-[#E94A85] font-medium">{product.brand || "MegaMart"}</span>
          </p>

          <p className="text-2xl md:text-3xl font-semibold mt-2">{product.title}</p>

          <div className="flex flex-wrap items-center gap-3 my-3">
            <p className="text-xl font-semibold">${product.price}</p>
            {product.discount && <p className="text-xl font-semibold">{product.discount}% Off</p>}
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <p className="mb-2">🔥 {product.sold || 0} products sold recently</p>

          <p className="mb-3 text-gray-700">{product.description}</p>

          <div className="px-3 py-1 bg-green-100 rounded-md w-fit mb-3">
            <p className="text-green-600 font-medium">{product.stock || 150} in stock</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 my-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border rounded-md hover:border-[#E94A85]"
            >
              −
            </button>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 h-10 border rounded-md text-center"
            />

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border rounded-md hover:border-[#E94A85]"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#E94A85] text-white py-3 rounded-md text-lg hover:bg-[#d43970] mt-2"
          >
            ADD TO CART
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full bg-black text-white py-3 rounded-md text-lg hover:bg-gray-800 mt-2"
          >
            BUY NOW
          </button>

        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-[#F3F4FC] mx-3 mt-10 rounded-md text-center">
        <div className="py-4 flex justify-center items-center gap-2 border-b md:border-b-0 md:border-r">
          <FaShieldAlt /> <p>101% Original</p>
        </div>
        <div className="py-4 flex justify-center items-center gap-2 border-b md:border-b-0 md:border-r">
          <FaCoins /> <p>Lowest Pricing</p>
        </div>
        <div className="py-4 flex justify-center items-center gap-2">
          <FaTruck /> <p>Free Shipping</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-4 py-10 border border-[#E5E5E5] mx-3">
        <ProductDescription />
      </div>
    </div>
  );
};

export default ProductById;
