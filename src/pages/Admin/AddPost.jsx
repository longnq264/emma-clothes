// // AddPost.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addPost } from './fakeApi';

// const AddPost = () => {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [author, setAuthor] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addPost({ title, body, author, image_url: imageUrl });
//       navigate('/posts');
//     } catch (error) {
//       console.error('Error adding post:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Thêm Bài Viết Mới</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-gray-700">Tiêu Đề</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="body" className="block text-gray-700">Nội Dung</label>
//           <textarea
//             id="body"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             rows="4"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="author" className="block text-gray-700">Tác Giả</label>
//           <input
//             type="text"
//             id="author"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="image_url" className="block text-gray-700">Ảnh URL</label>
//           <input
//             type="text"
//             id="image_url"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
//         >
//           Thêm Bài Viết
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPost;
