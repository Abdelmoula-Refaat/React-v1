// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const handleLogout = () => {
    
//     window.location.href = '/';
//   };

//   const isLoggedIn = !!localStorage.getItem('user');
//   const isAdmin = JSON.parse(localStorage.getItem('user'))?.role === 'admin';

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
//       <div className="container">
//         <Link className="navbar-brand" to="/">MyShop</Link>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">Products</Link>
//             </li>
//             {isLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/cart">Cart</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/wishlist">Wishlist</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/account">Account</Link>
//                 </li>
//                  {isAdmin && ( }
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/admin">Admin Panel</Link>
//                   </li>
//                  )} 
//                 <li className="nav-item">
//                   <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             )}
//             {!isLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">Register</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser'); // إزالة معلومات المستخدم من الذاكرة المحلية عند تسجيل الخروج
//     window.location.href = '/';
//   };

//   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//   const isLoggedIn = !!loggedInUser;
//   const isAdmin = loggedInUser?.role === 'admin';

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
//       <div className="container">
//         <Link className="navbar-brand" to="/">MyShop</Link>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">Products</Link>
//             </li>
//             {isLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/cart">Cart</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/wishlist">Wishlist</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/account">Account</Link>
//                 </li>
//                 {isAdmin && (
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/admin">Admin Panel</Link>
//                   </li>
//                 )}
//                 <li className="nav-item">
//                   <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             )}
//             {!isLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">Register</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/';
  };

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isLoggedIn = !!loggedInUser;
  const isAdmin = loggedInUser?.role === 'admin';

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">MyShop</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">{t('Home')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">{t('Products')}</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">{t('Cart')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">{t('Wishlist')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/account">{t('Account')}</Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">{t('Admin Panel')}</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>{t('Logout')}</button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">{t('Login')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">{t('Register')}</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <button onClick={() => changeLanguage('en')} className="btn btn-link">English</button>
            </li>
            <li className="nav-item">
              <button onClick={() => changeLanguage('ar')} className="btn btn-link">العربية</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
