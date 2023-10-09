import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js'; // import the model
import Product from './models/productModel.js'; // import the model
import Order from './models/orderModel.js'; // import the model
import connectDB from './config/db.js'; // import the database connection

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany(); // delete all the orders
    await Product.deleteMany(); // delete all the products
    await User.deleteMany(); // delete all the users

    const createdUsers = await User.insertMany(users); // insert all the users into the database
    const adminUser = createdUsers[0]._id; // get the admin user id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // return all the products with the admin user id
    });

    await Product.insertMany(sampleProducts); // insert all the products into the database

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany(); // delete all the orders
    await Product.deleteMany(); // delete all the products
    await User.deleteMany(); // delete all the users

    console.log('Data Destroyed!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') { // if the command line argument is -d
  destroyData();
} else {
  importData();
}