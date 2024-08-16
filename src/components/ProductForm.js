import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, fetchProducts, setSelectedProduct }) => {
  const [title, setTitle] = useState(product.title || '');
  const [price, setPrice] = useState(product.price || '');
  const [description, setDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.category || '');
  const [image, setImage] = useState(product.image || '');

  useEffect(() => {
    setTitle(product.title || '');
    setPrice(product.price || '');
    setDescription(product.description || '');
    setCategory(product.category || '');
    setImage(product.image || '');
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price,
      description,
      category,
      image,
    };

    try {
      if (product.id) {
        await axios.put(`https://fakestoreapi.com/products/${product.id}`, updatedProduct);
      } else {
        await axios.post('https://fakestoreapi.com/products', updatedProduct);
      }

      fetchProducts();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">Save</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={() => setSelectedProduct(null)}>Cancel</button>
    </form>
  );
};

export default ProductForm;
