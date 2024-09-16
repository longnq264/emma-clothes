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
        setError("Unable to fetch product details.");
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

  const mainImageUrl = data.productImages.find(
    (img) => img.is_thumbnail === 1
  )?.image_url;

  const selectedVariant = data.productVariants[0] || null;

  const columns = [
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      width: '30%',
      render: text => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
    },
  ];

  const dataSource = [
    { detail: 'Name', value: data.name },
    { detail: 'Price', value: `${data.price}₫` },
    { detail: 'Old Price', value: <span className="text-red-600">{`${data.price_old}₫`}</span> },
    { detail: 'Description', value: data.description },
    { detail: 'Quantity', value: data.quantity },
    { detail: 'Views', value: data.view },
    { detail: 'Promotion', value: data.promotion },
    { detail: 'Status', value: <Tag color={data.status === 'Active' ? 'red' : 'green'}>{data.status}</Tag> },
    { detail: 'Created At', value: new Date(data.created_at).toLocaleDateString() },
    { detail: 'Updated At', value: new Date(data.updated_at).toLocaleDateString() },
    { detail: 'Category', value: data.category.name },
  ];

  const variantColumns = [
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      width: '30%',
      render: text => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
    },
  ];

  const variantDataSource = selectedVariant
    ? [
        { detail: 'SKU', value: selectedVariant.sku },
        { detail: 'Stock', value: selectedVariant.stock },
        { detail: 'Price', value: `${selectedVariant.price}₫` },
        { detail: 'Attributes', value: selectedVariant.attributes.map(attr => attr.value).join(', ') },
      ]
    : [];

  return (
    <div className="p-8 md:p-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Product Details</h1>

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
                <p className="text-gray-600">No image available</p>
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
            <h3 className="text-2xl font-semibold  mb-4">Variant Details</h3>
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
              <p>No available variants</p>
            )}
            <br />
            <Link
              to="/admin/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              Quay về Product List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
