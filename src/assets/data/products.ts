// all images imported from images directory
import product_01_image_01 from "../images/product_01.webp";
import product_01_image_02 from "../images/product_01.1.webp";
import product_01_image_03 from "../images/product_01.3.webp";

import product_02_image_01 from "../images/product_2.1.webp";
import product_02_image_02 from "../images/product_2.2.webp";
import product_02_image_03 from "../images/product_2.3.webp";

import product_03_image_01 from "../images/product_3.1.webp";
import product_03_image_02 from "../images/product_3.2.webp";
import product_03_image_03 from "../images/product_3.3.webp";

import product_04_image_01 from "../images/product_4.1.webp";
import product_04_image_02 from "../images/product_4.2.webp";
import product_04_image_03 from "../images/product_4.3.webp";

import product_05_image_01 from "../images/product_04.webp";
import product_05_image_02 from "../images/product_08.webp";
import product_05_image_03 from "../images/product_09.webp";

import product_06_image_01 from "../images/bread(1).png";
import product_06_image_02 from "../images/bread(2).png";
import product_06_image_03 from "../images/bread(3).png";

export interface Product {
  id: string;
  title: string;
  price: number;
  image01: string;
  image02: string;
  image03: string;
  category: string;
  quantity: number;
  desc: string;
}

const products: Product[] = [
  {
    id: "01",
    title: "Chicken Burger",
    price: 24,
    image01: product_01_image_01,
    image02: product_01_image_02,
    image03: product_01_image_03,
    category: "Burger",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
  },

  {
    id: "02",
    title: "Vegetarian Pizza",
    price: 115,
    image01: product_02_image_01,
    image02: product_02_image_02,
    image03: product_02_image_03,
    category: "Pizza",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "03",
    title: "Double Cheese Margherita",
    price: 110,
    image01: product_03_image_01,
    image02: product_03_image_02,
    image03: product_03_image_03,
    category: "Pizza",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "04",
    title: "Maxican Green Wave",
    price: 110,
    image01: product_04_image_01,
    image02: product_04_image_02,
    image03: product_04_image_03,
    category: "Pizza",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "05",
    title: "Cheese Burger",
    price: 24,
    image01: product_05_image_01,
    image02: product_05_image_02,
    image03: product_05_image_03,
    category: "Burger",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },
  {
    id: "06",
    title: "Royal Cheese Burger",
    price: 24,
    image01: product_01_image_01,
    image02: product_01_image_02,
    image03: product_01_image_03,
    category: "Burger",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "07",
    title: "Seafood Pizza",
    price: 115,
    image01: product_02_image_02,
    image02: product_02_image_01,
    image03: product_02_image_03,
    category: "Pizza",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "08",
    title: "Thin Cheese Pizza",
    price: 110,
    image01: product_03_image_02,
    image02: product_03_image_01,
    image03: product_03_image_03,
    category: "Pizza",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "09",
    title: "Pizza With Mushroom",
    price: 110,
    image01: product_04_image_02,
    image02: product_04_image_01,
    image03: product_04_image_03,
    category: "Pizza",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "10",
    title: "Classic Hamburger",
    price: 24,
    image01: product_05_image_02,
    image02: product_05_image_01,
    image03: product_05_image_03,
    category: "Burger",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "11",
    title: "Crunchy Bread ",
    price: 35,
    image01: product_06_image_01,
    image02: product_06_image_02,
    image03: product_06_image_03,
    category: "Bread",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "12",
    title: "Delicious Bread ",
    price: 35,
    image01: product_06_image_02,
    image02: product_06_image_01,
    image03: product_06_image_03,
    category: "Bread",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "13",
    title: "Loaf Bread ",
    price: 35,
    image01: product_06_image_03,
    image02: product_06_image_02,
    image03: product_06_image_03,
    category: "Bread",
    quantity: 1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },
];

export default products;
