 
import { useParams } from "react-router-dom";
import Banner from '../../components/UI/Slider/Banner';

const CollectionDetailPage = () => {
  const { role } = useParams();

  return (
    <div className="container mx-auto px-10 py-4">
      {/* Banner Section */}
      <Banner />

      {/* Collection Content */}
      <h1 className="text-3xl font-bold mb-6 text-center">{role} collection</h1>
    </div>
  );
};

export default CollectionDetailPage;
