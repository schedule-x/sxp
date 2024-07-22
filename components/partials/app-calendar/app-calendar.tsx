/* eslint-disable max-lines */
import { viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import {useEffect, useState} from 'react'
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
    fields: {
      title: {
        validator: (value) => {
          return {
            message: 'Title is required',
            isValid: !!value
          }
        },
      },
      startTime: {},
      startDate: {},
      endDate: {},
      endTime: {},
      rruleFrequency: {},
      rruleUntil: {},
      people: {
        validator: (value) => {
          return {
            message: 'Choose at least one person',
            isValid: !!(value && value.length)
          }
        },
      },
      calendarId: {
        validator: (value) => {
          return {
            message: 'Choose a calendar',
            isValid: !!value
          }
        }
      }
    },
    availablePeople: [
      'Ted Mosby',
      'Robin Scherbatsky',
      'Barney Stinson',
      'Lily Aldrin',
      'Marshall Eriksen'
    ],
    onAddEvent: (event) => {
      console.log(event)
    },
    onDeleteEvent: (eventId) => {
      console.log(eventId)
    }
  });

  const calendarApp = useNextCalendarApp({
    callbacks: {
      onDoubleClickDateTime: (dateTime: string) => {
        interactiveEventModalPlugin.clickToCreate(dateTime, { calendarId: 'leisure' })
      },

      onDoubleClickDate: (date: string) => {
        interactiveEventModalPlugin.clickToCreate(date, { calendarId: 'leisure' })
      }
    },
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    selectedDate: '2024-05-06',
    isDark: resolvedTheme === 'dark',
    defaultView: viewWeek.name,
    events: [
      {
        id: 1,
        title: 'Weekly event',
        start: '2024-05-11 10:00',
        end: '2024-05-11 12:00',
        calendarId: 'personal',
        people: ['Ted Mosby', 'Barney Stinson'],
        rrule: 'FREQ=WEEKLY;UNTIL=20240701T235959'
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
      eventsService,
      interactiveEventModalPlugin,
      createSidebarPlugin({
        eventsService,
        openOnRender: false,
        activeCalendarIds: ['personal', 'leisure', 'work'] },
      )
    ],
  })

  useEffect(() => {
    if (calendarApp) {
      calendarApp.setTheme(getTheme(resolvedTheme))
    }
  }, [resolvedTheme])

  const [tipClasses, setTipClasses] = useState(['calendar-tip'])

  function createTipWhenHoveringCalendar(calendarEl: Element) {
    calendarEl?.addEventListener('mouseenter', (e) => {
      setTimeout(() => {
        setTipClasses([...tipClasses, 'is-open'])
      }, 1000)
    })
  }

  useEffect(() => {
    let calendarEl = document.querySelector('.sx__calendar');

    if (!calendarEl) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            calendarEl = document.querySelector('.sx__calendar');
            if (calendarEl) createTipWhenHoveringCalendar(calendarEl);
          }
        })
      })
      observer.observe(document.body, { childList: true, subtree: true });
    }

    createTipWhenHoveringCalendar(calendarEl);
  }, []);

  return <>
    <div className={'appCalendarWrapper'}>
      <div className={tipClasses.join(' ')}>
        <span className={'lampEmoji'}>💡</span> Double click somewhere in the grid to create an event
        <button className={'tipClose'} onClick={() => {
          document.querySelector('.calendar-tip')?.remove()
        }}>✕</button>
      </div>

      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  </>
}
