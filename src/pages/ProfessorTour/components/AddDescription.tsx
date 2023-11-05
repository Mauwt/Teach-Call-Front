type SetDescriptionProps = {
  description: string;
  setDescription: (description: string) => void;
  setStep: (step: number) => void;
};

export default function AddDescription(prop: SetDescriptionProps) {
  const stepforward = () => {
    if (prop.description === '') {
      const error = document.querySelector('.description-error');
      if (error) {
        error.classList.remove('d-none');
        error.classList.add('d-flex');
      }
      return;
    }
    prop.setStep(3);
  };

  const stepback = () => {
    prop.setStep(1);
  };

  return (
    <div className="container-fluid mb-3 px-0 py-1 rounded shadow-lg">
      <h2 className="text-center"> Añade una descripción</h2>
      <div className="d-flex flex-column justify-content-center align-items-center w-100  mx-auto py-3 ">
        <div className="d-flex flex-column w-75">
          <div className="form-group">
            <label htmlFor="descripcion">
              <p className="mb-0">
                Cuentales a tus futuros alumnos quien eres y lo que ofreces
              </p>
            </label>
            <textarea
              className="form-control"
              id="descripcion"
              rows={3}
              onChange={(e) => prop.setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="description-error d-none w-50 mb-3 mx-auto bg-danger py-2 align-items-center rounded">
        <p className="mx-auto my-0 text-white">Ingresa una descripción</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            type="button"
            className="btn btn-secondary text-light d-flex align-items-center pe-1 ms-4"
            onClick={stepback}
          >
            <span className="material-symbols-outlined ms-1 me-0">
              arrow_back
            </span>
            Volver
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary text-light d-flex align-items-center pe-1 me-4"
            onClick={stepforward}
          >
            Seguir
            <span className="material-symbols-outlined ms-1 me-0">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
