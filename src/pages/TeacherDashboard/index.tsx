import { useState } from 'react';
import NavB from './components/Nav';
import FutureBookings from './components/FutureBookings';
import SideBar from './components/SideBar';
import WeekSchedule from './components/WeekSchedule';
import './styles.css';
import CourseList from './components/CourseList';
import CourseApi from '../../api/CourseApi';

export default function TeacherDashboard() {
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('');

  const onClick = async () => {
    console.log(newCourseName);
    console.log(newCourseDescription);
    console.log(newCoursePrice);

    const title = document.getElementById(
      'exampleInputTitle'
    ) as HTMLInputElement;
    const description = document.getElementById(
      'exampleInputDescription'
    ) as HTMLInputElement;
    const price = document.getElementById(
      'exampleInputPrice'
    ) as HTMLInputElement;

    if (title.value === '' || description.value === '' || price.value === '') {
      return;
    }

    const modal = document.getElementById('courseModal');

    await CourseApi.createCourse({
      title: newCourseName,
      description: newCourseDescription,
      price: newCoursePrice,
    });

    // Cierra el modal
    modal.style.display = 'none';
    modal.classList.remove('show');
    modal.removeAttribute('aria-modal');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');

    // Elimina la clase 'show' del modal-backdrop (si está presente)
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }

    // Resetea los valores del modal
    title.value = '';
    description.value = '';
    price.value = '';
  };

  return (
    <div
      className="container-fluid g-0 d-flex flex-column "
      style={{ height: '100vh' }}
    >
      <div className="row mx-auto w-100 ">
        <div className="border-bottom d-flex flex-shrink align-items-center justify-content-center">
          <NavB />
        </div>
      </div>
      <div className="row d-flex w-100 h-100 mx-0 flex-fill">
        <div className="d-flex col-12 col-md-2 fake-xxl h-sm-100px px-0 bg-info sticky-top">
          <SideBar />
        </div>

        <div
          className="d-flex col-12 col-md-7 col-xl-7 d-flex flex-column pt-1 pe-0"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <h5 className="mt-2 ms-1">Horario Semanal</h5>
          <WeekSchedule />
          <div
            className="d-flex flex-column flex-grow-1"
            style={{ height: '420px' }}
          >
            <h5 className="mt-5 mb-3 ms-1"> Mis cursos</h5>
            <CourseList />
          </div>
        </div>
        <div
          className="d-flex col-12 col-md-3  f-fill-xxl flex-column px-0 pt-3 "
          style={{ backgroundColor: '#F8F9FA', height: '100vh' }}
        >
          <h5 className="mt-5 mb-3 ms-1">Clases Agendadas</h5>
          <FutureBookings />
          <button
            type="button"
            className="btn btn-primary mt-5 w-50 mx-auto"
            data-toggle="modal"
            data-target="#courseModal"
          >
            Crear nuevo curso
          </button>
        </div>
      </div>
      <div
        className="modal fade"
        id="courseModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="courseModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="courseModalTitle">
                Crear un nuevo curso
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex flex-column">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Titulo del curso</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputTitle"
                  aria-describedby="tituloHelp"
                  onChange={(e) => setNewCourseName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputDescription"
                  placeholder="Descripcion del curso"
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPrice"
                  placeholder="Precio del curso"
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClick}
              >
                Crear curso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
