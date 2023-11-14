import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import ProfessorApi from '../../../api/ProfessorApi';
import { validateForm } from '../../ProfessorTour/components/AddEducation';
import { ProfessorEducation } from '../../../api/types/Professor';

interface Education {
  schoolName: string;
  degree: string;
  startDate: string;
  endDate: string;
}

function EducationCard() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [grade, setGrade] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const addEducation = async () => {
    if (!validateForm(endDate, startDate, { degree: grade, schoolName })) {
      console.log('invalid form');
      return null;
    }

    const email = localStorage.getItem('email');
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

    const education: ProfessorEducation = {
      schoolName,
      degree: grade,
      description: '',
      startDate: StartDateFormatted,
      endDate: EndDateFormatted,
      imgUrl: '',
    };

    try {
      await ProfessorApi.addEducation(email, education);
      setFormSubmitted(true);
      return education;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      setShowForm(false);
    }
  };

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const email = localStorage.getItem('email');
        const response =
          await ProfessorApi.getAllEduacationWithPaginationByEmail(
            email,
            currentPage
          );
        const { data } = response;
        setEducationList(data.content);
        setIsLastPage(data.last);
        setFormSubmitted(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEducation();
  }, [currentPage, formSubmitted]);

  const handleAddEducation = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <h4>Education</h4>
        </Card.Header>
        <Card.Body className="d-flex">
          <div
            className="d-flex flex-column justify-content-center pe-4"
            style={{ flexGrow: 1 }}
          >
            {educationList.map((education, index) => (
              <div
                key={`${education.schoolName}-${index + 1}`}
                className="border-bottom ps-2 mb-3"
              >
                <h5>{education.schoolName}</h5>
                <p>{education.degree}</p>
                <p>
                  {education.startDate} - {education.endDate}
                </p>
              </div>
            ))}
          </div>
          <div
            className={`${
              showForm ? 'd-flex' : 'd-none'
            } flex-column ms-0 px-0 justify-content-center`}
          >
            <div id="degree" className="ms-auto">
              <label htmlFor="degree" className="form-label">
                Grado
              </label>
              <input
                type="text"
                className="form-control"
                id="degree"
                placeholder="Ej: Maestría en Ingeniería de Software"
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div id="schoolName" className=" ms-auto ">
              <label htmlFor="schoolName" className="form-label">
                <p className="mb-0 mt-3"> Institución Educativa</p>
              </label>
              <input
                type="text"
                className="form-control"
                id="schoolName"
                placeholder="Ej: MIT"
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <div className="w-50 mt-4  d-flex align-items-center ">
              <p className="me-2 my-0">Inicio</p>
              <DatePicker
                showIcon
                className="rounded-2 border-1"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
            <div className="w-50 mt-3 d-flex align-items-center ">
              <p className="me-4 my-0">Fin</p>
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
                onClick={addEducation}
                className="btn btn-info text-light d-flex align-items-center"
              >
                Guardar
              </button>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          {!isLastPage && (
            <Button
              variant="primary"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Más
            </Button>
          )}
          <Button
            variant={showForm ? 'danger' : 'primary'}
            onClick={handleAddEducation}
            className="float-end"
          >
            {showForm ? 'Cancelar' : 'Agregar'}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default EducationCard;
