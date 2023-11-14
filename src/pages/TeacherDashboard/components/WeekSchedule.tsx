import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import AvailabilityApi from '../../../api/ProfessorAvailability';
import DayContainer from './DayContainer';
import WeekScheduleForm from './WeekScheduleForm';
import {
  getWeekDays,
  getWeekNumber,
  getDayName,
} from '../../../utils/DateAndTimeUtils';
import {
  DayTimeSlot,
  WeekAndDayAvailabilityResponse,
} from '../../../api/types/ProfessorAvailability';
import BookingInfo from './BookingInfo';

function daySlots(
  day: Date,
  setDayInfo: (dayInfo: WeekAndDayAvailabilityResponse) => void,
  setAvailabilityStatus: (status: number) => void
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

    element.classList.toggle('day-selected');
    const weekNum: number = parseInt(elementId.split('-')[0], 10);
    const dayNum: number = parseInt(elementId.split('-')[1], 10);

    const userEmail = localStorage.getItem('email');

    try {
      const response = await AvailabilityApi.getWeekAndDayAvailability(
        userEmail || ' ',
        weekNum,
        dayNum
      );

      setDayInfo(response.data);
      setAvailabilityStatus(0);

      console.log(JSON.stringify(response.data, null, 2));

      const dayContainer = document.getElementById('day-container');

      if (dayContainer) {
        dayContainer.classList.remove('w-100');
        dayContainer.classList.add('w-50');
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.status);
    }
  }
  return (
    <div
      className={`day-slot col-12 col-sm-2 d-flex flex-column  h-100 align-items-center justify-content-center disabled ${
        dayNumber === 0 ? 'rounded-start' : ''
      } ${dayNumber === 5 ? 'rounded-end' : ''} `}
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

async function setWeekDays(
  weekOffset: number,
  email: string,
  setAvailabilityStatus: (status: number) => void
) {
  document
    .getElementsByClassName('day-selected')[0]
    ?.classList.remove('day-selected');
  document.getElementsByClassName('today')[0]?.classList.remove('today');
  const days = getWeekDays(weekOffset);
  const weekNumber = getWeekNumber(weekOffset);
  const slots = document.querySelectorAll('.day-slot');
  try {
    const response = await AvailabilityApi.getWeekAvailibility(
      email,
      weekNumber
    );

    const { availableDays } = response.data;

    const currentDayNumber = new Date().getDay() - 1;
    console.log(currentDayNumber);
    const currentWeekNumber = getWeekNumber();

    slots.forEach((slot, i) => {
      setAvailabilityStatus(1);
      const day = days[i];
      const dayNumber = day.getDay() - 1;

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
      setAvailabilityStatus(2);

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

export default function WeekSchedule() {
  const [availabilityStatus, setAvailabilityStatus] = useState(1);
  const [selectedAvailability, setSelectedAvailability] = useState<DayTimeSlot>(
    {} as DayTimeSlot
  );
  const [weekOffset, setWeekOffset] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [dayInfo, setDayInfo] = useState<WeekAndDayAvailabilityResponse>(
    {} as WeekAndDayAvailabilityResponse
  );
  const [showSlotInfo, setShowSlotInfo] = useState(false);
  const days = getWeekDays(weekOffset);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('WeekSchedule.tsx: useEffect()');
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      navigate('/login');
    } else {
      setWeekDays(weekOffset, userEmail, setAvailabilityStatus);
    }
  }, [weekOffset, navigate]);

  const handlePrevWeek = () => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) return navigate('/login');

    setShowForm(false);
    setWeekOffset(weekOffset - 1);

    const dayContainer = document.getElementsByClassName('day-container')[0];
    dayContainer.classList.remove('w-50');
    dayContainer.classList.add('w-100');

    return null;
  };

  const handleNextWeek = () => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) return navigate('/login');
    setShowForm(false);
    setWeekOffset(weekOffset + 1);

    const dayContainer = document.getElementsByClassName('day-container')[0];
    dayContainer.classList.remove('w-50');
    dayContainer.classList.add('w-100');
    return null;
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="w-75 mx-auto d-flex align-items-center mt-5 mb-1 mx-3">
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
      <div
        className="week-container row d-flex justify-content-around mx-auto w-75 mt-0"
        style={{ height: '50px' }}
      >
        {days.map((day) => daySlots(day, setDayInfo, setAvailabilityStatus))}
      </div>
      <div className="d-flex w-75 mt-2 mx-auto">
        <div
          className="day-container d-flex flex-column w-100 mt-2 mx-auto rounded-4 py-3"
          id="day-container"
        >
          <DayContainer
            status={availabilityStatus}
            showForm={showForm}
            setShowForm={setShowForm}
            dayInfo={dayInfo}
            setSelectedAvailability={setSelectedAvailability}
            setShowSlotInfo={setShowSlotInfo}
            showSlotInfo={showSlotInfo}
          />
        </div>
        <div className="d-flex flex-grow-1 justifycontent mx-0 mt-2">
          {showForm && (
            <WeekScheduleForm
              weekOffset={weekOffset}
              setAvailabilityStatus={setAvailabilityStatus}
              setShowForm={setShowForm}
              setNewWeekDays={setWeekDays}
            />
          )}
          {availabilityStatus === 0 && (
            <BookingInfo
              selectedAvailability={selectedAvailability}
              showSlotInfo={showSlotInfo}
            />
          )}
        </div>
      </div>
    </>
  );
}
