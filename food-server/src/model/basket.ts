import { Schema, model } from "mongoose";

const basketSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  foods: [
    {
      food: {
        type: Schema.ObjectId,
        ref: "Food",
      },
      count:{type: Number, default:1},
    },
  ],
  totalPrice: Number
});

const Basket = model("Basket", basketSchema);
export default Basket;