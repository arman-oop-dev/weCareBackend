import mongoose from "mongoose";
import EventModel from "../models/eventsModel.js";

// POST /events - Create event (store the creator’s email) - JWT
export const createEvents = async (req, res) => {
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

  try {
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
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

// GET /events/:id Event details page - public
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

// GET /api/events/:id – Get individual event details. - public
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
    const data = await EventModel.find({ creatorID: { $eq: creatorID } });

    if (data.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "You have empty event.",
      });
    }

    return res.status(200).json({
      status: "success",
      total: data.length,
      data: data,
    });
  } catch {
    return res.status(200).json({
      status: "fail",
      message: "Something is wrong",
    });
  }
};

// PATCH /events/:id	Update event (owner only)	JWT
export const updateEventDetails = async (req, res) => {
  const { title, description, eventType, thumbnail, location, eventDate } =
    req.body;

  const userID = req.body.creatorID;
  const { id } = req.params;

  try {
    const data = await EventModel.findOneAndUpdate(
      {
        _id: id,
        creatorID: userID,
      },
      {
        $set: {
          title,
          description,
          eventType,
          thumbnail,
          location,
          eventDate,
        },
      },
      { new: true, runValidators: true },
    );

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found or unauthorized user.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Event updated successfully.",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong.",
      error: err.message,
    });
  }
};

// DELETE /api/events/:id – Delete an event owned by the user. -jwt
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await EventModel.deleteOne({
      _id: id,
    });

    if (data.deletedCount === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found or unauthorized user.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Event deleted successfully.",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
