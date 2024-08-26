// import { useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import AttributesProduct from "../../components/User/Products/AttributesProduct";
import ProductTitleForm from "../../components/User/SubmitForm/ProductTitleForm";
import GetListCategories from "../../components/User/Products/GetListCategories";
import { useState } from "react";
import { createProduct } from "../../api/api-server";
import ProductImagesForm from "../../components/User/Products/ProductImageForm";
import UploadImage from "../../components/User/Products/UploadImage";

const ProductAdd = () => {
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  console.log(images);
  console.log(variants);

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(variants);
    const formData = {
      name: values.name,
      description: values.description,
      images: images,
      price: Number(values.price),
      price_old: Number(values.price_old),
      quantity: Number(values.quantity),
      category_id: values.category,
      promotion: "Giảm giá đặc biệt", //khuyến mãi
      status: "Active", //trạng thái
      variants: variants,
    };
    console.log(formData);

    try {
      const response = await createProduct(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container mx-auto px-4 mb-20">
      <h1 className="pl-8 text-4xl text-stone-700 font-extrabold pb-4">
        Thêm Sản Phẩm
      </h1>
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-8 bg-white shadow-lg rounded-lg p-8"
      >
        {/* Image */}
        <ProductImagesForm images={images} setImages={setImages} />
        <UploadImage images={images} setImages={setImages} />

        <ProductTitleForm />

        <GetListCategories />

        {/* Variants */}
        <AttributesProduct variants={variants} setVariants={setVariants} />

        <Form.Item className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-orange-500 text-lg mt-10"
          >
            Thêm Sản Phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;

