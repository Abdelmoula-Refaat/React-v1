// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductForm = ({ product, fetchProducts, setSelectedProduct }) => {
//   const [title, setTitle] = useState(product.title || '');
//   const [price, setPrice] = useState(product.price || '');
//   const [description, setDescription] = useState(product.description || '');
//   const [category, setCategory] = useState(product.category || '');
//   const [image, setImage] = useState(product.image || '');

//   useEffect(() => {
//     setTitle(product.title || '');
//     setPrice(product.price || '');
//     setDescription(product.description || '');
//     setCategory(product.category || '');
//     setImage(product.image || '');
//   }, [product]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedProduct = {
//       title,
//       price,
//       description,
//       category,
//       image,
//     };

//     try {
//       if (product.id) {
//         await axios.put(`https://fakestoreapi.com/products/${product.id}`, updatedProduct);
//       } else {
//         await axios.post('https://fakestoreapi.com/products', updatedProduct);
//       }

//       fetchProducts();
//       setSelectedProduct(null);
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="title" className="form-label">Title</label>
//         <input
//           type="text"
//           className="form-control"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="price" className="form-label">Price</label>
//         <input
//           type="number"
//           className="form-control"
//           id="price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="description" className="form-label">Description</label>
//         <textarea
//           className="form-control"
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="category" className="form-label">Category</label>
//         <input
//           type="text"
//           className="form-control"
//           id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="image" className="form-label">Image URL</label>
//         <input
//           type="text"
//           className="form-control"
//           id="image"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" className="btn btn-success">Save</button>
//       <button type="button" className="btn btn-secondary ms-2" onClick={() => setSelectedProduct(null)}>Cancel</button>
//     </form>
//   );
// };

// export default ProductForm;
import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, saveProduct, setSelectedProduct }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        image: product.image || '',
        category: product.category || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct({ ...product, ...formData });
    setSelectedProduct(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          name="image"
          className="form-control"
          onChange={handleFileChange}
          required
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Product"
            style={{ marginTop: '10px', maxWidth: '100%' }}
          />
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-control"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {product?.id ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
