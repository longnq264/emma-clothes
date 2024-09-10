import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductId } from "../../api/api-server";
import { Spin, Alert } from "antd";
import "antd/dist/reset.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async (id) => {
      try {
        const response = await getProductId(id);
        setData(response.data);
      } catch (error) {
        setError("Khong tim thay chi tiet san pham");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail(id);
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="No product found" type="warning" showIcon />
      </div>
    );

  // Tìm ảnh chính
  const mainImageUrl = data.productImages.find(
    (img) => img.is_thumbnail === 1
  )?.image_url;

  // Chọn một biến thể
  const selectedVariant = data.productVariants[0] || null;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">Chi tiết sản phẩm</h1>
      <br />
        <div className="flex flex-col md:flex-row">

          <div className="md:w-1/3 mb-6 md:mb-0">
            {mainImageUrl ? (
              <img
                src={mainImageUrl}
                alt={data.name}
                className="w-full h-auto rounded-md shadow-lg"
              />
            ) : (
              <div className="w-full h-60 bg-gray-300 rounded-md flex items-center justify-center">
                <p className="text-gray-600">Khong co anh nao co san</p>
              </div>
            )}
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
            <p className="text-lg mb-2">
              <strong>Giá:</strong> {data.price}₫
            </p>
            <p className="text-lg mb-2">
              <strong className="text-red-500">Giá cũ:</strong>{" "}
              {data.price_old}₫
            </p>
            <p className="text-lg mb-2">
              <strong>Mô Tả:</strong> {data.description}
            </p>
            <p className="text-lg mb-2">
              <strong>Số Lượng:</strong> {data.quantity}
            </p>
            <p className="text-lg mb-2">
              <strong>Lượt Xem:</strong> {data.view}
            </p>
            <p className="text-lg mb-2">
              <strong>Khuyến Mãi:</strong> {data.promotion}
            </p>
            <p className="text-lg mb-2">
              <strong>Trạng Thái:</strong> {data.status}
            </p>
            <p className="text-lg mb-2">
              <strong>Thời gian Tạo:</strong>{" "}
              {new Date(data.created_at).toLocaleDateString()}
            </p>
            <p className="text-lg mb-2">
              <strong>Thời gian cập nhật:</strong>{" "}
              {new Date(data.updated_at).toLocaleDateString()}
            </p>
            <p className="text-lg mb-4">
              <strong>Danh mục:</strong> {data.category.name}
            </p>

            <h2 className="text-2xl font-semibold mb-4">Biến thể</h2>
            {selectedVariant ? (
              <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="text-lg mb-2">
                  <strong>SKU:</strong> {selectedVariant.sku}
                </p>
                <p className="text-lg mb-2">
                  <strong>Stock:</strong> {selectedVariant.stock}
                </p>
                <p className="text-lg mb-2">
                  <strong>Price:</strong> {selectedVariant.price}₫
                </p>
                <div>
                  <br />
                  <strong>Thuộc tính:</strong>
                  <ul className="list-disc ml-5">
                    {selectedVariant.attributes.map((attr) => (
                      <li key={attr.id}>{attr.value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>Khong co bien the nao co san</p>
            )}

            <Link
              to="/admin/products"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-4"
            >
              Quay trở về danh sách sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
