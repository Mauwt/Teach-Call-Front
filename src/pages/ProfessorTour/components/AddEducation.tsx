import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import ProfessorApi from '../../../api/ProfessorApi';
import { UserAuthContext } from '../../../context/UserAuthContext';
import { Category } from '../../../api/CategoryApi';

type AddEducationProps = {
  categories: Array<Category>;
  description: string;
};

export default function AddEducation(props: AddEducationProps) {
  const [formValues, setFormValues] = useState({
    degree: '',
    description: '',
    schoolName: '',
  });

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { user } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) return navigate('/login');
    try {
      await ProfessorApi.addCategories({
        email: user.email,
        categories: props.categories
          .filter((category) => category.selected)
          .map((category) => category.id),
      });

      await ProfessorApi.addDescription(user.email ?? '', props.description);

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

      await ProfessorApi.addEducation(user.email, {
        degree: formValues.degree,
        description: formValues.description,
        startDate: StartDateFormatted,
        endDate: EndDateFormatted,
        schoolName: formValues.schoolName,
        imgUrl: ' ',
      });

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
