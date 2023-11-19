import { MouseEvent } from 'react';
import {
  DayTimeSlot,
  WeekAndDayAvailabilityResponse,
} from '../../../api/types/ProfessorAvailability';

type SlotsProps = {
  dayInfo: WeekAndDayAvailabilityResponse;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  setSelectedAvailability: (selectedAvailability: DayTimeSlot) => void;
};

export default function Slots(prop: SlotsProps) {
  const dayInfo: Array<DayTimeSlot> = Object.entries(prop.dayInfo.dayTimeSlots)
    .at(0)
    ?.at(1);

  const onClickShowInfo = (e: MouseEvent<HTMLElement>) => {
    const slotId = e.currentTarget.id;
    const selectedAvailability = dayInfo.find(
      (slot) => slot.slotId.toString() === slotId
    );

    if (!selectedAvailability) return;
    prop.setSelectedAvailability(selectedAvailability);
    prop.setShowForm(!prop.showForm);
  };

  const slotsToRender = dayInfo.map((slot) => (
    <div
      className=" d-flex flex-row border-bottom mx-3"
      key={`${slot.slotId}`}
      id={`${slot.slotId}`}
      style={{ height: '50px' }}
    >
      <div className="d-flex align-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center ">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span
            className="d-none d-md-flex material-symbols-outlined align-items-center"
            style={{ fontSize: '14px' }}
          >
            schedule
          </span>
        </div>
        <div
          className="d-none d-sm-flex flex-md-column justify-content-center"
          style={{ fontSize: '15px' }}
        >
          {slot.startTime} - {slot.endTime}
        </div>
        <div className="d-none d-md-flex justify-content-center ms-md-5">
          <button
            type="button"
            className="btn btn-dark border py-0"
            onClick={onClickShowInfo}
          >
            <span className="align-items-center" style={{ fontSize: '14px' }}>
              {prop.showForm ? 'cerrar' : 'ver info'}
            </span>
          </button>
        </div>
        <div className="d-md-none ms-3 d-flex  ">
          <button
            type="button"
            className="btn btn-dark border p-0 d-flex justify-content-center align-items-center me-2"
            style={{ height: '20px', width: '20px' }}
            onClick={onClickShowInfo}
          >
            <span
              className="material-symbols-outlined align-items-center "
              style={{ fontSize: '20px' }}
            >
              info
            </span>
          </button>
          <p> {prop.showForm ? 'cerrar' : 'ver info'}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-column w-100 overflow-y ">{slotsToRender}</div>
  );
}
