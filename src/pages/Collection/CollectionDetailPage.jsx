import { useParams } from "react-router-dom";

const CollectionDetailPage = () => {
  const { role } = useParams();
  //   const collection = collections.find((col) => col.id === parseInt(id));

  //   if (!collection) {
  //     return <div>Collection not found</div>;
  //   }
  console.log(role);
  return (
    <div className="container mx-auto px-10 py-4">
      <h1 className="text-3xl font-bold mb-6">{role} collection</h1>
      {/* <img
        src={collection.imageUrl}
        alt={collection.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p>{collection.description}</p> */}
    </div>
  );
};

export default CollectionDetailPage;
