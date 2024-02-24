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
      count: Number,
    },
  ],
});

const Basket = model("Basket", basketSchema);
export default Basket;