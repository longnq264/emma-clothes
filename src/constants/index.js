export const NAV_LINKS = [
  {
    href: "/",
    key: "products/men",
    label: "Men",
    children: [
      {
        label: "Shirts",
        href: "/products/men/shirts",
        subCategories: [
          { label: "T-Shirt", href: "/products/men/shirts/tank-top" },
          {
            label: "Hoodies & Sweatshirts",
            href: "/products/men/shirts/hoodie",
          },
          { label: "Jackets", href: "/products/men/shirts/jacket" },
        ],
      },
      {
        label: "Pants",
        href: "/products/men/pants",
        subCategories: [
          { label: "Jeans", href: "/products/men/pants/jeans" },
          { label: "Shorts", href: "/products/men/pants/shorts" },
          { label: "Joggers", href: "/products/men/pants/joggers" },
          { label: "Chinos", href: "/products/men/pants/chino" },
        ],
      },
      {
        label: "Shoes",
        href: "/products/men/shoes",
        subCategories: [
          { label: "Sneakers", href: "/products/men/shoes/sneakers" },
          { label: "Boots", href: "/products/men/shoes/boots" },
          { label: "Sandals", href: "/products/men/shoes/sandals" },
        ],
      },
    ],
  },
  {
    href: "/",
    key: "products/women",
    label: "Women",
    children: [
      {
        label: "Dresses",
        href: "/products/women/dresses",
        subCategories: [
          {
            label: "Casual Dresses",
            href: "/products/women/dresses/casual-dresses",
          },
          {
            label: "Party Dresses",
            href: "/products/women/dresses/party-dresses",
          },
          {
            label: "Maxi Dresses",
            href: "/products/women/dresses/maxi-dresses",
          },
          {
            label: "Midi Dresses",
            href: "/products/women/dresses/midi-dresses",
          },
          {
            label: "Mini Dresses",
            href: "/products/women/dresses/mini-dresses",
          },
        ],
      },
      {
        label: "Tops",
        href: "/products/women/tops",
        subCategories: [
          { label: "Blouses", href: "/products/women/tops/blouses" },
          { label: "Tank Tops", href: "/products/women/tops/tank-tops" },
          { label: "T-Shirts", href: "/products/women/tops/t-shirts" },
          { label: "Crop Tops", href: "/products/women/tops/crop-tops" },
          {
            label: "Hoodies & Sweatshirts",
            href: "/products/women/tops/hoodies-sweatshirts",
          },
          {
            label: "Jackets & Coats",
            href: "/products/women/tops/jackets-coats",
          },
        ],
      },
      {
        label: "Bottoms",
        href: "/products/women/bottoms",
        subCategories: [
          { label: "Jeans", href: "/products/women/bottoms/jeans" },
          { label: "Skirts", href: "/products/women/bottoms/skirts" },
          { label: "Shorts", href: "/products/women/bottoms/shorts" },
          { label: "Leggings", href: "/products/women/bottoms/leggings" },
        ],
      },
    ],
  },
  {
    href: "/",
    key: "collection",
    label: "Collection",
    children: [
      {
        href: "/collection/summer",
        label: "Summer Collection",
        subCategories: [
          { href: "/collection/summer/dresses", label: "Dresses" },
          { href: "/collection/summer/shirts", label: "Shirts" },
          { href: "/collection/summer/shoes", label: "Shoes" },
        ],
      },
      {
        href: "/collection/winter",
        label: "Winter Collection",
        subCategories: [
          { href: "/collection/winter/coats", label: "Coats" },
          { href: "/collection/winter/sweaters", label: "Sweaters" },
          { href: "/collection/winter/boots", label: "Boots" },
        ],
      },
      {
        href: "/collection/spring",
        label: "Spring Collection",
        subCategories: [
          { href: "/collection/spring/jackets", label: "Jackets" },
          { href: "/collection/spring/pants", label: "Pants" },
          { href: "/collection/spring/sneakers", label: "Sneakers" },
        ],
      },
      {
        href: "/collection/autumn",
        label: "Autumn Collection",
        subCategories: [
          { href: "/collection/autumn/hoodies", label: "Hoodies" },
          { href: "/collection/autumn/jeans", label: "Jeans" },
          { href: "/collection/autumn/shoes", label: "Shoes" },
        ],
      },
    ],
  },
  { href: "/", key: "contact", label: "Contact" },
  { href: "/", key: "about", label: "About" },
  { href: "/", key: "blog", label: "Blog" },
  { href: "/", key: "sale", label: "Sale" },
  // update
  { href: "/", key: "privacy", label: "Privacy" },
  { href: "/", key: "terms", label: "Terms" },
];

export const NAV_LINKS_WOMEN = [
  { href: "/category/women/dresses", label: "Dresses" },
  { href: "/category/women/tops", label: "Tops" },
  { href: "/category/women/accessories", label: "Accessories" },
];

export const NAV_LINKS_MEN = [
  { href: "/category/men/shirts", label: "Shirts" },
  { href: "/category/men/pants", label: "Pants" },
  { href: "/category/men/shoes", label: "Shoes" },
];

export const NAV_USER_MENU = [
  { href: "/", key: "cart", label: "Cart" },
  { href: "/", key: "profile", label: "Profile" },
];

export const NAV_LINKS_FOOTER = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];
