// calendar.js - Zoho Calendar UI Logic

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let currentDate = new Date(2026, 2, 29); // Start of week: Sun Mar 29, 2026
let currentView = 'week';

// Sample events data
let events = [
{ id: 1, title: 'Palm Sunday', date: new Date(2026,2,29), allDay: true, color: '#e8f4ff', textColor: '#1a73e8', type: 'holiday' },
{ id: 2, title: 'India: Maharashtra Day', date: new Date(2026,2,31), allDay: true, color: '#f0f0f0', textColor: '#555', type: 'holiday' },
{ id: 3, title: 'Hanuman Jayanti', date: new Date(2026,3,2), allDay: true, color: '#f0f0f0', textColor: '#555', type: 'holiday' },
{ id: 4, title: 'New event', date: new Date(2026,2,31), startHour: 15, endHour: 16, color: '#ffcccc', textColor: '#cc0000' },
{ id: 5, title: 'KKKK', date: new Date(2026,2,31), startHour: 18, endHour: 19, color: '#b0e0b0', textColor: '#006600' },
{ id: 6, title: 'India: Good Friday', date: new Date(2026,3,3), allDay: true, color: '#f0f0f0', textColor: '#555', type: 'holiday' },
{ id: 7, title: 'Good Friday', date: new Date(2026,3,3), allDay: true, color: '#f0f0f0', textColor: '#555', type: 'holiday' },
{ id: 8, title: 'Australia: Easter', date: new Date(2026,3,4), allDay: true, color: '#f0f0f0', textColor: '#555', type: 'holiday' }
];

document.addEventListener('DOMContentLoaded', () => {
  renderMiniCalendar();
  renderWeekView();
  setupEvents();
});

function setupEvents() {
  document.getElementById('todayBtn')?.addEventListener('click', goToToday);
  document.getElementById('prevBtn')?.addEventListener('click', () => navigate(-1));
  document.getElementById('nextBtn')?.addEventListener('click', () => navigate(1));
  document.getElementById('newEventBtn')?.addEventListener('click', openEventModal);
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
      currentView = this.dataset.view;
      renderWeekView();
});
});
  document.getElementById('miniPrev')?.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth()-1); renderMiniCalendar(); });
  document.getElementById('miniNext')?.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth()+1); renderMiniCalendar(); });
}

function goToToday() {
  currentDate = new Date();
  renderMiniCalendar();
  renderWeekView();
}

function navigate(dir) {
  if (currentView === 'week') currentDate.setDate(currentDate.getDate() + dir * 7);
  else if (currentView === 'day') currentDate.setDate(currentDate.getDate() + dir);
  else currentDate.setMonth(currentDate.getMonth() + dir);
  renderMiniCalendar();
  renderWeekView();
}

function getWeekStart(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
      d.setHours(0,0,0,0);
  return d;
}

function renderWeekView() {
  const weekStart = getWeekStart(currentDate);
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);
  const today = new Date(); today.setHours(0,0,0,0);

  // Update date range label
  const label = document.getElementById('dateRangeLabel');
  if (label) {
    const sm = MONTHS[weekStart.getMonth()].substring(0,3);
    const em = MONTHS[weekEnd.getMonth()].substring(0,3);
    if (sm === em) label.textContent = sm + ' ' + weekStart.getDate() + ' - ' + weekEnd.getDate() + ', ' + weekStart.getFullYear();
    else label.textContent = sm + ' ' + weekStart.getDate() + ' - ' + em + ' ' + weekEnd.getDate() + ', ' + weekStart.getFullYear();
}

  // Render day headers
  const headerRow = document.getElementById('dayHeaderRow');
  if (headerRow) {
    headerRow.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart); d.setDate(d.getDate() + i);
      const isToday = d.getTime() === today.getTime();
      const div = document.createElement('div');
      div.className = 'day-header' + (isToday ? ' today' : '');
      div.innerHTML = '<div class="day-name">' + DAYS[d.getDay()] + '</div><div class="day-num">' + d.getDate() + '</div>';
      headerRow.appendChild(div);
    }
  }

  // Render time column
  const timeCol = document.getElementById('timeColumn');
  if (timeCol) {
    timeCol.innerHTML = '';
          for (let h = 0; h < 24; h++) {
      const div = document.createElement('div');
      div.className = 'time-slot-label';
      div.textContent = h === 0 ? '' : (h < 12 ? h + 'am' : h === 12 ? '12pm' : (h-12) + 'pm');
      timeCol.appendChild(div);
          }
  }

  // Render events grid
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;
  grid.innerHTML = '';
      for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart); d.setDate(d.getDate() + i);
    const col = document.createElement('div');
    col.className = 'day-column';
    col.dataset.date = d.toISOString().split('T')[0];

    // Add hour lines
    for (let h = 0; h < 24; h++) {
      const line = document.createElement('div');
      line.className = 'hour-line';
      col.appendChild(line);
    }

    // Add click handler for new event
    col.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('hour-line')) {
        const rect = this.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const hour = Math.floor(y / 60);
        openEventModalWithDate(d, hour);
            }
    });

    // Add timed events
    const dayEvents = events.filter(ev => !ev.allDay && isSameDay(ev.date, d));
    dayEvents.forEach(ev => {
      const block = document.createElement('div');
      block.className = 'event-block';
      block.style.cssText = 'top:' + (ev.startHour*60) + 'px;height:' + ((ev.endHour - ev.startHour)*60 - 2) + 'px;background:' + ev.color + ';color:' + ev.textColor + ';border-left:3px solid ' + ev.textColor;
      block.textContent = ev.title;
      block.addEventListener('click', e => { e.stopPropagation(); showEventPopup(ev); });
      col.appendChild(block);
});

    grid.appendChild(col);
}

  // Render all-day events in header
  renderAllDayEvents(weekStart);
}

