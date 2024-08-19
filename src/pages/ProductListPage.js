import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';

const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // عدد المنتجات في كل صفحة
  const { t } = useTranslation();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // حساب الفلاتر
  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      categoryFilter === '' || product.category === categoryFilter
    )
    .filter(product => {
      if (priceFilter === 'low') return product.price < 50;
      if (priceFilter === 'high') return product.price >= 50;
      return true;
    });
  if (!products) return <div>Loading...</div>;

  // حساب المنتجات المعروضة في الصفحة الحالية بعد تطبيق الفلاتر
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavbarComponent />
      <div className="container mt-5">
        <h2>{t('Product List')}</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-control mb-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <select
            className="form-control"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="low">Under $50</option>
            <option value="high">$50 and above</option>
          </select>
        </div>
        <div className="row">
          {currentProducts.map(product => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
              <div className="card bg-secondary">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <Link to={`/products/${product.id}`} className="btn btn-primary">{t('View Details')}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
            itemsPerPage={productsPerPage}
            totalItems={filteredProducts.length} // استخدام filteredProducts هنا
            paginate={paginate}
            currentPage={currentPage}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProductListComponent;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts } from '../Redux/productSlice';
// import NavbarComponent from '../components/Navbar';
// import Footer from '../components/Footer';
// import Pagination from '../components/Pagination';
// import { useTranslation } from 'react-i18next';


// const ProductListComponent = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const productsStatus = useSelector((state) => state.products.status);
//   const { t } = useTranslation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9;

//   useEffect(() => {
//     if (productsStatus === 'idle') {
//       dispatch(fetchProducts());
//     }
//   }, [productsStatus, dispatch]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <NavbarComponent />
//       <div className="container mt-5">
//         <h2>{t('Product List')}</h2>
//         <div className="row">
//           {currentProducts.map((product) => (
//             <div key={product.id} className="col-md-4 mb-3">
//               <div className="card h-100">
//                 <img src={product.image} className="card-img-top" alt={product.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.title}</h5>
//                   <p className="card-text">${product.price}</p>
//                   <a href={`/products/${product.id}`} className="btn btn-primary">
//                     {t('View Details')}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <Pagination
//           productsPerPage={productsPerPage}
//           totalProducts={products.length}
//           paginate={paginate}
//           currentPage={currentPage}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductListComponent;
