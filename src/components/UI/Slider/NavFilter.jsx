// import React from 'react';

// const NavFilter = ({ onFilterChange }) => {
//   const [selectedColor, setSelectedColor] = React.useState([]);
//   const [selectedSize, setSelectedSize] = React.useState([]);
//   const [selectedPriceRange, setSelectedPriceRange] = React.useState(null);

//   const handleColorChange = (color) => {
//     setSelectedColor(prevColors => {
//       const newColors = prevColors.includes(color)
//         ? prevColors.filter(c => c !== color)
//         : [...prevColors, color];
//       onFilterChange({ color: newColors });
//       return newColors;
//     });
//   };

//   const handleSizeChange = (size) => {
//     setSelectedSize(prevSizes => {
//       const newSizes = prevSizes.includes(size)
//         ? prevSizes.filter(s => s !== size)
//         : [...prevSizes, size];
//       onFilterChange({ size: newSizes });
//       return newSizes;
//     });
//   };

//   const handlePriceRangeChange = (min, max) => {
//     setSelectedPriceRange({ min, max });
//     onFilterChange({ min_price: min, max_price: max });
//   };

//   return (
//     <div className="basis-1/6 overflow-y-auto max-h-90">
//       <h1 className="uppercase font-bold text-2xl text-stone-700 mb-14">
//         Filter
//       </h1>
//       <div className="my-2">
//         <h1 className="font-bold text-2xl">Filters</h1>
//         <ul className="text-stone-800">
//           <DropdownItem title="Colors">
//             <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
//               <input
//                 type="checkbox"
//                 className="mr-4 w-4 h-4 border-slate-500"
//                 onChange={() => handleColorChange('Red')}
//               />
//               Red
//             </label>
//             <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
//               <input
//                 type="checkbox"
//                 className="mr-4 w-4 h-4 border-slate-500"
//                 onChange={() => handleColorChange('Blue')}
//               />
//               Blue
//             </label>
//           </DropdownItem>
//           <DropdownItem title="Sizes">
//             <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
//               <input
//                 type="checkbox"
//                 className="mr-4 w-4 h-4 border-slate-500"
//                 onChange={() => handleSizeChange('Small')}
//               />
//               Small
//             </label>
//             <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
//               <input
//                 type="checkbox"
//                 className="mr-4 w-4 h-4 border-slate-500"
//                 onChange={() => handleSizeChange('Medium')}
//               />
//               Medium
//             </label>
//           </DropdownItem>
//           <DropdownItem title="Price Range">
//             <label className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg">
//               <input
//                 type="checkbox"
//                 className="mr-4 w-4 h-4 border-slate-500"
//                 onChange={() => handlePriceRangeChange(50, 100)}
//               />
//               $50 - $100
//             </label>
//           </DropdownItem>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NavFilter;
