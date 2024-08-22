// // EditPost.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getPostById, updatePost } from './fakeApi';

// const EditPost = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [author, setAuthor] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const data = await getPostById(id);
//         setPost(data);
//         setTitle(data.title);
//         setBody(data.body);
//         setAuthor(data.author);
//         setImageUrl(data.image_url);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updatePost({ id, title, body, author, image_url: imageUrl });
//       navigate('/posts');
//     } catch (error) {
//       console.error('Error updating post:', error);
//     }
//   };

//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Sửa Bài Viết</h1>
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
//           Cập Nhật Bài Viết
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPost;
