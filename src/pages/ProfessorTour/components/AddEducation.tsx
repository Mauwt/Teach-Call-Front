import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import ProfessorApi from '../../../api/ProfessorApi';
import { Category } from '../../../api/CategoryApi';

type AddEducationProps = {
  categories: Array<Category>;
  description: string;
};

function displayErrorMessage(dateError: Element | null, messageText: string) {
  if (dateError) {
    const message = dateError.querySelector('.message');
    if (message) {
      message.textContent = messageText;
    }
    dateError.classList.remove('d-none');
    dateError.classList.add('d-flex');
  }
}

/* eslint-disable-next-line */
export function validateForm(endDate: Date, startDate: Date, formValues: any) {
  const dateError = document.querySelector('.date-error');
  dateError?.classList.add('d-none');
  dateError?.classList.remove('d-flex');

  if (endDate <= startDate) {
    displayErrorMessage(
      dateError,
      'La fecha de fin no puede ser menor o igual a la fecha de inicio'
    );
    return false;
  }

  if (endDate > new Date()) {
    displayErrorMessage(
      dateError,
      'La fecha de fin no puede ser mayor a la fecha actual'
    );
    return false;
  }

  if (formValues.degree === '' || formValues.schoolName === '') {
    const eduError = document.querySelector('.edu-error');
    if (eduError) {
      const message = eduError.querySelector('.message');
      if (message) message.textContent = 'Por favor, completa todos los campos';
      eduError.classList.remove('d-none');
      eduError.classList.add('d-flex');
    }

    return false;
  }

  return true;
}

export default function AddEducation(props: AddEducationProps) {
  const [formValues, setFormValues] = useState({
    degree: '',
    description: '',
    schoolName: '',
  });

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const userEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userEmail) return navigate('/login');
    if (!validateForm(endDate, startDate, formValues)) return null;

    try {
      await ProfessorApi.addCategories({
        email: localStorage.getItem('email'),
        categories: props.categories
          .filter((category) => category.selected)
          .map((category) => category.id),
      });

      console.log(props.description);

      await ProfessorApi.addDescription(userEmail, props.description);

      const startDay = startDate.getDate();
      const startMonth = startDate.getMonth();
      const startYear = startDate.getFullYear();

      const endDay = endDate.getDate();
      const endMonth = endDate.getMonth();
      const endYear = endDate.getFullYear();

      const StartDateFormatted = `${startDay
        .toString()
        .padStart(2, '0')}/${startMonth
        .toString()
        .padStart(2, '0')}/${startYear}`;

      const EndDateFormatted = `${endDay.toString().padStart(2, '0')}/${endMonth
        .toString()
        .padStart(2, '0')}/${endYear}`;

      await ProfessorApi.addEducation(userEmail, {
        degree: formValues.degree,
        description: formValues.description,
        startDate: StartDateFormatted,
        endDate: EndDateFormatted,
        schoolName: formValues.schoolName,
        imgUrl: ' ',
      });

      await ProfessorApi.setCompletedTour(userEmail ?? '');

      return navigate('/dashboard/teacher');
    } catch (error) {
      return navigate('/login');
    }
  };

  return (
    <div className="container-fluid mb-3 px-0 py-1 rounded shadow-lg">
      <h2 className="text-center"> Añade tu educación más relevante</h2>
      <div className="d-flex flex-column justify-content-center align-items-center w-100  mx-auto py-3 ">
        <div id="degree" className=" form-group w-50 mx-auto">
          <label htmlFor="degree" className="form-label">
            Grado
          </label>
          <input
            type="text"
            className="form-control"
            id="degree"
            placeholder="Ej: Maestría en Ingeniería de Software"
            onChange={(e) =>
              setFormValues({ ...formValues, degree: e.target.value })
            }
          />
        </div>
        <div id="schoolName" className=" form-group w-50 mx-auto">
          <label htmlFor="schoolName" className="form-label">
            <p className="mb-0 mt-3"> Institución Educativa</p>
          </label>
          <input
            type="text"
            className="form-control"
            id="schoolName"
            placeholder="Ej: MIT"
            onChange={(e) =>
              setFormValues({ ...formValues, schoolName: e.target.value })
            }
          />
        </div>
        <div className="w-50 mt-4 mx-auto d-flex align-items-center">
          <p className="me-2 my-0">Fecha de inicio</p>
          <DatePicker
            showIcon
            className="rounded-2 border-1"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div className="w-50 mt-3 mx-auto d-flex align-items-center ">
          <p className="me-4 my-0">Fecha de fin</p>
          <DatePicker
            showIcon
            className="rounded-2 border-1"
            selected={endDate}
            onChange={(date: Date) => {
              setEndDate(date);
            }}
          />
        </div>
        <div className="date-error w-55 d-none justify-content-center align-item-center bg-danger rounded-2 mt-4 mb-0 p-2">
          <p className="message text-dark my-0" />
        </div>
        <div className="edu-error w-55 d-none justify-content-center align-item-center bg-danger rounded-2 mt-4 mb-0 p-2">
          <p className="message text-dark my-0" />
        </div>

        <div className="d-flex justify-content-end align-items-center me-4  my-2 dark w-100">
          <button
            type="button"
            className="btn btn-primary text-light d-flex align-items-center pe-1"
            onClick={handleSubmit}
          >
            Guardar
            <span className="material-symbols-outlined ms-1">done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
