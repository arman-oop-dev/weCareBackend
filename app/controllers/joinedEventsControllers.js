import JoinedEvent from "../models/joinedEventsModel.js";

// POST /events/:id/join	Join event (block duplicate joins)	JWT
export const joinEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const joinUserID = req.user.id;
    const {
      creatorID,
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    } = req.body;

    const data = await JoinedEvent.create({
      eventId,
      joinUserID,
      creatorID,
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    });

    return res.status(201).json({
      status: "Success",
      message: "Thank you for registration",
      data,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "Failed",
        message: "You have already joined this event",
      });
    }

    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

// All events joined by a user -users/:userId/joined-events
export const getUserJoinedEvents = async (req, res) => {
  try {
    const { joinUserID } = req.params;
    if (joinUserID !== req.user.id) {
      return res.status(403).json({ status: "error", message: "Forbidden" });
    }

    const data = await JoinedEvent.find({ joinUserID }).sort({ createdAt: -1 });
    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.error("getEventsByUser failed:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Leave an event - /events/participantuser/:id
import mongoose from "mongoose";
export const leaveEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const joinUserID = req.user?.id;

    if (!joinUserID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid participation id" });
    }

    if (!mongoose.Types.ObjectId.isValid(joinUserID)) {
      console.error("req.user.id is not an ObjectId:", req.user);
      return res.status(400).json({ message: "Invalid user id format" });
    }

    const data = await JoinedEvent.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      joinUserID: new mongoose.Types.ObjectId(joinUserID),
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Event not found or you don't have permission" });
    }

    return res.status(200).json({
      success: true,
      message: "Left event successfully",
      data,
    });
  } catch (err) {
    console.error("leaveEvent error:", err);
    // temporary, remove in production
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
