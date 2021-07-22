import { ActivityDate, ActivityMedia } from '@/interfaces/activity';
import { fetchList } from './api';
import store, { weekdays } from './store';

export async function fetchMediaList(type: string): Promise<ActivityMedia[]> {
    const r = await fetchList(store.state.userData.id, type)
    const list = r.data.MediaListCollection.lists;
    // Merge all lists into one, remove custom lists
    const formatted = list.filter((x: any) => !x.isCustomList).map((x: any) => x.entries).flat(1);

    const final: ActivityMedia[] = formatted.map((x: any): ActivityMedia[] => ({
        ...x.media,
        title: x.media.title.romaji,
        status: x.status,
        progress: x.progress,
        started: mapDates(x.startedAt),
        completed: mapDates(x.completedAt),
        added: x.createdAt,
    })) 
    .sort((a: ActivityMedia, b: ActivityMedia) => a.title.localeCompare(b.title)); // Sort alphabetically

    return final;
}

function mapDates(y: any): ActivityDate {
    if(y.day == null) {
        return {
            d: 0,
            m: 0,
            y: 0,
            time: 0
        }
    }

    const date = new Date(y.year, y.month, y.day);

    return {
        d: y.day,
        m: y.month,
        y: y.year,
        weekday: weekdays[date.getDay()],
        time: date.getTime()
    }
}