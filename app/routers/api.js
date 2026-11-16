import express from "express";

import * as Events from "../controllers/eventsController.js";
import * as joinEvent from "../controllers/joinedEventsControllers.js";
import * as Subscription from "../controllers/SubscriptionController.js";
import authVerify from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all events -done
router.get("/events", Events.getEvents);

// Get event details-done
router.get("/events/:id", Events.getEventDetails);

// =================================
// PROTECTED ROUTES (JWT REQUIRED)
// =================================

// Get events created by logged-in user
router.get("/events/user/:creatorID", authVerify, Events.getEventsByUser);

// Create event - done
router.post("/events", authVerify, Events.createEvents);

// Delete event (owner only)
router.delete("/events/:id", authVerify, Events.deleteEvent);

// Update event (owner only)
router.patch("/events/:id", authVerify, Events.updateEventDetails);

// Join event
router.post("/events/join/:eventId", authVerify, joinEvent.joinEvent);

// Get events joined by logged-in user
router.get(
  "/events/participations/:joinUserID",
  authVerify,
  joinEvent.getUserJoinedEvents,
);

// Leave Joint event
router.delete("/events/participantuser/:id", authVerify, joinEvent.leaveEvent);

// subscription
router.post("/subscription", Subscription.subscriber);
export default router;
