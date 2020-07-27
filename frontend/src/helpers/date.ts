import { intervalToDuration, toDate } from "date-fns"
import { pick, entries } from "lodash"

type DatesArr = [string, number]

export function intervalDuration(from: number, to?: number): string {
	const interval = intervalToDuration({
		start: new Date(+toDate(from)),
		end: new Date(to || new Date()),
	})
	const res = entries(pick(interval, ["days", "hours", "minutes"]))
		.filter(([_, val]: any) => !!val)
		.map(([key, val]: any) => `${val} ${key}`)
		.join(", ")
	return res ? `${res} ago` : "just now"
}
