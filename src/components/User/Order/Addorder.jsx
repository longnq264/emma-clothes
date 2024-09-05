// import { useState } from 'react';
// import { addOrder } from '../../../api/order';  // Import the addOrder function

// const AddOrders = () => {
//   const [orderData, setOrderData] = useState({
//     user_id: '',
//     user_name: '',
//     total_amount: 0,
//     payment: '',
//     address_detail: '',
//     ward: '',
//     district: '',
//     city: '',
//     items: [
//       {
//         product_id: '',
//         quantity: 1,
//         price: '',
//         total_price: 0,
//         product: {
//           name: '',
//           description: '',
//           image: '',
//         },
//       },
//     ],
//   });

//   // Handle input changes for both the order and its items
//   const handleInputChange = (e, index = null, itemField = null) => {
//     const { name, value } = e.target;

//     if (index !== null && itemField !== null) {
//       const updatedItems = [...orderData.items];
//       updatedItems[index][itemField] = value;

//       if (itemField === 'price' || itemField === 'quantity') {
//         updatedItems[index].total_price =
//           updatedItems[index].price * updatedItems[index].quantity;
//       }

//       setOrderData({ ...orderData, items: updatedItems });
//     } else {
//       setOrderData({ ...orderData, [name]: value });
//     }
//   };

//   const addNewProduct = () => {
//     setOrderData({
//       ...orderData,
//       items: [
//         ...orderData.items,
//         {
//           product_id: '',
//           quantity: 1,
//           price: '',
//           total_price: 0,
//           product: {
//             name: '',
//             description: '',
//             image: '',
//           },
//         },
//       ],
//     });
//   };

//   const deleteProduct = (index) => {
//     const updatedItems = orderData.items.filter((item, i) => i !== index);
//     setOrderData({ ...orderData, items: updatedItems });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Calculate the total amount
//     const totalAmount = orderData.items.reduce(
//       (sum, item) => sum + item.total_price,
//       0
//     );

//     try {
//       // Prepare the order data to send
//       const dataToSend = { ...orderData, total_amount: totalAmount };

//       // Call the addOrder function to create the order
//       const createdOrder = await addOrder(dataToSend);

//       console.log('Order created successfully:', createdOrder);
//     } catch (error) {
//       console.error('Error creating order:', error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Thêm Đơn Hàng Mới</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="user_name">
//             Tên người dùng
//           </label>
//           <input
//             type="text"
//             name="user_name"
//             value={orderData.user_name}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             placeholder="Nhập tên người dùng"
//           />
//         </div>
//         {/* Add other order details fields similarly */}
//         <div className="mb-4">
//           <h3 className="text-xl font-bold mb-2">Sản Phẩm</h3>
//           {orderData.items.map((item, index) => (
//             <div key={index} className="mb-4 border-b pb-4">
//               <div className="flex justify-between">
//                 <div className="w-full">
//                   <label className="block text-gray-700 font-bold mb-2" htmlFor="product_id">
//                     Mã sản phẩm
//                   </label>
//                   <input
//                     type="text"
//                     name="product_id"
//                     value={item.product_id}
//                     onChange={(e) => handleInputChange(e, index, 'product_id')}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     placeholder="Nhập mã sản phẩm"
//                   />
//                 </div>
//                 <div className="w-1/4 ml-4">
//                   <label className="block text-gray-700 font-bold mb-2" htmlFor="quantity">
//                     Số lượng
//                   </label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={item.quantity}
//                     onChange={(e) => handleInputChange(e, index, 'quantity')}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     placeholder="Nhập số lượng"
//                     min="1"
//                   />
//                 </div>
//                 <div className="w-1/4 ml-4">
//                   <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
//                     Giá
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={item.price}
//                     onChange={(e) => handleInputChange(e, index, 'price')}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     placeholder="Nhập giá"
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => deleteProduct(index)}
//                   className="ml-4 text-red-500 hover:text-red-700"
//                 >
//                   Xóa
//                 </button>
//               </div>
//               <div className="mt-2 text-gray-700">
//                 <p>Tổng giá: {item.total_price.toLocaleString()} VND</p>
//               </div>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addNewProduct}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Thêm sản phẩm mới
//           </button>
//         </div>
//         <div className="flex justify-end mt-4">
//         <button
//         type="button"
//         className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
//       >
//             Tạo Đơn Hàng
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddOrders;
