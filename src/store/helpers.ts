import { ActivityDate } from "@/interfaces/activity";
import { weekdays } from "./store";

const formatObj = new Intl.DateTimeFormat().formatToParts(new Date());
    
const dateFormat = formatObj.map(obj => {
    switch (obj.type) {
        case "day":
            return "DD";
        case "month":
            return "MM";
        case "year":
            return "YYYY";
        default:
            return obj.value;
    }
}).join("");

export function prettyDate(date: ActivityDate): string {
    if(date.time == 0) return "Unknown";
    return dateFormat.replace("DD", String(date.d)).replace("MM", (date.m >= 10 ? String(date.m) : '0'+String(date.m) )).replace("YYYY", String(date.y));
}

export function newActivityDate(timestamp: number): ActivityDate {
    const dateObject = new Date(timestamp);

    return {
        d: dateObject.getDate(),
        m: dateObject.getMonth() + 1,
        y: dateObject.getFullYear(),
        weekday: weekdays[dateObject.getDay()],
        time: dateObject.getTime()
    }
}

export function findAddedDate(raws: any): string {
    const plan = raws.find((act: any) => act.status.startsWith("plans"));
    if(!plan) return "Unknown";
    else {
        const timestamp = new Date(plan.createdAt * 1000);

        const activityDateObject: ActivityDate = {
            d: timestamp.getDate(),
            m: timestamp.getMonth() + 1, // converts to human-readable format (January as 1, not 0)
            y: timestamp.getFullYear(),
            weekday: weekdays[timestamp.getDay()],
            time: timestamp.getTime()
        }
        return (plan ? prettyDate(activityDateObject) : 'Unknown')
    }
}

// you can access DOM from here so why not?
export function toggleTheme(): void {
    if(document.body.classList.contains('site-theme-light')) {
        document.body.classList.remove('site-theme-light');
        window.localStorage.setItem('theme', 'dark');
        // Modify localstorage
    } else {
        document.body.classList.add('site-theme-light')
        // Modify localstore
        window.localStorage.setItem('theme', 'light');
    }
}