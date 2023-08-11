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
    {name: 'Basic White Tee', image: '/images/white-tee.jpg', category: categories[0], price: 14.95},
    {name: 'Graphic Tee', image: '/images/graphic-tee.jpg', category: categories[0], price: 19.95},
    {name: 'Printed Hoodie', image: '/images/printed-hoodie.jpg', category: categories[1], price: 34.95},
    {name: 'Zip-up Hoodie', image: '/images/zip-up-hoodie.jpg', category: categories[1], price: 39.95},
    {name: 'Leather Jacket', image: '/images/leather-jacket.jpg', category: categories[2], price: 99.95},
    {name: 'Windbreaker', image: '/images/windbreaker.jpg', category: categories[2], price: 59.95},
    {name: 'Jeans', image: '/images/jeans.jpg', category: categories[3], price: 49.95},
    {name: 'Chinos', image: '/images/chinos.jpg', category: categories[3], price: 44.95},
    {name: 'Cargo Shorts', image: '/images/cargo-shorts.jpg', category: categories[4], price: 29.95},
    {name: 'Denim Shorts', image: '/images/denim-shorts.jpg', category: categories[4], price: 27.95},
    {name: 'Running Sneakers', image: '/images/running-sneakers.jpg', category: categories[5], price: 69.95},
    {name: 'Loafers', image: '/images/loafers.jpg', category: categories[5], price: 54.95},
    {name: 'Hat', image: '/images/hat.jpg', category: categories[6], price: 14.95},
    {name: 'Sunglasses', image: '/images/sunglasses.jpg', category: categories[6], price: 49.95}
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