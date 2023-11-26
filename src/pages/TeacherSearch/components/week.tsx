import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import {
  getDayName,
  getWeekDays,
  getWeekNumber,
  getMonthFromMonthNumber,
} from '../../../utils/DateAndTimeUtils';
import AvailabilityApi from '../../../api/ProfessorAvailability';
import CourseList from './CourseList';
import BookingApi from '../../../api/Booking';

type WeekProps = {
  teacherId: number;
  showWeek?: boolean;
};

function daySlots(
  day: Date,
  teacherId: number,
  setDayInfo: (dayInfo: []) => void,
  setShowSlots?: (showSlots: boolean) => void,
  showSlots?: boolean
) {
  const weekNumber = getWeekNumber();
  const dayNumber = day.getDay() - 1;

  async function onClickDaySlot(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    document
      .getElementsByClassName('day-selected')[0]
      ?.classList.remove('day-selected');
    const element = event.currentTarget;
    const elementId = event.currentTarget.id;

    element.classList.add('day-selected');
    const weekNum: number = parseInt(elementId.split('-')[0], 10);
    const dayNum: number = parseInt(elementId.split('-')[1], 10);

    try {
      const response = await AvailabilityApi.getfreeTimeSlots(
        teacherId,
        weekNum - 1,
        dayNum
      );

      setDayInfo(response.data);

      if (setShowSlots) setShowSlots(true);

      const dayContainer = document.getElementById('day-container');

      if (dayContainer) {
        dayContainer.classList.remove('w-100');
        dayContainer.classList.add('w-50');
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        setDayInfo([]);
        setShowSlots?.(!showSlots);
        const dayContainer = document.getElementById('day-container');
        if (dayContainer) {
          dayContainer.classList.remove('w-50');
          dayContainer.classList.add('w-100');
        }
      }
    }
  }
  return (
    <div
      className={`day-slot col-12 col-sm-2 d-flex flex-column  h-100 align-items-center justify-content-center disabled ${
        dayNumber === 0 ? 'rounded-start-top' : ''
      } ${dayNumber === 5 ? 'rounded-end-top' : ''} `}
      id={`${weekNumber}-${dayNumber}`}
      key={`${weekNumber}-${dayNumber}`}
      data-weeek={weekNumber}
      data-day={dayNumber}
      role="button"
      tabIndex={0}
      onClick={onClickDaySlot}
    >
      <p className="day-name m-0 p-0">{getDayName(day.getDay() - 1)}</p>{' '}
      <p className="day-number m-0 p-0">{day.getDate()}</p>
    </div>
  );
}

async function setWeekDays(weekOffset: number, teacherId: number) {
  document
    .getElementsByClassName('day-selected')[0]
    ?.classList.remove('day-selected');

  document.getElementsByClassName('today')[0]?.classList.remove('today');

  const weekComponents = document.getElementsByClassName('week-component');
  const weekComponent = Array.from(weekComponents).find(
    (component) =>
      component.getAttribute('data-professor-id') !== `${teacherId}`
  );
  if (weekComponent) weekComponent.remove();

  const days = getWeekDays(weekOffset);
  const weekNumber = getWeekNumber(weekOffset);

  const week = document.getElementById(`week-${teacherId}`);
  if (week) week.classList.add('week-component');

  // seleccionar todos los slots hijos del componente week
  const slots = Array.from(week.querySelectorAll('.day-slot'));

  try {
    const response = await AvailabilityApi.getWeekAvailibilityById(
      teacherId,
      weekNumber - 1
    );

    const { availableDays } = response.data;

    const currentDayNumber = new Date().getDay();
    const currentWeekNumber = getWeekNumber();

    slots.forEach((slot, i) => {
      const day = days[i];
      const dayNumber = day.getDay();

      slot.classList.add('disabled');
      slot.classList.remove('available');

      slot.setAttribute('id', `${weekNumber}-${dayNumber}`);
      slot.setAttribute('key', `${weekNumber}-${dayNumber}`);
      slot.setAttribute('data-week', `${weekNumber}`);
      slot.setAttribute('data-day', `${dayNumber}`);
      const divDayNumber = slot.querySelector('.day-number');
      if (divDayNumber) divDayNumber.textContent = day.getDate().toString();
      if (availableDays.includes(dayNumber)) {
        slot.classList.add('available');
        slot.classList.remove('disabled');
      }

      if (weekNumber === currentWeekNumber && dayNumber === currentDayNumber) {
        slot.classList.add('today');
      }
    });
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 404) {
      slots.forEach((slot) => {
        slot.classList.add('disabled');
        slot.classList.remove('available');
      });
    }
  } finally {
    const todayNumber = new Date().getDay() - 1;
    const currentWeekNumber = getWeekNumber();
    const todaySlot = document.getElementById(
      `${currentWeekNumber}-${todayNumber}`
    );
    if (todaySlot) todaySlot.classList.add('today');
  }
}

