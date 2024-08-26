import { Button, Form } from "antd";
import AttributesProduct from "../../components/User/Products/AttributesProduct";
import ProductTitleForm from "../../components/User/SubmitForm/ProductTitleForm";
import { useState } from "react";
import ProductImagesForm from "../../components/User/Products/ProductImageForm";
import {
  createProductItem,
  createProductVariants,
  getProductItems,
} from "../../api/post-product";
// import UploadImage from "../../components/User/Products/UploadImage";

const ProductAdd = () => {
  const [images, setImages] = useState([]);
  const [isVariant, setIsVariant] = useState(false);
  const [productItemsUser, setProductItemsUser] = useState([]);
  const [productItem, setProductItem] = useState([]);
  const [variants, setVariants] = useState([]);
  const [idProduct, setIdProduct] = useState([]);
  console.log(images);
  console.log(variants);
  console.log(productItem);
  console.log(idProduct);

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(variants);
    const formData = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      price_old: Number(values.price_old),
      quantity: Number(values.quantity),
      category_id: values.category,
      promotion: "Giảm giá đặc biệt", //khuyến mãi
      status: "Active", //trạng thái
      images: images,
    };

    try {
      const response = await createProductItem(formData);
      console.log("response", response);
      setProductItem(response.data);
      setIdProduct(response.data.id);
      if (response.data.status) {
        setIsVariant(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleVariantSubmit = async () => {
    if (variants.length === 0 || !productItem) return;

    const variantData = {
      product_id: productItem.id,
      attribute: variants,
      stock: productItem.stock,
      price: productItem.price,
    };

    try {
      const response = await createProductVariants(idProduct, variantData);
      console.log("Variant response", response);
      if (response.status === true) {
        fetchProductItems(idProduct);
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductItems = async (id) => {
    try {
      const response = await getProductItems(id);
      setProductItemsUser(response.data.productVariants);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

        <ProductTitleForm />

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

      {/* <UploadImage images={images} setImages={setImages} /> */}

      {/* Variants */}
      {isVariant && (
        <>
          <AttributesProduct
            productItemsUser={productItemsUser}
            variants={variants}
            setVariants={setVariants}
            idProduct={idProduct}
          />

          {/* Submit button for variants */}
          <div className="flex justify-start mt-10">
            <Button
              type="primary"
              onClick={handleVariantSubmit}
              className="bg-blue-500 text-lg"
            >
              Tạo Thuộc Tính
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductAdd;

