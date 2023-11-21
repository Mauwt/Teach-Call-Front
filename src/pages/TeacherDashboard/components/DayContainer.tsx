import {
  DayTimeSlot,
  WeekAndDayAvailabilityResponse,
} from '../../../api/types/ProfessorAvailability';
import Slots from './Slots';

type DayContainerProps = {
  status: number;
  dayInfo?: WeekAndDayAvailabilityResponse;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  setSelectedAvailability: (selectedAvailability: DayTimeSlot) => void;
  showSlotInfo: boolean;
  setShowSlotInfo: (showSlotInfo: boolean) => void;
};

export default function DayContainer(prop: DayContainerProps) {
  const onClickShowForm = () => {
    const dayContainer = document.getElementsByClassName('day-container')[0];
    dayContainer.classList.remove(prop.showForm ? 'w-50' : 'w-100');
    dayContainer.classList.add(prop.showForm ? 'w-100' : 'w-50');
    prop.setShowForm(!prop.showForm);
  };

  return (
    <div className="overflow-auto scroll-custom" style={{ maxHeight: '50vh' }}>
      {prop.status === 0 && (
        <>
          <h5 className="ms-3 mt-2">Disponibilidad </h5>
          <Slots
            dayInfo={prop.dayInfo as WeekAndDayAvailabilityResponse}
            setSelectedAvailability={prop.setSelectedAvailability}
            setShowForm={prop.setShowForm}
            showForm={prop.showForm}
            setShowSlotInfo={prop.setShowSlotInfo}
            showSlotInfo={prop.showSlotInfo}
          />
        </>
      )}
      {prop.status === 1 && (
        <div className="d-flex flex-column mx-auto h-100 align-items-center justify-content-center text-muted">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span className="material-symbols-outlined mx-auto">
            gesture_select
          </span>
          Selecciona un día
        </div>
      )}
      {prop.status === 2 && (
        <div className="d-flex flex-column mx-auto h-100 align-items-center justify-content-center text-muted px-3">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <p
            className="m-0 p-0 text-center"
            id="unset-availability"
            data-state="unset"
          >
            {prop.showForm && 'Selecciona un rango de horas por día disponible'}
            {!prop.showForm &&
              'No has definido tu disponibilidad para esta semana.'}
          </p>
          <p className="mt-3 mb-0 p-0 text-center">
            {prop.showForm && 'Click para ocultar el menu de disponibilidad'}
            {!prop.showForm && 'Click para mostrar el menu de disponibilidad.'}
          </p>
          <button
            type="button"
            className="py-0 mt-2"
            style={{ outline: 'none', border: 'none' }}
            onClick={onClickShowForm}
          >
            <span className="material-symbols-outlined mx-auto schedule-icon">
              assignment_add
            </span>
          </button>
          {prop.showForm && (
            <div className="text-center mt-5 pt-5">
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
              />
              <span className="material-symbols-outlined text-danger">
                warning
              </span>
              <p className="text-center text-dark">
                Si modificas horarios ya definidos deberás reprogramar
                personalmente con los estudiantes afectados por el cambio.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