function renderAllDayEvents(weekStart) {
  const headerRow = document.getElementById('dayHeaderRow');
  if (!headerRow) return;
  const headers = headerRow.querySelectorAll('.day-header');
  headers.forEach((header, i) => {
    const d = new Date(weekStart); d.setDate(d.getDate() + i);
    const allDayEvs = events.filter(ev => ev.allDay && isSameDay(ev.date, d));
    allDayEvs.forEach(ev => {
      const div = document.createElement('div');
      div.className = 'all-day-event';
      div.style.cssText = 'background:' + ev.color + ';color:' + ev.textColor;
      div.innerHTML = (ev.type === 'holiday' ? '<span>&#128100;</span>' : '') + ev.title;
      div.addEventListener('click', () => showEventPopup(ev));
      header.appendChild(div);
});
});
}

function renderMiniCalendar() {
  const monthYear = document.getElementById('miniMonthYear');
  const datesContainer = document.getElementById('miniDates');
  if (!monthYear || !datesContainer) return;

  const today = new Date(); today.setHours(0,0,0,0);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = MONTHS[month].substring(0,3) + ' ' + year;
  datesContainer.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Fill previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const span = document.createElement('span');
    span.className = 'mini-date other-month';
    span.textContent = daysInPrevMonth - i;
    datesContainer.appendChild(span);
}

  // Fill current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const span = document.createElement('span');
    span.className = 'mini-date' + (date.getTime() === today.getTime() ? ' today' : '');
    span.textContent = d;
    span.addEventListener('click', () => { currentDate = new Date(year, month, d); renderWeekView(); });
    datesContainer.appendChild(span);
}

  // Fill next month
  const total = datesContainer.children.length;
  const remaining = 42 - total;
  for (let d = 1; d <= remaining; d++) {
    const span = document.createElement('span');
    span.className = 'mini-date other-month';
    span.textContent = d;
    datesContainer.appendChild(span);
}
}

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function openEventModal() {
  document.getElementById('eventModal').style.display = 'block';
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('eventDateTime').value = now.getFullYear() + '-' + pad(now.getMonth()+1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':00';
}

function openEventModalWithDate(date, hour) {
  document.getElementById('eventModal').style.display = 'block';
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('eventDateTime').value = date.getFullYear() + '-' + pad(date.getMonth()+1) + '-' + pad(date.getDate()) + 'T' + pad(hour) + ':00';
}

function closeEventModal() {
  document.getElementById('eventModal').style.display = 'none';
  document.getElementById('eventTitle').value = '';
  document.getElementById('eventDescription').value = '';
}

function saveEvent() {
  const title = document.getElementById('eventTitle').value;
  const dateTimeStr = document.getElementById('eventDateTime').value;
  if (!title || !dateTimeStr) { alert('Please fill Event Title and Date/Time.'); return; }
  const dt = new Date(dateTimeStr);
  const newEvent = {
    id: Date.now(), title, date: dt, startHour: dt.getHours(), endHour: dt.getHours() + 1,
    color: '#e8f4ff', textColor: '#1a73e8', allDay: false
};
  events.push(newEvent);
  closeEventModal();
  renderWeekView();
}

function showEventPopup(ev) {
  alert('Event: ' + ev.title + '\nDate: ' + ev.date.toLocaleDateString());
}
