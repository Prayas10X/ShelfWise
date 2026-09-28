import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ProductList from "./ProductList";
import Brand from "./Brand";

const Dashboard = () => {
  const { products, setProducts, currentUser, setCurrentUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const clearForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setError("");
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (name.trim() === "") {
      setError("Product name is required.");
      return;
    }
    if (price === "" || Number(price) <= 0) {
      setError("Price must be a number greater than 0.");
      return;
    }
    if (category.trim() === "") {
      setError("Category is required.");
      return;
    }

    if (editingId === null) {
      // ADD
      const newProduct = {
        id: Date.now(),
        name: name,
        price: Number(price),
        category: category,
      };
      setProducts([...products, newProduct]);
    } else {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? { ...p, name: name, price: Number(price), category: category }
            : p
        )
      );
    }

    clearForm();
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setEditingId(product.id);
    setError("");
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    if (id === editingId) {
      clearForm();
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header className="topbar">
        <Brand size={36} />
        <button className="danger" onClick={() => setCurrentUser(null)}>
          Logout
        </button>
      </header>

      <div className="page-head">
        <h1>Dashboard</h1>
        <p>
          Welcome, <strong>{currentUser.name}</strong> | Total products:{" "}
          <strong>{products.length}</strong>
        </p>
      </div>

      <div className="card">
        <h2>{editingId === null ? "Add Product" : "Edit Product"}</h2>

        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit">
            {editingId === null ? "Add Product" : "Update Product"}
          </button>
          {editingId !== null && (
            <button type="button" className="secondary" onClick={clearForm}>
              Cancel
            </button>
          )}
        </form>

        {error && <p className="error">{error}</p>}
      </div>

      <div className="card">
        <h2>Products</h2>
        <input
          className="search"
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
