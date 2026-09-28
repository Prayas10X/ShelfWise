const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>

            <div className="actions">
              <button onClick={() => onEdit(product)}>Edit</button>
              <button className="danger" onClick={() => onDelete(product.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
