import { useState } from "react";
import { NavLink } from "react-router-dom";
const PRODUCTS = {
  hoodie: [
    {
      id: 1,
      name: "Hoodie 1",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375404/hoodie_vgtsfu.png",
    },
    {
      id: 2,
      name: "Hoodie 2",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375404/hoodie_vgtsfu.png",
    },
    {
      id: 3,
      name: "Hoodie 3",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375404/hoodie_vgtsfu.png",
    },
    {
      id: 4,
      name: "Hoodie 4",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375404/hoodie_vgtsfu.png",
    },
  ],
  chinos: [
    {
      id: 1,
      name: "Chinos 1",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375570/chino_vmr0yt.png",
    },
    {
      id: 2,
      name: "Chinos 2",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375570/chino_vmr0yt.png",
    },
    {
      id: 3,
      name: "Chinos 3",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375570/chino_vmr0yt.png",
    },
    {
      id: 4,
      name: "Chinos 4",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375570/chino_vmr0yt.png",
    },
  ],
  jacket: [
    {
      id: 1,
      name: "Jacket 1",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375784/jacket_tyvg36.png",
    },
    {
      id: 2,
      name: "Jacket 2",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375784/jacket_tyvg36.png",
    },
    {
      id: 3,
      name: "Jacket 3",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375784/jacket_tyvg36.png",
    },
    {
      id: 4,
      name: "Jacket 4",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375784/jacket_tyvg36.png",
    },
  ],
  cargopants: [
    {
      id: 1,
      name: "Cargo Pants 1",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375791/2a3e6b69fe95e5819596c3d630e85af0_osrr2q.webp",
    },
    {
      id: 2,
      name: "Cargo Pants 2",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375791/2a3e6b69fe95e5819596c3d630e85af0_osrr2q.webp",
    },
    {
      id: 3,
      name: "Cargo Pants 3",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375791/2a3e6b69fe95e5819596c3d630e85af0_osrr2q.webp",
    },
    {
      id: 4,
      name: "Cargo Pants 4",
      image:
        "https://res.cloudinary.com/da7r4robk/image/upload/v1720375791/2a3e6b69fe95e5819596c3d630e85af0_osrr2q.webp",
    },
  ],
};
const CategoryPopular = () => {
  const [selectedCategory, setSelectedCategory] = useState("hoodie");

  const categories = ["hoodie", "chinos", "jacket", "cargopants"];

  return (
    <div className="container mx-auto ">
      <h1 className="title my-6 font-semibold text-stone-700">
        Category Popular
      </h1>

      <div className="flex justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mx-2 ${
              selectedCategory === category
                ? "bg-amber-600 text-white"
                : "bg-slate-50 text-gray-700"
            } rounded-lg`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {PRODUCTS[selectedCategory].map((product) => (
          <div key={product.id} className="relative">
            <NavLink to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full" />
              <h2 className="mt-2 text-lg font-medium">{product.name}</h2>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPopular;
