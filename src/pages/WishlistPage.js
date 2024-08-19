// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromWishlist } from '../Redux/wishlistSlice';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const WishlistComponent = () => {
//   const wishlist = useSelector(state => state.wishlist);
//   const dispatch = useDispatch();

//   const handleRemove = (id) => {
//     const confirmToast = toast.info(
//       ({ closeToast }) => (
//         <div>
//           <p>Are you sure you want to remove this item?</p>
//           <div>
//             <button
//               className="btn btn-danger"
//               onClick={() => {
//                 dispatch(removeFromWishlist({ id }));
//                 toast.success('Item removed from wishlist!', {
//                   position: "top-center",
//                   autoClose: 3000,
//                 });
//                 closeToast(); // إغلاق التوست التأكيدي
//               }}
//               style={{ marginRight: '10px' }}
//             >
//               Yes
//             </button>
//             <button className="btn btn-secondary" onClick={closeToast}>No</button>
//           </div>
//         </div>
//       ),
//       {
//         position: "top-center",
//         autoClose: false,
//         closeButton: false,
//         style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
//       }
//     );
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Your Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {wishlist.map(item => (
//               <tr key={item.id}>
//                 <td>{item.title}</td>
//                 <td>${item.price.toFixed(2)}</td>
//                 <td>
//                   <button 
//                     className="btn btn-danger" 
//                     onClick={() => handleRemove(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default WishlistComponent;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../Redux/wishlistSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistComponent = () => {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to remove this item?</p>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(removeFromWishlist({ id }));
                toast.success('Item removed from wishlist!', {
                  position: "top-center",
                  autoClose: 3000,
                });
                closeToast(); // إغلاق التوست التأكيدي
              }}
              style={{ marginRight: '10px' }}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={closeToast}>No</button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
      }
    );
  };

  return (
    <div className="container mt-5">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default WishlistComponent;
