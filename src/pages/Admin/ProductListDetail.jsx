import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductId } from "../../api/api-server";
import { Spin, Alert, Table, Tag } from "antd";
import "antd/dist/reset.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async (id) => {
      try {
        const response = await getProductId(id);
        setData(response.data);
        const initialImage =
          response.data.productImages.find((img) => img.is_thumbnail === 1)
            ?.image_url || response.data.productImages[0]?.image_url;
        setSelectedImage(initialImage);
      } catch (error) {
        setError("Không thể lấy thông tin chi tiết về sản phẩm.");
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
        <Alert message="Không tìm thấy sản phẩm" type="warning" showIcon />
      </div>
    );

  const {
    productImages = [],
    productVariants = [],
    name,
    price,
    price_old,
    description,
    quantity,
    view,
    promotion,
    status,
    created_at,
    updated_at,
    category,
  } = data;

  const columns = [
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      width: "30%",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
      width: "70%",
    },
  ];

  const dataSource = [
    { detail: "Tên sản phẩm", value: name },
    { detail: "Giá", value: `${price}₫` },
    {
      detail: "Giá cũ",
      value: <span className="text-red-600">{`${price_old}₫`}</span>,
    },
    { detail: "Mô tả sản phẩm", value: description },
    { detail: "Số lượng", value: quantity },
    { detail: "Lượt xem", value: view },
    { detail: "Khuyến mãi", value: promotion },
    {
      detail: "Trạng Thái",
      value: <Tag color={status === "Active" ? "red" : "green"}>{status}</Tag>,
    },
    {
      detail: "Thời gian tạo",
      value: new Date(created_at).toLocaleDateString(),
    },
    {
      detail: "Thời gian cập nhật",
      value: new Date(updated_at).toLocaleDateString(),
    },
    { detail: "Danh mục", value: category.name },
  ];

  const variantRows = productVariants.map((variant) => (
    <div
      key={variant.sku}
      className="bg-white p-6 mb-4 rounded-lg shadow-md border border-gray-200"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="font-semibold">Mã SKU:</div>
        <div>{variant.sku}</div>
        <div className="font-semibold">Số Lượng:</div>
        <div>{variant.stock}</div>
        <div className="font-semibold">Giá:</div>
        <div>{`${variant.price}₫`}</div>
        <div className="font-semibold">Thuộc Tính:</div>
        <div>
          {variant.attributes?.length > 0
            ? variant.attributes.map((attr) => attr.value).join(", ")
            : "Không có thuộc tính"}
        </div>
      </div>
    </div>
  ));

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="p-8 md:p-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Chi tiết Sản Phẩm
        </h1>

        <div className="flex flex-col md:flex-row gap-10 mb-10">
          <div className="md:w-1/2">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Không có ảnh</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {productImages
                .filter((image) => !image.is_thumbnail)
                .map((image) => (
                  <div key={image.image_url} className="flex-none">
                    <img
                      src={image.image_url}
                      alt="Thumbnail"
                      className="w-24 h-24 object-cover cursor-pointer border border-gray-300 rounded-lg"
                      onClick={() => handleThumbnailClick(image.image_url)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              rowKey="detail"
              className="mb-8"
              bordered
              size="middle"
              scroll={{ y: 300 }}
            />
            <h3 className="text-2xl font-semibold mb-4">Chi tiết biến thể</h3>
            <div className="max-h-80 overflow-y-auto">
              {variantRows.length > 0 ? (
                variantRows
              ) : (
                <p>Không có biến thể nào có sẵn</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-8">
              <Link
                to="/admin/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                Quay về
              </Link>
              <Link
                to={`/products/${id}`}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                Xem sản phẩm
              </Link>
              <Link
                to={`/admin/products/edit/${id}`}
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                Sửa sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

