import { useEffect, useState } from 'react';
import ProfessorApi from '../../../api/ProfessorApi';

export default function DescriptionCard() {
  const [description, setDescription] = useState('');
  const onSubmit = () => {
    try {
      console.log(description);
      const email = localStorage.getItem('email');
      ProfessorApi.addDescription(email, description);
      const descriptionElement = document.getElementById('description');
      descriptionElement.innerHTML = description;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const email = localStorage.getItem('email');
      const descriptionElement = document.getElementById('description');

      ProfessorApi.getDescriptionByEmail(email).then((res) => {
        if (res.data) {
          descriptionElement.innerHTML = res.data;
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Descripción</h5>
            <p className="card-text" id="description" />
            <div className="d-flex flex-colum w-100 justify-content-end">
              <button
                type="button"
                className="btn btn-primary mx-3 px-3"
                data-bs-toggle="modal"
                data-bs-target="#descriptionModal"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="descriptionModal"
        tabIndex={-1}
        aria-labelledby="descriptionModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="descriptionModalLabel">
                Editar Descripción
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Descripción:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onSubmit}
                data-bs-dismiss="modal"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
