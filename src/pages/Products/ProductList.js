import React from 'react';
import ProductCard from '../../components/ProductCard';


const dummyProducts = [
  {
    id: 1,
    name: 'Samsung Galaxy S22',
    price: 69999,
    discount: 20,
    imageUrl: 'https://m.media-amazon.com/images/I/819HePm8FRL._AC_UY327_FMwebp_QL65_.jpg',
    category: 'Mobile',
  },
  {
    id: 2,
    name: 'Nike Running Shoes',
    price: 2999,
    discount: 35,
    imageUrl: 'https://m.media-amazon.com/images/I/71AF1j+tV6L._AC_UL480_FMwebp_QL65_.jpg',
    category: 'Fashion',
  },
  {
    id: 3,
    name: 'Baby Stroller',
    price: 4999,
    discount: 25,
    imageUrl: 'https://m.media-amazon.com/images/I/41hCAiVMHoL._SX300_SY300_QL70_FMwebp_.jpg',
    category: 'Baby & Kids',
  },
  {
    id: 4,
    name: 'Sony Bluetooth Headphones',
    price: 7999,
    discount: 15,
    imageUrl: 'https://m.media-amazon.com/images/I/41lArSiD5hL._AC_UY327_FMwebp_QL65_.jpg',
    category: 'Electronics',
  },
  {
    id: 5,
    name: 'Leather Handbag',
    price: 1599,
    discount: 40,
    imageUrl: 'https://m.media-amazon.com/images/I/611akdMn+nL._AC_UL480_FMwebp_QL65_.jpg',
    category: 'Bags & Footwear',
  },
  {
    id: 6,
    name: 'Wooden Study Table',
    price: 4999,
    discount: 30,
    imageUrl: 'https://m.media-amazon.com/images/I/61q2R8xK-PL._AC_UL480_FMwebp_QL65_.jpg',
    category: 'Home & Furniture',
  },
  {
    id: 7,
    name: 'Noise Smart Watch',
    price: 3499,
    discount: 28,
    imageUrl: 'https://m.media-amazon.com/images/I/71RrL+FFu1L._AC_UY327_FMwebp_QL65_.jpg',
    category: 'Electronics',
  },
  {
    id: 8,
    name: 'Adidas Sneakers',
    price: 7999,
    discount: 10,
    imageUrl: 'https://m.media-amazon.com/images/I/41wZw39fRyL._AC_UL480_FMwebp_QL65_.jpg',
    category: 'Fashion',
  },
  {
    id: 9,
    name: 'Kitchen Knife Set',
    price: 499,
    discount: 33,
    imageUrl: 'https://m.media-amazon.com/images/I/31Irjmz6sHL._AC_UL480_FMwebp_QL65_.jpg',
    category: 'Home & Furniture',
  },
  {
    id: 10,
    name: 'Backpack',
    price: 2499,
    discount: 22,
    imageUrl: 'https://m.media-amazon.com/images/I/71maWXZscfL._AC_UY327_FMwebp_QL65_.jpg',
    category: 'Bags & Footwear',
  },
  {
    id: 11,
    name: 'Bluetooth Speaker',
    price: 1299,
    discount: 30,
    imageUrl: 'https://m.media-amazon.com/images/I/61ygYGBZUBL._AC_UY327_FMwebp_QL65_.jpg',
    category: 'Electronics',
  },
  {
    id: 12,
    name: 'Cotton Kurti',
    price: 899,
    discount: 45,
    imageUrl: 'https://m.media-amazon.com/images/I/61etVv4v8VL.jpg',
    category: 'Fashion',
  },
  {
  id: 13,
  name: 'Hair dryer',
  price: 2999,
  discount: 30,
  imageUrl: 'https://m.media-amazon.com/images/I/51sFX0qGkKL._AC_UL480_FMwebp_QL65_.jpg',
  category: 'Electronics',
},
{
  id: 14,
  name: 'Office chair',
  price: 7999,
  discount: 18,
  imageUrl: 'https://m.media-amazon.com/images/I/81g9pRpKJ6L._AC_UL480_FMwebp_QL65_.jpg',
  category: 'Home & Furniture',
}

];

const ProductList = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>All Products</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'flex-start',
        }}
      >
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
