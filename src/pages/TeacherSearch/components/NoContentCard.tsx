type TeacherCardProps = {
  search: string;
};

export default function TeacherCard(props: TeacherCardProps) {
  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      <div className="container w-50 border shadow-lg">
        <div className="row d-flex w-75 mx-auto py-5 mx-0">
          <div className="col-3 d-flex flex-column align-items-center ">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <div className="d-flex justify-content-around align-items-center">
              <span
                className="material-symbols-outlined text-danger"
                style={{ fontSize: 48 }}
              >
                person_raised_hand
              </span>
              <span
                className="material-symbols-outlined text-danger ps-0"
                style={{ fontSize: 48 }}
              >
                question_mark
              </span>
            </div>
          </div>
          <div className="col-8 d-flex flex-column justify-content-center align-items-center">
            <div className="h5">No hay resultados para {props.search}</div>
            <div className="h6">Intenta con otra búsqueda</div>
          </div>
        </div>
      </div>
    </div>
  );
}
