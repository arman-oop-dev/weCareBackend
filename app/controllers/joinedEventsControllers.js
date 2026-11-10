import JoinedEvent from "../models/joinedEventsModel.js";

// POST /events/:id/join	Join event (block duplicate joins)	JWT
export const joinEvent = async (req, res) => {
  const { eventId, userID } = req.body;

  try {
    const data = await JoinedEvent.create({ eventId, userID });
    if (!data) {
      return res.status(500).json({
        status: "fail",
        message: "Something is wrong",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Thank you for joining the events",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something is wrong" + err.message,
    });
  }
};

// All users who joined an event /events/:eventId/participants
export const getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;
    const data = await JoinedEvent.find({ eventId });

    return res.status(200).json({
      status: "success",
      totalParticipants: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

// All events joined by a user -users/:userId/joined-events
export const getUserJoinedEvents = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await JoinedEvent.find({ userID });

    return res.status(200).json({
      status: "success",
      totalParticipants: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

// Leave an event - /events/participantuser/:id
export const leaveEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await JoinedEvent.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};
