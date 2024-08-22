// // PostsList.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getPosts, deletePost } from './fakeApi';

// const PostsList = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getPosts();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deletePost(id);
//       setPosts(posts.filter(post => post.id !== id));
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Danh Sách Bài Viết</h1>
//       <Link to="/add-post" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mb-4 inline-block">
//         Thêm Bài Viết
//       </Link>
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border-b">Tiêu Đề</th>
//             <th className="px-4 py-2 border-b">Tác Giả</th>
//             <th className="px-4 py-2 border-b">Hành Động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map(post => (
//             <tr key={post.id}>
//               <td className="px-4 py-2 border-b">{post.title}</td>
//               <td className="px-4 py-2 border-b">{post.author}</td>
//               <td className="px-4 py-2 border-b">
//                 <Link to={`/edit-post/${post.id}`} className="text-blue-500 hover:underline mr-4">Sửa</Link>
//                 <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">Xóa</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PostsList;
