import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Skeleton } from "antd";
import "tailwindcss/tailwind.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton active />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Không tìm thấy bài đăng</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto">
          <Breadcrumb separator=">" className="text-gray-500">
            <Breadcrumb.Item>
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-gray-800 transition duration-300"
              >
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to="/blog"
                className="text-sm text-gray-500 hover:text-gray-800 transition duration-300"
              >
                Blog
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg  overflow-hidden">
          <div className="relative">
            <img
              src={`https://picsum.photos/800/400?random=${post.id}`}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-4xl font-bold text-white">{post.title}</h1>
            </div>
          </div>
          <div className="p-8">
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              <p>{post.body}</p>
              <br />
              <p>
                Không còn đơn thuần là nguồn cảm hứng cho thiết kế, nghệ thuật
                đã trở thành lĩnh vực đầu tư có chiến lược của những tập đoàn
                dẫn đầu trong ngành thời trang xa xỉ. Tuy là hai lĩnh vực tách
                biệt nhưng giữa thời trang và nghệ thuật vẫn luôn tồn tại sự
                liên kết mật thiết. Sự giao thoa đó ngày một rõ nét khi nhiều
                thương hiệu, tập đoàn thể hiện sự quan tâm và đầu tư nghiêm túc
                vào nghệ thuật. Điều này không khó hiểu bởi trong thời đại ngày
                nay, mục tiêu của ngành hàng xa xỉ không chỉ dừng lại ở việc tạo
                ra sản phẩm chất lượng đỉnh cao mà hơn thế là tập trung vào lối
                sống của giới thượng lưu, tạo những kết nối ý nghĩa, và ở đó,
                nghệ thuật là một yếu tố quan trọng. Xu hướng mở rộng sang lĩnh
                vực nghệ thuật bắt đầu từ sở thích cá nhân của giới tinh hoa,
                những nhà sáng lập của các thương hiệu và tập đoàn lớn, trong đó
                có thể kể đến Miuccia Prada, François Pinault, Bernard Arnault…
              </p>
              <br />

              <p>
                Ngoài cặp mắt sắc bén trong thiết kế, Miuccia Prada còn là người
                có tầm nhìn đầy tri thức và đam mê nghệ thuật. Điều đó góp phần
                tạo nên vẻ đẹp tinh vi đa tầng trong hai thương hiệu của bà –
                Prada và Miu Miu. Với tầm nhìn tiên phong, bà và chồng là doanh
                nhân Patrizio Bertelli đã sáng lập viện Fondazione Prada vào năm
                1993. Đây là dự án kiến trúc đầu tiên của giới thời trang được
                thiết kế bởi một văn phòng kiến trúc nổi tiếng, cụ thể là OMA do
                KTS Rem Koolhaas chủ trì. Kể từ đó, khu phức hợp này đã trở
                thành không gian văn hóa nghệ thuật đương đại, đồng thời là nơi
                diễn ra các show diễn của thương hiệu. Chưa dừng lại ở đó, tập
                đoàn còn giới thiệu Prada Frame, một hội nghị chuyên đề đa ngành
                đào sâu vào mối quan hệ phức tạp giữa môi trường tự nhiên và
                thiết kế bắt đầu từ năm 2022, diễn ra trong khuôn khổ Milan
                Fashion Week thường niên.
              </p>
              <br />
              <p>
                Kể từ sau Fondazione Prada, các doanh nhân thời trang cũng bắt
                đầu thể hiện sự quan tâm nghệ thuật của mình một cách rộng rãi
                hơn thay vì lưu trữ chúng cho riêng mình. Năm 1999, tỉ phú
                François Pinault, nhà sáng lập tập đoàn Kering thành lập Pinault
                Collection nhằm quản lý các BST nghệ thuật tư nhân của gia tộc
                Pinault, địa điểm triển lãm, chương trình liên kết từ thiện và
                văn hóa… Tính đến nay, ông đã sở hữu ba công trình cổ tại Venice
                và được cấp quyền sử dụng 50 năm cho một tòa nhà di sản tại
                Paris là Bourse de Commerce để phục vụ mục đích nghệ thuật. Cả
                bốn công trình Palazzo Grassi, Punta della Dogana, Teatrino và
                gần nhất là Bourse de Commerce đều được cải tạo bởi KTS đoạt
                giải Pritzker người Nhật Tadao Ando.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/blog"
                className="text-blue-600 hover:text-blue-800 transition duration-300 text-lg"
              >
                &larr; Quay lại blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
