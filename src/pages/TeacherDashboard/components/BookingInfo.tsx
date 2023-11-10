import { DayTimeSlot } from '../../../api/types/ProfessorAvailability';

type MettingInfoProps = {
  selectedAvailability: DayTimeSlot;
  showSlotInfo: boolean;
};

export default function BookingInfo(prop: MettingInfoProps) {
  return (
    <div className=" d-flex flex-column justify-content-center w-100 align-items-center">
      {!prop.showSlotInfo && (
        <div className="d-flex flex-column mx-auto h-100 align-items-center justify-content-center text-muted px-3">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span className="material-symbols-outlined mx-auto schedule-icon">
            data_info_alert
          </span>
          <p className="m-0 p-0 text-center" id="select-slot">
            Selecciona un rango para mostrar su información
          </p>
        </div>
      )}
      {prop.showSlotInfo && <h1>hola</h1>}
    </div>
  );
}
