import { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    brand: "",
    tags: "",
    isActive: true,
  });

  const [images, setImages] = useState([]);
  const [attributes, setAttributes] = useState([{ name: "", value: "" }]);
  const [variants, setVariants] = useState([{ attributes: "", price: "", stock: "" }]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImages([...e.target.files]);
  const addAttribute = () => setAttributes([...attributes, { name: "", value: "" }]);
  const addVariant = () => setVariants([...variants, { attributes: "", price: "", stock: "" }]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/categories/get", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) setCategories(res.data.categories);
      else setError("Failed to fetch categories");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error while fetching categories");
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      images.forEach((img) => data.append("images", img));

      Object.entries(form).forEach(([key, value]) => data.append(key, value));

      // Parse arrays
      data.append("tags", JSON.stringify(form.tags.split(",").map(t => t.trim())));
      data.append("attributes", JSON.stringify(attributes));
      data.append("variants", JSON.stringify(variants));

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/products/create/product",
        data,
        {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("Product created successfully!");
        // Reset form
        setForm({ 
          title: "", 
          description: "", 
          price: "", 
          discountPrice: "", 
          category: "", 
          brand: "", 
          tags: "", 
          isActive: true 
        });
        setImages([]);
        setAttributes([{ name: "", value: "" }]);
        setVariants([{ attributes: "", price: "", stock: "" }]);
        
        // Reset file input manually
        e.target.reset();
      } else {
        alert(res.data.message || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server error while creating product");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="title" 
            placeholder="Product Title" 
            value={form.title} 
            onChange={handleChange} 
            className="p-3 border rounded-lg w-full" 
          />
          <input 
            type="number" 
            name="price" 
            placeholder="Price" 
            value={form.price} 
            onChange={handleChange} 
            className="p-3 border rounded-lg w-full" 
          />
          <input 
            type="number" 
            name="discountPrice" 
            placeholder="Discount Price" 
            value={form.discountPrice} 
            onChange={handleChange} 
            className="p-3 border rounded-lg w-full" 
          />
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            className="p-3 border rounded-lg w-full"
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>

        <textarea 
          name="description" 
          placeholder="Product Description" 
          value={form.description} 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg" 
          rows="4"
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="brand" 
            placeholder="Brand" 
            value={form.brand} 
            onChange={handleChange} 
            className="p-3 border rounded-lg w-full" 
          />
          <input 
            type="text" 
            name="tags" 
            placeholder="Tags (comma separated)" 
            value={form.tags} 
            onChange={handleChange} 
            className="p-3 border rounded-lg w-full" 
          />
        </div>

        <div>
          <label className="font-semibold">Upload Images</label>
          <input 
            type="file" 
            multiple 
            onChange={handleImageChange} 
            className="w-full mt-2"
            key={images.length} 
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Attributes</h3>
          {attributes.map((attr, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
              <input 
                type="text" 
                placeholder="Attribute Name" 
                value={attr.name} 
                className="p-3 border rounded-lg"
                onChange={(e) => { 
                  const updated = [...attributes]; 
                  updated[idx].name = e.target.value; 
                  setAttributes(updated); 
                }} 
              />
              <input 
                type="text" 
                placeholder="Value" 
                value={attr.value} 
                className="p-3 border rounded-lg"
                onChange={(e) => { 
                  const updated = [...attributes]; 
                  updated[idx].value = e.target.value; 
                  setAttributes(updated); 
                }} 
              />
            </div>
          ))}
          <button type="button" onClick={addAttribute} className="px-4 py-2 bg-gray-800 text-white rounded-lg">+ Add Attribute</button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Variants</h3>
          {variants.map((v, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-4 mb-2">
              <input 
                type="text" 
                placeholder="Attributes (Size: M, Color: Red)" 
                value={v.attributes} 
                className="p-3 border rounded-lg"
                onChange={(e) => { 
                  const updated = [...variants]; 
                  updated[idx].attributes = e.target.value; 
                  setVariants(updated); 
                }} 
              />
              <input 
                type="number" 
                placeholder="Variant Price" 
                value={v.price} 
                className="p-3 border rounded-lg"
                onChange={(e) => { 
                  const updated = [...variants]; 
                  updated[idx].price = e.target.value; 
                  setVariants(updated); 
                }} 
              />
              <input 
                type="number" 
                placeholder="Stock" 
                value={v.stock} 
                className="p-3 border rounded-lg"
                onChange={(e) => { 
                  const updated = [...variants]; 
                  updated[idx].stock = e.target.value; 
                  setVariants(updated); 
                }} 
              />
            </div>
          ))}
          <button type="button" onClick={addVariant} className="px-4 py-2 bg-gray-800 text-white rounded-lg">+ Add Variant</button>
        </div>

        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            name="isActive" 
            checked={form.isActive} 
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
          />
          Active Product
        </label>

        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full">Create Product</button>
      </form>
    </div>
  );
};

export default AddProduct;