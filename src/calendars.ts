import { ICalCalendar } from 'ical-generator';
import { getReleases } from './github.js';

// TODO: If you want to actually use this, we'll need to persistence that doesn't just keep existing data in memory
const calendars: Record<string, ICalCalendar> = {};

/**
 * Return the latest version of a calendar object
 */
export function getCalendar(owner: string, repo: string) {
  const calendarName = `${owner}/${repo}`;
  if (!calendars[calendarName]) {
    calendars[calendarName] = new ICalCalendar({ name: calendarName });
  }

  return calendars[calendarName];
}

/**
 * Update the data for a calendar
 */
export async function updateCalendar(owner: string, repo: string) {
  const calendar = getCalendar(owner, repo);

  calendar.clear();

  const releases = await getReleases(owner, repo);

  for (const release of releases) {
    const start = new Date(release.created_at);
    const end = new Date(start.getTime() + 1000 * 60 * 15);

    calendar.createEvent({
      id: release.tag_name,
      summary: `🚀 ${owner}/${repo} ${release.tag_name}`,
      description: `https://github.com/${owner}/${repo}/releases/tag/${release.tag_name}\n\n${release.body}`,
      start,
      end,
    });
  }
}
