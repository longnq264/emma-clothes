import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "antd";
import GetListCategories from "../../components/User/Products/GetListCategories";
import { getProduct, updateProduct, getCategories } from "../../api/api-server";
import { createProductVariants, getProductItems } from "../../api/post-product";
import { ToastContainer } from "react-toastify";
import UpdateProductTitleForm from "../../components/User/SubmitForm/UpdateProductTitleForm";
import UpdateProductImage from "../../components/User/SubmitForm/UpdateProductImage";
import UpdateVariant from "../../components/User/SubmitForm/UpdateVariant";

const ProductEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [productItemsUser, setProductItemsUser] = useState([]);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesFile, setImageFile] = useState();
  const [product, setProduct] = useState();
<<<<<<< HEAD
  const [formValues, setFormValues] = useState([]);
  console.log(formValues);
  // useEffect(() => {
  //   if (productItemsUser && Array.isArray(productItemsUser)) {
  //     setFormValues(productItemsUser.map((item) => ({
  //       id: item.id,
  //       price: item.price,
  //       stock: item.stock,
  //     })));
  //   }
  // }, [productItemsUser]);
=======
  const [form] = Form.useForm();

  // console.log(product);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
        setImages(response.data.productImages || []);
        const existingImages = response.data.productImages.map((img) => ({
          id: img.id,
          is_thumbnail: img.is_thumbnail,
        }));

        setImageFile(existingImages);
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

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        price_old: product.price_old,
        quantity: product.quantity,
        description: product.description,
        category: product.category.id,
      });
    }
  }, [product, form]); // Khi product thay đổi, form sẽ được cập nhật

>>>>>>> hieu/Coupon
  const onFinish = async (values) => {
    // console.log("values", values);
    const formData = new FormData();
    formData.append("promotion", "Giảm giá đặc biệt");
    formData.append("status", "active");
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", Number(values.price));
    formData.append("price_old", Number(values.price_old));
    formData.append("quantity", Number(values.quantity));
    formData.append("category_id", values.category);

    imagesFile.forEach((image, index) => {
      if (image.id !== undefined) {
        formData.append(`images[${index}][id]`, image.id);
        // formData.append(`images[${index}][file]`, null);
        formData.append(`images[${index}][is_thumbnail]`, image.is_thumbnail);
      }
    });

    // Thêm ảnh mới
    imagesFile.forEach((image, index) => {
      if (image.file) {
        // formData.append(`images[${index}][id]`, null);
        formData.append(`images[${index}][file]`, image.file);
        formData.append(`images[${index}][is_thumbnail]`, 0);
      }
    });
    formData.append("_method", "PUT");
    try {
      await updateProduct(id, formData);
      // navigate("/admin/products");
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpdateVariant = async () => {
    console.log("click update variant");
    const variantData = {
      product_id: Number(id),
      attribute: variants,
      stock: product.quantity,
      price: product.price,
      category: product.category.name,
    };

    console.log(variantData);
    try {
      const response = await createProductVariants(id, variantData);
      if (response.status === true) {
        await fetchProductItems(id);
        console.log("success");
      }
      console.log(response);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductItems = async (id) => {
    try {
      const response = await getProductItems(id);
      setProductItemsUser(response.data.productVariants);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
        setImages(response.data.productImages || []);
        const existingImages = response.data.productImages.map((img) => ({
          id: img.id,
          is_thumbnail: img.is_thumbnail,
        }));

        setImageFile(existingImages);
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
    fetchProductItems(id);
  }, [id]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        price_old: product.price_old,
        quantity: product.quantity,
        description: product.description,
        category: product.category.id,
      });
    }
  }, [product, form]); // Khi product thay đổi, form sẽ được cập nhật
  return (
    <div className="container mx-auto px-4 mb-20">
      <h1 className="pl-8 text-4xl text-stone-700 font-extrabold pb-4">
        Chỉnh Sửa Sản Phẩm
      </h1>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-8 bg-white shadow-lg rounded-lg p-8"
      >
        <UpdateProductImage
          images={images}
          setImages={setImages}
          setImageFile={setImageFile}
        />

        {product && <UpdateProductTitleForm product={product} />}

        <GetListCategories categories={categories} />

        <div className="px-8">
          <UpdateVariant
            setFormValues={setFormValues}
            productItemsUser={productItemsUser}
            variants={variants}
            setVariants={setVariants}
            idProduct={id}
            setProductItemsUser={setProductItemsUser}
          />
          <Button onClick={handleUpdateVariant}>Update Attribute</Button>
        </div>
        {/* Submit button for variants */}

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

