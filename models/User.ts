import mongoose, { model, mongo, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// const userSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: String,
//   email: String,
//   password: String,
// });

const User = model("Users", userSchema);

export default User;

// product schema -  title - string, price - number, description - string, image - string, category - string and enum [clothing, beverages, shoes], stock - number
