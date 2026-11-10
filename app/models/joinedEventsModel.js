import mongoose from "mongoose";

const joinedEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const JointEvents = mongoose.model("participationEvent", joinedEventSchema);

export default JointEvents;
