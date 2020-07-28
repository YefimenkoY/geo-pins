import { format } from "date-fns"

export function intervalDuration(date: number): string {
	return format(new Date(date), "dd MMM, yyyy")
}
