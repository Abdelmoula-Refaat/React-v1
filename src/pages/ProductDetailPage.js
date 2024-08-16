// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import NavbarComponent from '../components/Navbar';
// import Footer from '../components/Footer';
// import axios from 'axios';
// import { useCart } from '../Context/CartProvider'; // تأكد من صحة المسار
// import { useDispatch } from 'react-redux';
// import { addToWishlist } from '../Redux/wishlistSlice'; // تأكد من صحة المسار
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState();
//   const { addToCart } = useCart();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product details', error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     const userLoggedIn = localStorage.getItem('loggedInUser'); // افتراضياً, المستخدم يتم تخزينه في localStorage عند تسجيل الدخول

//     if (userLoggedIn) {
//       addToCart(product); // أضف المنتج إلى السلة
//       toast.success(`${product.title} added to cart successfully!`);
//     } else {
//       navigate('/register'); 
//     }
//   };

//   const handleAddToWishlist = () => {
//     dispatch(addToWishlist(product));
//     toast.success(`${product.title} added to wishlist!`);
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <>
//       <NavbarComponent />
//       <div className="container my-4">
//         <h2>{product.title}</h2>
//         <div className="row">
//           <div className="col-md-6">
//             <img src={product.image} className="img-fluid" alt={product.title} />
//           </div>
//           <div className="col-md-6">
//             <h3>${product.price}</h3>
//             <p>{product.description}</p>
//             <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
//             <button onClick={handleAddToWishlist} className="btn btn-secondary mt-2">Add to Wishlist</button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default ProductDetailPage;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useCart } from '../Context/CartProvider'; // تأكد من صحة المسار
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../Redux/wishlistSlice'; // تأكد من صحة المسار
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist); // الحصول على القائمة الحالية من الwishlist

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const userLoggedIn = localStorage.getItem('loggedInUser');
    if (userLoggedIn) {
      addToCart(product);
      toast.success(`${product.title} added to cart successfully!`);
    } else {
      navigate('/register');
    }
  };

  const handleAddToWishlist = () => {
    const userLoggedIn = localStorage.getItem('loggedInUser');

    if (userLoggedIn) {
      if (wishlist && wishlist.length > 0) {
        const isProductInWishlist = wishlist.some((item) => item.id === product.id);

        if (isProductInWishlist) {
          toast.info(`${product.title} is already in your wishlist!`);
        } else {
          dispatch(addToWishlist(product));
          toast.success(`${product.title} added to wishlist!`);
        }
      } else {
        // إذا كانت wishlist فارغة
        dispatch(addToWishlist(product));
        toast.success(`${product.title} added to wishlist!`);
      }
    } else {
      navigate('/register');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <NavbarComponent />
      <div className="container my-4">
        <h2>{product.title}</h2>
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} className="img-fluid" alt={product.title} />
          </div>
          <div className="col-md-6">
            <h3>${product.price}</h3>
            <p>{product.description}</p>
            <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
            <button onClick={handleAddToWishlist} className="btn btn-secondary ml-2">Add to Wishlist</button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductDetailPage;
