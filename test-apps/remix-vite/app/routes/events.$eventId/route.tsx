import {  json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/lib/db/food-pantry-db.server";



export const loader = async (args: LoaderFunctionArgs) => {
	const eventId = args.params.eventId as string;

	const eventDoc = await db.events.read({eventId});
  return json( {eventDoc});
};



export default function EventsPage() {
	const {eventDoc} = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>Event Details</h1>
			<pre>{JSON.stringify(eventDoc, null, 2)}</pre>
		</div>
	)
}