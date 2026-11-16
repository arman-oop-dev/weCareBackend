import mongoose from "mongoose";

const joinedEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    joinUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
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
  },
  { timestamps: true, versionKey: false },
);

joinedEventSchema.index({ eventId: 1, userID: 1 }, { unique: true });

const JointEvents = mongoose.model("participationEvent", joinedEventSchema);

export default JointEvents;
