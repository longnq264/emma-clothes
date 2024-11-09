import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductId } from "../../api/api-server";
import SuggestedProducts from "../../components/UI/Home/SuggestedProducts";
import ProductInforDetail from "../../components/UI/Product/ProductInforDetail.jsx";
import ProductImageDetail from "../../components/UI/Product/ProductImageDetail.jsx";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState([]);
  // const [mainImage, setMainImage] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  console.log("selected", selectedVariant);

  const fetchProductDetail = async (id) => {
    setIsLoading(true);
    try {
      const response = await getProductId(id);
      setData(response.data);
      setSelectedVariant(response.data.productVariants[0]);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      setError("Error loading product details.");
    } finally {
      setIsLoading(false);
    }
  };

  const mainImage = data.productImages || [];
  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="md:pt-10">
      <div
        className="content container mx-auto md:px-20 my-2"
        style={{ minHeight: "140vh" }}
      >
        <div className="md:flex mb-20">
          <ProductImageDetail mainImage={mainImage} />
          <ProductInforDetail
            data={data}
            id={id}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            mainImage={mainImage}
            setSelectedMaterial={setSelectedMaterial}
            selectedMaterial={selectedMaterial}
          />
        </div>
        <SuggestedProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
