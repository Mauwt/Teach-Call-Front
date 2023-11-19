export function getWeekDays(weekOffset: number) {
  const today = new Date();
  today.setDate(today.getDate() + weekOffset * 7);
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  const days = [monday];
  for (let i = 1; i < 6; i += 1) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    days.push(nextDay);
  }
  return days;
}

export function getWeekNumber(weekOffset: number = 0) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + weekOffset * 7);
  const oneJan = new Date(currentDate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (currentDate.getTime() - oneJan.getTime()) / 86400000
  );
  return Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
}

export function getDayName(day: number) {
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  return days[day];
}

export function formatHHatoHHmm(time: string) {
  const hours = time.split(' ')[0];
  return `${hours}:00`;
}

export function getDateFromWeekOffset(day: number, weekOffset: number) {
  const date = new Date();
  date.setDate(date.getDate() + weekOffset * 7);

  const dayOffset = day - date.getDay();
  date.setDate(date.getDate() + dayOffset);

  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return formattedDate;
}

export function getMonthFromMonthNumber(monthNumber: number) {
  const months = [
    ' Enero ',
    ' Febrero ',
    ' Marzo ',
    ' Abril ',
    ' Mayo ',
    ' Junio ',
    ' Julio ',
    ' Agosto ',
    ' Septiembre ',
    ' Octubre ',
    ' Noviembre ',
    ' Diciembre ',
  ];
  return months[monthNumber];
}

export function getExplicitStringDate(date: string) {
  const dayNumber = date.split('-')[2];
  const dayName = getDayName(new Date(date).getDay());
  const monthNumber = date.split('-')[1];
  const monthName = getMonthFromMonthNumber(parseInt(monthNumber, 10) - 1);
  return `${dayName} ${dayNumber} de ${monthName}`;
}
