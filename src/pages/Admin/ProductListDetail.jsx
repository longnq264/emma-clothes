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

  useEffect(() => {
    const fetchProductDetail = async (id) => {
      try {
        const response = await getProductId(id);
        setData(response.data);
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
        <Alert message="Khong tim thay san pham" type="warning" showIcon />
      </div>
    );

  const mainImageUrl = data.productImages.find(
    (img) => img.is_thumbnail === 1
  )?.image_url;

  const selectedVariant = data.productVariants[0] || null;

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
    { detail: "Tên sản phẩm", value: data.name },
    { detail: "Giá", value: `${data.price}₫` },
    {
      detail: "Giá cũ",
      value: <span className="text-red-600">{`${data.price_old}₫`}</span>,
    },
    { detail: "Mô tả sản phẩm", value: data.description },
    { detail: "Số lượng", value: data.quantity },
    { detail: "Lượt xem", value: data.view },
    { detail: "Khuyến mãi", value: data.promotion },
    {
      detail: "Trạng Thái",
      value: (
        <Tag color={data.status === "Active" ? "red" : "green"}>
          {data.status}
        </Tag>
      ),
    },
    {
      detail: "Thời gian tạo",
      value: new Date(data.created_at).toLocaleDateString(),
    },
    {
      detail: "Thời gian cập nhật",
      value: new Date(data.updated_at).toLocaleDateString(),
    },
    { detail: "Danh mục", value: data.category.name },
  ];

  const variantColumns = [
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

  const variantDataSource = selectedVariant
    ? [
        { detail: "Mã SKU", value: selectedVariant.sku },
        { detail: "Số Lượng", value: selectedVariant.stock },
        { detail: "Giá", value: `${selectedVariant.price}₫` },
        {
          detail: "Thuộc Tính",
          value: selectedVariant.attributes
            .map((attr) => attr.value)
            .join(", "),
        },
      ]
    : [];

  return (
    <div className="p-8 md:p-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Chi tiết Sản Phẩm
        </h1>

        <div className="flex flex-col md:flex-row gap-10 mb-10">
          <div className="md:w-1/2">
            {mainImageUrl ? (
              <img
                src={mainImageUrl}
                alt={data.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Không có ảnh</p>
              </div>
            )}
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
            <h3 className="text-2xl font-semibold  mb-4">Chi tiết biến thể</h3>
            {selectedVariant ? (
              <Table
                columns={variantColumns}
                dataSource={variantDataSource}
                pagination={false}
                rowKey="detail"
                bordered
                size="middle"
                scroll={{ y: 300 }}
              />
            ) : (
              <p>Không có biến thể nào có sẵn</p>
            )}
            <br />

            <div className="flex justify-center space-x-4 mt-4">
              <Link
                to="/admin/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                Quay về Product List
              </Link>

              <Link
                to={`/products/${id}`}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                View Sản phẩm
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
