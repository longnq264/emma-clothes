import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import ProductTitleForm from "../../components/User/SubmitForm/ProductTitleForm";
import GetListCategories from "../../components/User/Products/GetListCategories";
import ProductImagesForm from "../../components/User/Products/ProductImageForm";
import UploadImage from "../../components/User/Products/UploadImage";
import { getProduct, updateProduct, getCategories } from "../../api/api-server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductEdit = () => {
  const { id } = useParams();
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    price_old: "",
    quantity: "",
    category_id: "",
    promotion: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProduct(id);
        setProduct({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          price_old: data.price_old || "",
          quantity: data.quantity || "",
          category_id: data.category_id || "",
          promotion: data.promotion || "",
          status: data.status || "",
        });
        setVariants(data.variants || []);
        setImages(data.images || []);
      } catch (error) {
        console.error("Lỗi không tìm được sản phẩm:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data[0]?.children || []);
      } catch (error) {
        console.error("Lỗi không lấy được danh mục:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const onFinish = async (values) => {
    const formData = {
      name: values.name,
      description: values.description,
      images: images,
      price: Number(values.price),
      price_old: Number(values.price_old),
      quantity: Number(values.quantity),
      category_id: values.category,
      promotion: "Giảm giá đặc biệt",
      status: "Active",
      variants: variants,
    };

    try {
      await updateProduct(id, formData);
      toast.success("Sản phẩm đã được cập nhật thành công!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container mx-auto px-4 mb-20">
      <h1 className="pl-8 text-4xl text-stone-700 font-extrabold pb-4">
        Chỉnh Sửa Sản Phẩm
      </h1>
      <Form
        initialValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          price_old: product.price_old,
          quantity: product.quantity,
          category: product.category_id,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-8 bg-white shadow-lg rounded-lg p-8"
      >
        {/* Image */}
        <ProductImagesForm images={images} setImages={setImages} />
        <UploadImage images={images} setImages={setImages} />

        <ProductTitleForm />

        <GetListCategories categories={categories} />

        {/* Variants
        <AttributesProduct variants={variants} setVariants={setVariants} /> */}

        <Form.Item className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-orange-500 text-lg mt-10"
          >
            Cập Nhật Sản Phẩm
          </Button>
        </Form.Item>
      </Form>

      <ToastContainer />
    </div>
  );
};

export default ProductEdit;
