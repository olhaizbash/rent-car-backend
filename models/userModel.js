const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    firstName: {
      type: String,
      // required: true,
      default: "",
    },
    lastName: {
      type: String,
      // required: true,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatarURL: {
      type: String,
    },
    favorites: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          // required: true,
        },
      },
    ],
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

const User = model("User", userSchema);
userSchema.post("save", handleMongooseError);
module.exports = User;
