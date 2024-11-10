import { db } from "~/lib/db/food-pantry-db.server";
import { EventType, EventStage } from "food-pantry-db";
import { redirect } from "@remix-run/node";

const createEvent =async({formData}:{formData:FormData}) => {

	const eventData = {
		name: "test event",
		type: "pickup" as EventType,
		stage: "planning" as EventStage,
		timeSlots:{
			1600: "4pm",
			1700: "5pm",
			1800: "6pm",
		},
		message: "test message",
		semesterId: "2023-2024",
		eventDate: new Date(),
	}
	const eventId = await db.events.create(eventData);

	return redirect(`/events/${eventId}`);
}


export const mutations = {createEvent};