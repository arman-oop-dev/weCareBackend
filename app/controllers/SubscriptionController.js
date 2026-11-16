import SubscriptionModel from "../models/SubscriptionModel.js";

export const subscriber = async (req, res) => {
  try {
    const email = req.body?.email?.trim();

    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Email is required.",
      });
    }

    await SubscriptionModel.create({ email });

    return res.status(201).json({
      status: "success",
      message: "Thank you for subscribing!",
    });
  } catch (error) {
    // Duplicate email (unique index)
    if (error.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "This email is already subscribed.",
      });
    }

    // Schema validation error (e.g. invalid email format)
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)[0]?.message;
      return res.status(400).json({
        status: "fail",
        message: message || "Invalid data.",
      });
    }

    console.error("Subscription error:", error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
  }
};
