import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, "Категорын нэрийг заавал оруулна."],
    unique: true,
    maxlength: [50, "Категорын нэрний урт 50 тэмдэгтээс хэтрэхгүй байна."],
  },
  description: {
    type: String,
    required: [true, "Категорын тайлбарыг заавал оруулна."],
  },
  image: {
    type: String,
    default: "no-category-photo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = model("Category", categorySchema);
export default Category;