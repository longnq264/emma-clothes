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

  console.log("variants", variants);
  // console.log("show add atributes", productItemsUser);
  //Submit postProduct request firts
  const onFinish = async (values) => {
    console.log("onFinish", values);
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

  //failed
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //Submit show variants
  const handleVariantSubmit = async () => {
    if (variants.length === 0 || !productItem)
      return console.log("No select variant item!!");

    const variantData = {
      product_id: productItem.id,
      attribute: variants,
      stock: productItem.quantity,
      price: productItem.price,
    };
    const existingVariants = productItemsUser.map((item) => item.attributes);

    if (existingVariants.length === 0) {
      try {
        const response = await createProductVariants(idProduct, variantData);
        console.log("Variant response", response);
        if (response.status === true) {
          await fetchProductItems(idProduct);
          console.log("success");
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const filterNewVariants = (data1, data2, targetAttributeId) => {
      return data2
        .map((item2) => {
          // Chỉ xử lý attribute_id mà bạn đang nhắm tới
          if (item2.attribute_id !== targetAttributeId) {
            return item2; // Giữ nguyên nếu attribute_id không khớp
          }

          // Tìm phần tử tương ứng trong data1 dựa trên attribute_id
          const matchingItem = data1.find(
            (item1) => item1.attribute_id === item2.attribute_id
          );

          if (matchingItem) {
            // Lọc các value_ids trong data2 mà chưa có trong data1
            const newValues = item2.value_ids.filter(
              (value_id) => !matchingItem.value_ids.includes(value_id)
            );

            // Nếu có giá trị mới thì trả về attribute_id và các value_ids mới
            if (newValues.length > 0) {
              return {
                attribute_id: item2.attribute_id,
                value_ids: newValues,
              };
            }
          } else {
            // Nếu attribute_id không tồn tại trong data1, trả về toàn bộ value_ids
            return item2;
          }
        })
        .filter((item) => item); // Lọc bỏ các giá trị `undefined`
    };

    const result = existingVariants.flat().reduce((acc, item) => {
      const { attribute_id, id } = item;

      // Tìm xem attribute đã tồn tại trong acc chưa
      const existingAttribute = acc.find(
        (attr) => attr.attribute_id === attribute_id
      );

      if (existingAttribute) {
        // Nếu attribute đã tồn tại, thêm value_id nếu chưa có
        if (!existingAttribute.value_ids.includes(id)) {
          existingAttribute.value_ids.push(id);
        }
      } else {
        // Nếu chưa tồn tại, thêm attribute mới vào acc
        acc.push({
          attribute_id: attribute_id,
          value_ids: [id],
        });
      }

      return acc;
    }, []);

    console.log("init variant", result);

    const newVariants = filterNewVariants(result, variants, 1);
    console.log("new variants", newVariants);
    const newVariantData = {
      product_id: productItem.id,
      attribute: newVariants,
      stock: productItem.quantity,
      price: productItem.price,
    };
    if (newVariants.length > 0) {
      try {
        const response = await createProductVariants(idProduct, newVariantData);
        console.log("Variant response", response);
        if (response.status === true) {
          await fetchProductItems(idProduct);
          console.log("success");
        }
      } catch (error) {
        console.log(error);
      }
    }
    // // Nếu không có variant mới nào, không cần gửi thêm
    // if (newVariants.length === 0) {
    //   console.log("Tất cả các variants đã tồn tại, không cần thêm mới");
    //   return;
    // }
  };

  //get list Attribute
  const fetchProductItems = async (id) => {
    try {
      const response = await getProductItems(id);
      console.log(response);
      setProductItemsUser(response.data.productVariants);
    } catch (error) {
      console.log(error);
    }
  };

  // submit multiple
  const handleSubmit = async () => {
    if (productItemsUser.length === 0) return;
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

