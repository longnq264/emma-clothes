import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "antd";
import GetListCategories from "../../components/User/Products/GetListCategories";
import { getProduct, updateProduct, getCategories } from "../../api/api-server";
import { getProductItems } from "../../api/post-product";
import { ToastContainer } from "react-toastify";
import UpdateProductTitleForm from "../../components/User/SubmitForm/UpdateProductTitleForm";
import UpdateProductImage from "../../components/User/SubmitForm/UpdateProductImage";
import UpdateVariant from "../../components/User/SubmitForm/UpdateVariant";

const ProductEdit = () => {
  const { id } = useParams();
  const [isVariant, setIsVariant] = useState(false);
  const [productItemsUser, setProductItemsUser] = useState([]);
  const [variants, setVariants] = useState([]);
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

  // const handleVariantSubmit = async () => {
  //   if (variants.length === 0 || !productItem)
  //     return console.log("No select variant item!!");

  //   const variantData = {
  //     product_id: productItem.id,
  //     attribute: variants,
  //     stock: productItem.quantity,
  //     price: productItem.price,
  //   };
  //   try {
  //     const response = await createProductVariants(idProduct, variantData);
  //     if (response.status === true) {
  //       await fetchProductItems(idProduct);
  //       console.log("success");
  //     }
  //     return;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   const existingVariants = productItemsUser
  //     .map((item) => item.attributes)
  //     .flat();

  //   if (!existingVariants.length) {
  //     return;
  //   }

  //   console.log("exitings variants", existingVariants);

  //   const result = existingVariants.reduce((acc, item) => {
  //     const { attribute_id, id } = item;
  //     console.log("acc", acc);
  //     console.log("item", attribute_id, id);
  //     const existingAttribute = acc.find(
  //       (attr) => attr.attribute_id === attribute_id
  //     );
  //     console.log(existingAttribute);
  //     if (existingAttribute) {
  //       if (!existingAttribute.value_ids.includes(id)) {
  //         existingAttribute.value_ids.push(id);
  //       }
  //     } else {
  //       acc.push({
  //         attribute_id: attribute_id,
  //         value_ids: [id],
  //       });
  //     }

  //     return acc;
  //   }, []);

  //   console.log("init variant", result);

  //   const newVariants = filterNewVariants(result, variants);
  //   console.log("new variants", newVariants);

  //   const newVariantData = {
  //     product_id: productItem.id,
  //     attribute: newVariants,
  //     stock: productItem.quantity,
  //     price: productItem.price,
  //   };
  //   if (newVariants.length > 0) {
  //     try {
  //       const response = await createProductVariants(idProduct, newVariantData);
  //       console.log("Variant response", response);
  //       if (response.status === true) {
  //         await fetchProductItems(idProduct);
  //         console.log("success");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   // // Nếu không có variant mới nào, không cần gửi thêm
  //   // if (newVariants.length === 0) {
  //   //   console.log("Tất cả các variants đã tồn tại, không cần thêm mới");
  //   //   return;
  //   // }
  // };

  // //get list Attribute
  // const fetchProductItems = async (id) => {
  //   try {
  //     const response = await getProductItems(id);
  //     console.log(response);
  //     setProductItemsUser(response.data.productVariants);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleVariantSubmit = () => {
    console.log("onClick");
    setIsVariant(true);
    fetchProductItems;
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

        {isVariant && (
          <div className="px-8">
            <UpdateVariant
              productItemsUser={productItemsUser}
              variants={variants}
              setVariants={setVariants}
              idProduct={id}
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

