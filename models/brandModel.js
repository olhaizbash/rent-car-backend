const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    founded: {
      type: Number,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Brand = model("Brand", brandSchema);
brandSchema.post("save", handleMongooseError);
module.exports = Brand;
