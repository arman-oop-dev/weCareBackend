import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const SubscriptionModel = mongoose.model("subscribedUser", SubscriptionSchema);

export default SubscriptionModel;
