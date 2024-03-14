require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');
// IIFE
//immediately invoked function expression
(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'T-shirts', sortOrder: 10},
    {name: 'Sweatshirts & Hoodies', sortOrder: 20},
    {name: 'Coats & Windbreakers', sortOrder: 30},
    {name: 'Pants', sortOrder: 40},
    {name: 'Shorts', sortOrder: 50},
    {name: 'Footwear', sortOrder: 60},
    {name: 'Accessories', sortOrder: 70},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Gray Tee', image: '/images/gray-tee.jpg', category: categories[0], price: 15.99},
    {name: 'White Tee', image: '/images/white-tee.jpg', category: categories[0], price: 16.95},
    {name: 'Compression Tee', image: '/images/compression-shirt.jpg', category: categories[0], price: 14.95},
    {name: 'Black Tee', image: '/images/black-tee.jpg', category: categories[0], price: 15.99},
    {name: 'Graphic Tee', image: '/images/graphic-tee.jpg', category: categories[0], price: 25.95},
    {name: 'Printed Hoodie', image: '/images/printed-hoodie.jpg', category: categories[1], price: 34.95},
    {name: 'Basketball Sweater', image: '/images/basketball-sweatshirt.jpg', category: categories[1], price: 30.99},
    {name: 'Pink Hoodie', image: '/images/pink-hoodie.jpg', category: categories[1], price: 34.95},
    {name: 'Sweater', image: '/images/sweater.jpg', category: categories[1], price: 36.99},
    {name: 'Leather Jacket', image: '/images/leather-jacket.jpg', category: categories[2], price: 99.95},
    {name: 'Windbreaker', image: '/images/windbreaker.jpg', category: categories[2], price: 59.95},
    {name: 'Jean Jacket', image: '/images/jean-jacket.jpg', category: categories[2], price: 65.00},
    {name: 'Raincoat', image: '/images/raincoat.jpg', category: categories[2], price: 72.00},
    {name: 'Jeans', image: '/images/jeans.jpg', category: categories[3], price: 51.99},
    {name: 'Khakis', image: '/images/khakis.jpg', category: categories[3], price: 49.99},
    {name: 'Green Sweatpants', image: '/images/green-sweatpants.jpg', category: categories[3], price: 56.99},
    {name: 'Gray Sweatpants', image: '/images/gray-sweatpants.jpg', category: categories[3], price: 56.99},
    {name: 'Black Sweatpants', image: '/images/black-sweatpants.jpg', category: categories[3], price: 56.99},
    {name: 'Cargo Shorts', image: '/images/cargo-shorts.jpg', category: categories[4], price: 29.95},
    {name: 'Comfy Shorts', image: '/images/comfy-shorts.jpg', category: categories[4], price: 14.99},
    {name: 'Black Athletic Shorts', image: '/images/black-shorts.jpg', category: categories[4], price: 19.99},
    {name: 'Denim Shorts', image: '/images/denim-shorts.jpg', category: categories[4], price: 27.95},
    {name: 'Red Athletic Shorts', image: '/images/red-shorts.jpg', category: categories[4], price: 19.99},
    {name: 'Running Sneakers', image: '/images/running-sneakers.jpg', category: categories[5], price: 95.99},
    {name: 'Basketball Sneakers', image: '/images/basketball-shoes.jpg', category: categories[5], price: 99.99},
    {name: 'Dress Shoes', image: '/images/dress-shoes.jpg', category: categories[5], price: 85.95},
    {name: 'Boots', image: '/images/boots.jpg', category: categories[5], price: 94.99},
    {name: 'Hat', image: '/images/hat.jpg', category: categories[6], price: 14.95},
    {name: 'Sunglasses', image: '/images/sunglasses.jpg', category: categories[6], price: 49.95},
    {name: 'Everyday Carry Bag', image: '/images/bag.jpg', category: categories[6], price: 45.99},
    {name: 'Keychain', image: '/images/keychain.jpg', category: categories[6], price: 9.99},
    {name: 'Headband', image: '/images/headband.jpg', category: categories[6], price: 11.95},
  ]);

  console.log(items)

  process.exit();
})();

//   const items = await Item.create([
//     {name: 'Hamburger', emoji: '🍔', category: categories[0], price: 5.95},
//     {name: 'Turkey Sandwich', emoji: '🥪', category: categories[0], price: 6.95},
//     {name: 'Hot Dog', emoji: '🌭', category: categories[0], price: 3.95},
//     {name: 'Crab Plate', emoji: '🦀', category: categories[1], price: 14.95},
//     {name: 'Fried Shrimp', emoji: '🍤', category: categories[1], price: 13.95},
//     {name: 'Whole Lobster', emoji: '🦞', category: categories[1], price: 25.95},
//     {name: 'Taco', emoji: '🌮', category: categories[2], price: 1.95},
//     {name: 'Burrito', emoji: '🌯', category: categories[2], price: 4.95},
//     {name: 'Pizza Slice', emoji: '🍕', category: categories[3], price: 3.95},
//     {name: 'Spaghetti', emoji: '🍝', category: categories[3], price: 7.95},
//     {name: 'Garlic Bread', emoji: '🍞', category: categories[3], price: 1.95},
//     {name: 'French Fries', emoji: '🍟', category: categories[4], price: 2.95},
//     {name: 'Green Salad', emoji: '🥗', category: categories[4], price: 3.95},
//     {name: 'Ice Cream', emoji: '🍨', category: categories[5], price: 1.95},
//     {name: 'Cup Cake', emoji: '🧁', category: categories[5], price: 0.95},
//     {name: 'Custard', emoji: '🍮', category: categories[5], price: 2.95},
//     {name: 'Strawberry Shortcake', emoji: '🍰', category: categories[5], price: 3.95},
//     {name: 'Milk', emoji: '🥛', category: categories[6], price: 0.95},
//     {name: 'Coffee', emoji: '☕', category: categories[6], price: 0.95},
//     {name: 'Mai Tai', emoji: '🍹', category: categories[6], price: 8.95},
//     {name: 'Beer', emoji: '🍺', category: categories[6], price: 3.95},
//     {name: 'Wine', emoji: '🍷', category: categories[6], price: 7.95},
//   ]);