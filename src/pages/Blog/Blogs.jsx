import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data.slice(0, 9));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4">
          <Breadcrumb separator=">" className="text-gray-500">
            <Breadcrumb.Item>
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-gray-800 transition duration-300"
              >
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tin tức & Sự kiện Thời Trang Emma
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/600/400?random=${post.id}`}
                    alt={post.title}
                    className="w-full h-72 object-cover transform hover:scale-110 transition duration-300"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-xl font-semibold text-white">
                      {post.title}
                    </h2>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 line-clamp-3">{post.body}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
