import { Link } from 'react-router-dom';
import userlogo from '../../../assets/descarga.png';

interface ProfessorDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface BookingData {
  title: string;
  description: string;
  pricePerHour: number;
  professorData: ProfessorDataProps;
}

interface BookingDataProps {
  userData: BookingData;
}

function ClassCard({ userData }: BookingDataProps) {
  return (
    <div
      className="booking-card d-flex  border rounded mb-3"
      style={{ height: 'max-content', width: '100%', backgroundColor: 'white' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div
        className="d-none d-lg-flex teacher-img img ms-2 mt-2"
        style={{ height: '60px', borderColor: 'red' }}
      >
        <img
          src={userlogo}
          className="rounded-circle round"
          alt=""
          style={{ maxHeight: '40px', objectFit: 'contain' }}
        />
      </div>
      <div className="d-flex flex-column flex-fill">
        <div className="d-flex justify-content-between ms-2 mb-0">
          <div className="d-inline mt-1 mb-0 ms-2 ms-md-0 ">
            <p
              className="d-inline lh-1"
              style={{ fontSize: '15px', fontWeight: 900 }}
            >
              Martes 14 de Octubre
            </p>
            <p className=" my-0 lh-2 text-muted">
              <b className="d-none d-lg-inline" style={{ fontSize: '14px' }}>
                Profesor
              </b>{' '}
              {userData.professorData.firstName}{' '}
              {userData.professorData.lastName}
            </p>
            <p className="mt-0 lh-1 text-muted">Física</p>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="d-inline mt-1 me-3 "> 4:00pm</p>
            <Link
              to="/#"
              className="d-flex align-items-center text-decoration-none text-dark me-2 mt-3"
              style={{ fontSize: '12px' }}
            >
              Ir a la reunión{' '}
              <span
                className="material-symbols-outlined d-inline"
                style={{ fontSize: '15px' }}
              >
                arrow_right_alt
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FutureClasses() {
  const testUserData = {
    title: 'Matematicas',
    description: 'Clase de matematicas',
    pricePerHour: 10,
    professorData: {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan.perez@teachcall.com',
      password: '1234',
    },
  };
  return (
    <div
      className="bookings d-flex flex-column flex-grow-2 rounded overflow-auto pe-2 me-3"
      style={{ height: '450px', backgroundColor: '#F8F9FA' }}
    >
      <ClassCard userData={testUserData} />
      <ClassCard userData={testUserData} />
      <ClassCard userData={testUserData} />
      <ClassCard userData={testUserData} />
      <ClassCard userData={testUserData} />
      <ClassCard userData={testUserData} />
      <ClassCard userData={testUserData} />
    </div>
  );
}
