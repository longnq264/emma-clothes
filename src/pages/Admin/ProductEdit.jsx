import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "antd";
import GetListCategories from "../../components/User/Products/GetListCategories";
import { getProduct, updateProduct, getCategories } from "../../api/api-server";
import { ToastContainer } from "react-toastify";
import UpdateProductTitleForm from "../../components/User/SubmitForm/UpdateProductTitleForm";
import UpdateProductImage from "../../components/User/SubmitForm/UpdateProductImage";

const ProductEdit = () => {
  const { id } = useParams();
  // const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesFile, setImageFile] = useState();
  const [product, setProduct] = useState({});
  console.log(product);
  console.log("image", images);
  console.log("list update image file", imagesFile);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        console.log(response);
        setProduct(response.data);
        // setVariants(response.data.productImages || []);
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

  const onFinish = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("promotion", "Giảm giá đặc biệt");
    formData.append("status", "Active");
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", Number(values.price));
    formData.append("price_old", Number(values.price_old));
    formData.append("quantity", Number(values.quantity));
    formData.append("category_id", values.category);

    imagesFile.forEach((image, index) => {
      if (image.id !== undefined) {
        formData.append(`images[${index}].id`, image.id);
        formData.append(`images[${index}].is_thumbnail`, image.is_thumbnail);
      }
    });

    // Thêm ảnh mới
    imagesFile.forEach((image, index) => {
      if (image.file) {
        formData.append(`images[${index}]`, image.file);
        formData.append(`images[${index}].is_thumbnail`, image.is_thumbnail);
      }
    });
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

  return (
    <div className="container mx-auto px-4 mb-20">
      <h1 className="pl-8 text-4xl text-stone-700 font-extrabold pb-4">
        Chỉnh Sửa Sản Phẩm
      </h1>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-8 bg-white shadow-lg rounded-lg p-8"
      >
        {images.length > 0 && (
          <UpdateProductImage
            images={images}
            setImages={setImages}
            setImageFile={setImageFile}
          />
        )}

        {product && <UpdateProductTitleForm product={product} />}

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

