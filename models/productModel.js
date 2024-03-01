const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const productSchema = new Schema(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
productSchema.post("save", handleMongooseError);
module.exports = Product;
