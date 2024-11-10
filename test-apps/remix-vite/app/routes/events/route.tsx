import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { mutations } from "./mutations.server";



export const action = async (args: ActionFunctionArgs) => {
	const formData = await args.request.formData();
  return mutations.createEvent({formData});
};





export default function EventsPage() {


	return (
		<div>
			<h1>Events</h1>
			<Form method="post">
				<button type="submit">Create Event</button>
			</Form>
		</div>
	)
}