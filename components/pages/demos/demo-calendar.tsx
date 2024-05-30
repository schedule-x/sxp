import {
  CalendarApp,
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { githubDarkInit, githubLightInit } from '@uiw/codemirror-theme-github'
import HeadingWithIcon from '../../partials/heading-with-icon/heading-with-icon'
import styles from '../demo.module.scss'
import { useTheme } from 'nextra-theme-docs'
import { createEventsServicePlugin } from "@schedule-x/event-recurrence";
import { createInteractiveEventModal } from "@sx-premium/interactive-event-modal";
import { createSidebarPlugin } from "@sx-premium/sidebar";
import { calendars } from "./calendars";
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";

export default function CalendarDemoPage() {

  const { resolvedTheme } = useTheme()

  const [cal, setCal] = useState<CalendarApp|null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const calendarEl = document.getElementById('calendar') as HTMLElement

    const eventsService = createEventsServicePlugin()

    const interactiveEventModalPlugin = createInteractiveEventModal({
      eventsService,
      onAddEvent: (event) => {
        console.log(event)
      }
    });
    const calendar = createCalendar({
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
    calendar.render(calendarEl)
    setCal(calendar)
  }, [])

  useEffect(() => {
    if (!cal) return

    cal.setTheme(resolvedTheme === 'dark' ? 'dark' : 'light')
  }, [resolvedTheme])

  return (
    <div className={['page-wrapper', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Calendar demo'} />

      <div id="calendar" className="calendar-wrapper" />

      <h2 className={styles.demoSubheading}>Code</h2>

      <p className={styles.calendarDemoText}>
        The demo above is based on the code below.
      </p>

      <CodeMirror
        className={styles.calendarDemoCode}
        value={''}
        height="800px"
        extensions={[javascript({ jsx: true })]}
        onChange={() => null}
        theme={resolvedTheme === 'dark' ? githubDarkInit() : githubLightInit()}
      />
    </div>
  )
}
