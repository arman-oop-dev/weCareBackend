import express from "express";

import * as Events from "../controllers/eventsController.js";
import * as joinEvent from "../controllers/joinedEventsControllers.js";

const router = express.Router();

// POST /events - Create event (store the creator’s email) - JWT
router.post("/events", Events.createEvents);

// GET /events/:id Event details page - public
router.get("/events", Events.getEvents);

// GET /api/events/:id – Get individual event details. - public
router.get("/events/:id", Events.getEventDetails);

//  GET /events/user/:userID - Manage Events: events created by the logged-in user - JWT
router.get("/events/user/:creatorID", Events.getEventsByUser);

//  PATCH /events/:id	Update event (owner only)	JWT
router.patch("/events/:id", Events.updateEventDetails);

// DELETE /api/events/:id – Delete an event owned by the user.
router.delete("/events/:id", Events.deleteEvent);

// POST /events/:id/join	Join event (block duplicate joins)	JWT
router.post("/eventId", joinEvent.joinEvent);

// All users who joined an event /events/:eventId/participants
router.get("/events/participants/:eventId", joinEvent.getEventParticipants);

// All events joined by a user -users/:userId/joined-events
router.get("/events/participantuser/:userID", joinEvent.getUserJoinedEvents);

// Leave an event - /events/participantuser/:id
router.delete("/events/participantuser/:id", joinEvent.leaveEvent);

export default router;
