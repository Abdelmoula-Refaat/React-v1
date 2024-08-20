import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import "./ProductListPage.module.css";
import { useTranslation } from 'react-i18next';
import styles from "./ProductListPage.module.css";


// ! ودا كذالك
  import productsData from '../products.json';  //Import the JSON file

const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products per page
  const { t } = useTranslation();

  useEffect(() => {



    // ! دي يا عبد المولي بتستدعي البروداكتس من ملف الجسون  رنها اول مترن البروجيكت بعد كدا هيشها 
const loadProductsToLocalStorage = () => {
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(productsData));
    console.log(localStorage.getItem('products'));   
  }
};


    const loadProducts = async () => {
      const storedProducts = localStorage.getItem('products');
      
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {

        const response = await fetch('../products.json');
        const data = await response.json();
        
        localStorage.setItem('products', JSON.stringify(data));
        setProducts(data);
      }
    };

    loadProducts();
  }, []);

  // Filtering logic
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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavbarComponent />
      <div className="container mt-1">
        <div className="py-4">
          <input
            type="text"
            className="form-control mt-5"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <h2 className='my-3'>{t('Product List')}</h2>
          <div className='d-flex justify-content-center gap-4'>
            <select
              className="form-select d-inline-block w-auto"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="" style={{ display: 'none' }}>Select Category...</option>
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>

            <select
              className="form-select d-inline-block w-auto"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all" style={{ display: 'none' }}>Select Price...</option>
              <option value="all">All Prices</option>
              <option value="low">Under $50</option>
              <option value="high">$50 and above</option>
            </select>
          </div>
        </div>
        <div className="row">
          {currentProducts.map(product => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
              <div className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img src={product.image} alt={product.title} className={styles.productImage} />
                </div>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>{product.title}</h5>
                  <p className={styles.cardSubtitle}>{product.category}</p>
                  <p className={styles.cardPrice}>${product.price}</p>
                  <div className={styles.hoverContent}>
                    <p className={styles.cardSubtitle}>{product.description}</p>
                    <div className={styles.iconContainer}>
                      <Link to={`/products/${product.id}`} className={styles.button}>View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          itemsPerPage={productsPerPage}
          totalItems={filteredProducts.length}
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
