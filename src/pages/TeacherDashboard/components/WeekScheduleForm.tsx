/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, TimePicker } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDayName,
  getWeekNumber,
  formatHHatoHHmm,
} from '../../../utils/DateAndTimeUtils';
import AvailabilityApi from '../../../api/ProfessorAvailability';
import { TimeRange } from '../../../api/types/ProfessorAvailability';

type DayToCheckProps = {
  time?: any;
  weekOffset: number;
  key: number;
  dayNumber: number;
  availableDaysAndRanges: DayAndRange[];
  setAvailableDaysAndRanges: (availableDaysAndRanges: DayAndRange[]) => void;
};

type WeekScheduleFormProps = {
  weekOffset?: number;
  setAvailabilityStatus?: (status: number) => void;
  setShowForm?: (showForm: boolean) => void;
  setNewWeekDays?: (
    weekOffset: number,
    email: string,
    setAvailabilityStatus?: (status: number) => void
  ) => Promise<void>;
};

type DayAndRange = {
  day: number;
  start: string;
  end: string;
};

function DayToCheck(prop: DayToCheckProps) {
  /* eslint-disable-next-line */
  const onChange = (time: any, timeString: [string, string]) => {
    const dayAndRange = {
      time,
      day: prop.dayNumber,
      start: timeString[0],
      end: timeString[1],
    };
    prop.setAvailableDaysAndRanges([
      ...prop.availableDaysAndRanges,
      dayAndRange,
    ]);
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const timePicker = document.getElementById(
      `${prop.weekOffset}-${prop.dayNumber}`
    );

    if (e.target.checked) {
      timePicker?.classList.remove('disabled-date');
    } else {
      timePicker?.classList.add('disabled-date');
      const newAvailableDaysAndRanges = prop.availableDaysAndRanges.filter(
        (dayAndRange) => dayAndRange.day !== prop.dayNumber
      );
      prop.setAvailableDaysAndRanges(newAvailableDaysAndRanges);
    }
  };

  /* eslint-disable-next-line */
  const disableTime = (now: any) => {
    console.log(now);
    return {
      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23, 24],
    };
  };
  return (
    <div className="mt-2">
      <p className="mt-1 mb-0 p-0">{getDayName(prop.dayNumber)}</p>
      <input
        type="checkbox"
        id={`check-${prop.weekOffset}-${prop.dayNumber}`}
        key={`check-${prop.weekOffset}-${prop.dayNumber}`}
        className="me-2"
        onChange={onChangeCheckbox}
      />
      <div
        className="d-inline time-picker-container disabled-date"
        id={`${prop.weekOffset}-${prop.dayNumber}`}
      >
        <Space direction="vertical" size={12}>
          <TimePicker.RangePicker
            className={`${prop.weekOffset}-i`}
            onChange={onChange}
            disabledTime={disableTime}
            format="HH a"
          />
        </Space>
      </div>
    </div>
  );
}

async function sendWeekSchedule(
  setAvailabilityStatus: (status: number) => void,
  setShowForm: (showForm: boolean) => void,
  email: string,
  weekNumber: number,
  timeRanges: DayAndRange[],
  setNewWeekDays: (
    weekOffset: number,
    email: string,
    setAvailabilityStatus: (status: number) => void
  ) => Promise<void>
) {
  try {
    const rangeRecords: Record<number, TimeRange> = {};
    timeRanges.forEach((timeRange) => {
      rangeRecords[timeRange.day + 1] = {
        startTime: formatHHatoHHmm(timeRange.start),
        endTime: formatHHatoHHmm(timeRange.end),
      };
    });

    const scheduleForm = document.querySelector('.schedule-form');
    const spinner = document.querySelector('.spinner');
    const dayContainer = document.getElementsByClassName('day-container')[0];

    scheduleForm?.classList.add('d-none');
    spinner?.classList.remove('d-none');
    spinner?.classList.add('d-flex');

    console.log({ weekNumber, email, rangeRecords });

    await AvailabilityApi.setWeekAvailability(
      email,
      weekNumber - 1,
      rangeRecords
    );

    setShowForm(false);

    dayContainer.classList.remove('w-50');
    dayContainer.classList.add('w-100');

    setAvailabilityStatus(1);
    setNewWeekDays(weekNumber - getWeekNumber(), email, setAvailabilityStatus);
  } catch (error) {
    console.log(error);
  }
}

export default function WeekScheduleForm(prop: WeekScheduleFormProps) {
  const days = [0, 1, 2, 3, 4, 5];

  const [availableDaysAndRanges, setAvailableDaysAndRanges] = useState<
    DayAndRange[]
  >([]);
  const navigate = useNavigate();

  const handleOnClick = (e: any) => {
    const userEmail = localStorage.getItem('email');
    const weekNumber = getWeekNumber(prop.weekOffset);

    if (!userEmail) return navigate('/login');
    e.preventDefault();

    console.log(`Enviando : ${weekNumber - 1}`);

    sendWeekSchedule(
      prop.setAvailabilityStatus,
      prop.setShowForm,
      userEmail,
      weekNumber,
      availableDaysAndRanges,
      prop.setNewWeekDays
    );
    return null;
  };

  return (
    <div className="schedule-form d-flex flex-column justify-content-center w-100 align-items-center">
      <div
        className="spinner-grow d-none text-info"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {days.map((day) => (
        <DayToCheck
          weekOffset={prop.weekOffset}
          key={day}
          dayNumber={day}
          availableDaysAndRanges={availableDaysAndRanges}
          setAvailableDaysAndRanges={setAvailableDaysAndRanges}
        />
      ))}
      <button
        type="button"
        className="ms-auto btn btn-info px-2 py-1 mt-2"
        onClick={handleOnClick}
      >
        {' '}
        Guardar
      </button>
    </div>
  );
}
