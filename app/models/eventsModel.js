import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    description: { type: String, required: true, trim: true, minlength: 20 },
    eventType: {
      type: String,
      required: true,
      enum: [
        "Cleanup",
        "Plantation",
        "Donation",
        "Blood Donation",
        "Education",
        "Health Camp",
        "Other",
      ],
    },
    thumbnail: { type: String, required: true, trim: true }, // image URL
    location: { type: String, required: true, trim: true },
    eventDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value > new Date(),
        message: "Event date must be in the future",
      },
    },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    creatorEmail: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    creatorName: { type: String, trim: true }, // optional, handy for the details page
  },
  { timestamps: true, versionKey: false },
);

const Events = mongoose.model("events", eventSchema);
export default Events;
