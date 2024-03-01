const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const basketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Pending", "In transit", "Fulfilled"],
      default: "Placed",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Basket = model("Basket", basketSchema);
basketSchema.post("save", handleMongooseError);
module.exports = Basket;