export default function Week(prop: WeekProps) {
  const [dayInfo, setDayInfo] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showSlots, setShowSlots] = useState(false);
  const [firstDay, setFirstDay] = useState(0);
  const [firsDayMonth, setFirstDayMonth] = useState(0);
  const [lastDay, setLastDay] = useState(0);
  const [lastDayMonth, setLastDayMonth] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  const days = getWeekDays(weekOffset);

  const handlePrevWeek = () => {
    setWeekOffset(weekOffset - 1);
    setShowSlots(false);
  };

  const handleNextWeek = () => {
    setWeekOffset(weekOffset + 1);
    setShowSlots(false);
  };

  const handleSubmitBooking = async () => {
    try {
      const response = await BookingApi.addBooking(
        selectedCourseId,
        prop.teacherId,
        selectedSlotId
      );
      if (response.status === 200) {
        document.getElementById('courseModal').classList.remove('show');
      }
    } catch (error) {
      const modal = document.getElementById('courseModal');
      modal.appendChild(
        document.createTextNode(
          'No se pudo agendar la clase, intentalo más tarde'
        )
      );
    }
  };

  useEffect(() => {
    setWeekDays(weekOffset, prop.teacherId);
    setFirstDay(days[0].getDate());
    setFirstDayMonth(days[0].getMonth());
    setLastDay(days[5].getDate());
    setLastDayMonth(days[5].getMonth());
  }, [weekOffset, prop.teacherId]);

  return (
    <>
      <div
        className="container-fluid m-0 p-0 mb-3 week-component"
        id={`week-${prop.teacherId}`}
        key={`week-${prop.teacherId}`}
        data-professor-id={prop.teacherId}
      >
        <h4 className="text-center text-dark mt-4 mb-0" id="able-h2">
          {' '}
          Disponibilidad
        </h4>
        <p
          className="text-muted text-center p-0 m-0 "
          style={{ fontSize: '14px' }}
        >
          desde {firstDay} de
          {getMonthFromMonthNumber(firsDayMonth)} hasta {lastDay} de{' '}
          {getMonthFromMonthNumber(lastDayMonth)}, selecciona un día
        </p>
        <div
          className="d-flex justify-content-around mx-auto"
          style={{ width: '30%' }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="border me-1"
              style={{
                backgroundColor: '#F9D7B5',
                width: '10px',
                height: '10px',
                borderRadius: '50px',
              }}
            />
            <p className="text-muted p-0 m-0" style={{ fontSize: '14px' }}>
              {' '}
              Disponible{' '}
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="me-1"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50px',
                border: '2px solid #AEC8D1',
              }}
            />
            <p className="text-muted p-0 m-0" style={{ fontSize: '14px' }}>
              {' '}
              Hoy{' '}
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className=" me-1 disabled"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50px',
                border: '1px solid #AEC8D1',
              }}
            />
            <p className="text-muted p-0 m-0" style={{ fontSize: '14px' }}>
              {' '}
              No Disponible{' '}
            </p>
          </div>
        </div>
        <div className="row my-1 d-flex ms-5 ps-5 ">
          <div className="w-75  d-flex align-items-center  mb-1 ps-4 mt-2">
            <button
              type="button"
              className="prev-week d-inline btn btn-primary border py-0"
              onClick={handlePrevWeek}
              disabled={weekOffset === 0}
            >
              <span className="material-symbols-outlined d-flex align-items-center">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              className="next-week d-inline btn btn-primary border py-0 mx-2 "
              onClick={handleNextWeek}
              disabled={weekOffset === 3}
            >
              <span className="material-symbols-outlined d-flex align-items-center">
                chevron_right
              </span>
            </button>
          </div>
        </div>
        <div
          className="row d-flex justify-content-around mx-auto w-75 mt-0"
          style={{ height: 'fit-content' }}
        >
          {days.map((day) =>
            daySlots(day, prop.teacherId, setDayInfo, setShowSlots, showSlots)
          )}
        </div>
        {showSlots && (
          <div
            id="day-container"
            className="d-flex flex-column rounded-start-bottom rounded-end-bottom w-50 mx-auto my-4 overflow-auto scroll-custom"
            style={{ maxHeight: '300px' }}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            {dayInfo.map((slot) => (
              <div
                className="d-flex flex-row align-items-center border-top py-3 mt-2 mb-2 d-flex justify-content-between px-1"
                style={{ height: '30px' }}
                key={`${slot.id}`}
              >
                <p className="day-name ps-4 pb-0 my-2 pt-3">
                  {`${slot.startTime} - ${slot.endTime}`}
                </p>
                <button
                  type="button"
                  className="btn d-flex justify-content-around align-items-center btn-primary border py-0 mx-2 mt-3"
                  data-slot-id={slot.id}
                  data-bs-toggle="modal"
                  data-bs-target="#courseModal"
                  onClick={(e) => {
                    setSelectedSlotId(e.currentTarget.dataset.slotId);
                  }}
                >
                  <div className="d-flex justify-content-center me-3">
                    Agendar clase
                  </div>
                  <span className="material-symbols-outlined">
                    text_increase
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
        {showSlots && dayInfo.length === 0 && (
          <div className="d-flex flex-column align-items-center justify-content-center w-50 mx-auto my-4">
            <p className="text-muted text-center">
              No hay horarios disponibles para este día
            </p>
          </div>
        )}
      </div>
      <div
        className="modal"
        id="courseModal"
        tabIndex={-1}
        aria-labelledby="courseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content d-flex flex-column">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Selecciona un curso
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <CourseList
                teacherId={prop.teacherId}
                setSelectedCourseId={setSelectedCourseId}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmitBooking}
              >
                Agendar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
