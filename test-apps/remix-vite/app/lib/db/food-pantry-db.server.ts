	import { initializeFirestoreFoodPantryDb } from "food-pantry-db";
import { getServerEnv } from "../env-variables.server";

const serverVariables =  getServerEnv();

	const { foodPantryDb } = initializeFirestoreFoodPantryDb({
		FIREBASE_APP_NAME: "food-pantry-db",
		SERVICE_ACCOUNT: serverVariables.SERVICE_ACCOUNT,
		collectionPaths: {
			applications: "applications",
			events: "events",
			registrations: "registrations",
			reservations: "reservations",
			users: "users",
		}
	})


	export const db = foodPantryDb;
