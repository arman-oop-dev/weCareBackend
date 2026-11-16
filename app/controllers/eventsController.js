import mongoose from "mongoose";
import EventModel from "../models/eventsModel.js";

// POST /events - Create event (store the creator’s email) - JWT

export const createEvents = async (req, res) => {
  try {
    const {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      creatorID,
      creatorEmail,
      creatorName,
    } = req.body || {};

    const data = await EventModel.create({
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      creatorID,
      creatorEmail,
      creatorName,
    });

    return res.status(201).json({
      status: "Success",
      message: "Event created successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

// GET /events/:id Event details page - public - done
export const getEvents = async (req, res) => {
  try {
    const data = await EventModel.find({}, { updatedAt: 0, createdAt: 0 });
    if (data === null) {
      return res.status(200).json({
        status: "Success",
        message: "There is no data to show.",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: data,
    });
  } catch {
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong, try again",
    });
  }
};

// GET /api/events/:id – Get individual event details. - public - done
export const getEventDetails = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({
        status: "fail",
        message: "Something went wrong, please try again",
      });
    }
    const data = await EventModel.findById(
      { _id: id },
      { updatedAt: 0, createdAt: 0 },
    );
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again",
    });
  }
};

// GET /api/events/user/:userID – Get events created by the logged-in user.
export const getEventsByUser = async (req, res) => {
  try {
    const { creatorID } = req.params;

    if (creatorID !== req.user.id) {
      return res.status(403).json({ status: "error", message: "Forbidden" });
    }

    const data = await EventModel.find({ creatorID }).sort({ createdAt: -1 });

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.error("getEventsByUser failed:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// DELETE /api/events/:id – Delete an event owned by the user. -jwt
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }

    const data = await EventModel.findOneAndDelete({
      _id: id,
      creatorID: userID,
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Event not found or you don't have permission" });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted",
    });
  } catch (err) {
    console.error("deleteEvent error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PATCH /events/:id	Update event (owner only)	JWT
export const updateEventDetails = async (req, res) => {
  try {
    const { title, description, eventType, location, eventDate } =
      req.body || {};

    const { id } = req.params;
    const userID = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }

    const data = await EventModel.findOneAndUpdate(
      {
        _id: id,
        creatorID: userID,
      },
      { $set: { title, description, eventType, location, eventDate } },
      { new: true, runValidators: true },
    );

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found or you are not allowed to edit it",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Updated successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
