import '@schedule-x/theme-default/dist/index.css'
import { viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import { useEffect } from 'react'
import { useTheme } from 'nextra-theme-docs'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'
import { calendars } from "../../pages/demos/calendars";
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createSidebarPlugin } from "@sx-premium/sidebar";
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createInteractiveEventModal } from "@sx-premium/interactive-event-modal";

const getTheme = (resolvedTheme: string) => resolvedTheme === 'dark' ? 'dark' : 'light'

export default function AppCalendar() {
  const { resolvedTheme } = useTheme()

  const eventsService = createEventsServicePlugin()

  const interactiveEventModalPlugin = createInteractiveEventModal({
    eventsService,
    onAddEvent: (event) => {
      console.log(event)
    },
    onDeleteEvent: (eventId) => {
      console.log(eventId)
    }
  });

  const calendarApp = useNextCalendarApp({
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    selectedDate: '2024-05-06',
    isDark: resolvedTheme === 'dark',
    defaultView: viewWeek.name,
    events: [
      {
        id: 1,
        title: 'Event 1',
        start: '2024-05-11 10:00',
        end: '2024-05-11 12:00',
        calendarId: 'personal',
      },
      {
        id: 2,
        title: 'Event 2',
        start: '2024-05-11 14:00',
        end: '2024-05-11 16:00',
        calendarId: 'personal',
      },
      {
        id: 3,
        title: 'Event 3',
        start: '2024-05-11 08:00',
        end: '2024-05-11 09:00',
        calendarId: 'work',
      },
      {
        id: 4,
        title: 'Event 4',
        start: '2024-05-11 10:00',
        end: '2024-05-11 11:00',
        calendarId: 'work',
      },
      {
        id: 5,
        title: 'Event 5',
        start: '2024-05-06 07:00',
        end: '2024-05-06 09:10',
        calendarId: 'leisure',
      },
      {
        id: 6,
        title: 'Event 6',
        start: '2024-05-07',
        end: '2024-05-07',
        calendarId: 'leisure',
      }
    ],
    calendars: calendars,
    plugins: [
      createDragAndDropPlugin(),
      createScrollControllerPlugin({ initialScroll: '05:50' }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      eventsService,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      interactiveEventModalPlugin,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      createSidebarPlugin({
        eventsService,
        activeCalendarIds: ['personal', 'leisure', 'work'] }
      )
    ],
  })

  useEffect(() => {
    if (calendarApp) {
      calendarApp.setTheme(getTheme(resolvedTheme))
    }
  }, [resolvedTheme])

  return <>
    <ScheduleXCalendar calendarApp={calendarApp} />
  </>
}
