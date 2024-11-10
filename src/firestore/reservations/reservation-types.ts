import type { Timestamp } from "firebase-admin/firestore"
import type { PrimaryContact } from "../common-types"

export interface ReservationAppModel {
	id: string
	userId: string
	createdDate: Date
	updatedDate: Date
	eventId: string
	status: "pending" | "approved" | "declined" | "waitlist"
	time: number
	confirm: string
	primaryContact: PrimaryContact
}

export interface ReservationDbModel {
	id: string
	createdTimestamp: Timestamp
	updatedTimestamp: Timestamp
	eventId: string
	status: "pending" | "approved" | "declined" | "waitlist"
	confirm: string
	userId: string
	primaryContact: PrimaryContact
	time: number
}

export interface CreateReservation {
	id: string
	eventId: string
	userId: string
	time: number
	primaryContact: PrimaryContact
}
