import { Button, Form } from "antd";
import AttributesProduct from "../../components/User/Products/AttributesProduct";
import ProductTitleForm from "../../components/User/SubmitForm/ProductTitleForm";
import { useState } from "react";
import ProductImagesForm from "../../components/User/Products/ProductImageForm";
import {
  createProductItem,
  createProductVariants,
  getProductItems,
  updateMultiple,
} from "../../api/post-product";
// import UploadImage from "../../components/User/Products/UploadImage";

const ProductAdd = () => {
  const [images, setImages] = useState([]);
  const [isVariant, setIsVariant] = useState(false);
  const [productItemsUser, setProductItemsUser] = useState([]);
  const [productItem, setProductItem] = useState([]);
  const [variants, setVariants] = useState([]);
  const [idProduct, setIdProduct] = useState([]);

  console.log(variants);
  console.log(productItem);
  console.log(idProduct);
  console.log(productItemsUser);

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
      console.log(response);
      setProductItemsUser(response.data.productVariants);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    console.log(productItemsUser);
    const productSubmit = {
      variants: productItemsUser.map((item) => {
        return {
          id: item.id, // Lấy ID từ item trong productItemsUser
          price: Number(item.price), // Lấy giá trị price từ item
          stock: Number(item.stock), // Lấy stock từ item
          thumbnail: item.thumbnail, // Lấy thumbnail từ item
        };
      }),
    };
    console.log(productSubmit);

    try {
      const response = await updateMultiple(productSubmit);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log("success");
  };
  return (
    <div className="container mx-auto px-4 mb-20">
      <h1 className="pl-8 text-4xl text-stone-700 font-extrabold pb-6">
        Thêm Sản Phẩm
      </h1>
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-8 bg-white rounded-lg p-8"
      >
        <ProductImagesForm images={images} setImages={setImages} />

        <ProductTitleForm />

        <Form.Item className="flex justify-start">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-orange-500 text-lg"
          >
            Thêm thuộc tính
          </Button>
        </Form.Item>
      </Form>

      {/* <UploadImage images={images} setImages={setImages} /> */}

      {/* Variants */}
      {isVariant && (
        <div className="px-8">
          <AttributesProduct
            productItemsUser={productItemsUser}
            variants={variants}
            setVariants={setVariants}
            idProduct={idProduct}
            setProductItemsUser={setProductItemsUser}
          />

          {/* Submit button for variants */}
          <div className="flex justify-start mt-10">
            <Button
              type="primary"
              onClick={handleVariantSubmit}
              className="bg-orange-400 text-lg"
            >
              Hiển thị thuộc tính
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-end w-full">
        <button
          onClick={handleSubmit}
          className="bg-orange-400 p-2 rounded-lg text-white font-bold"
        >
          Thêm Sản Phẩm
        </button>
      </div>
    </div>
  );
};

export default ProductAdd;

