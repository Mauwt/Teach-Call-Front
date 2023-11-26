import { useEffect, useState } from 'react';
import ProfessorApi from '../../../api/ProfessorApi';
import defaultProfile from '../../../assets/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

export default function ProfileCard() {
  const [error, setError] = useState('');
  const [ppUrl, setPpUrl] = useState(localStorage.getItem('pp'));
  const [cpUrl, setCpUrl] = useState(localStorage.getItem('cover'));
  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  const handleProfilePicUpload = async (e, fileType: string) => {
    try {
      const file = e.target.files[0];

      console.log(file);

      if (!validFileTypes.find((type) => type === file.type)) {
        setError('File must be in JPG/PNG format');
        return;
      }

      if (file.size > 5000000) {
        setError('File must be less than 5MB');
        return;
      }
      setError('');

      const form = new FormData();
      form.append('img', file);

      console.log(form.get('img'));

      await ProfessorApi.addImage(form, fileType);
      const url = await ProfessorApi.getImg(fileType);
      console.log(url);

      if (fileType === 'pp') {
        localStorage.setItem('pp', url.data);
        setPpUrl(url.data);
      } else {
        localStorage.setItem('cover', url.data);
        setCpUrl(url.data);
      }

      console.log(form);
    } catch (err) {
      console.log(err);
    }
  };

  const OnDeletePic = async (e: any, filename: string) => {
    try {
      await ProfessorApi.deleteImg(filename);

      if (filename === 'pp') {
        localStorage.setItem('pp', '');
        setPpUrl('');
      }
      if (filename === 'cover') {
        localStorage.setItem('cover', '');
        setCpUrl('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickProfilePic = () => {
    setError('');
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const email = localStorage.getItem('email');
        await ProfessorApi.getLastEducationAndExperienceByEmail(email).then(
          (res) => {
            if (res.data) {
              const response = res.data;

              const edu = document.getElementById('last-education');
              const exp = document.getElementById('last-experience');
              const name = document.getElementById('teacher-name');

              edu.innerHTML = `Última educación: ${response.degree} en ${response.schoolName}`;
              exp.innerHTML =
                response.position && response.employer
                  ? `Último trabajo: ${response.position} en ${response.employer}`
                  : '';
              name.innerHTML = `${response.firstName} ${response.lastName}`;
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <div className="card">
          <div className="" style={{ minHeight: '150px' }}>
            {cpUrl === '' && (
              <div className="bg-info w-100" style={{ height: '150px' }} />
            )}
            {cpUrl !== '' && (
              <img
                src={cpUrl}
                style={{ objectFit: 'fill' }}
                height="150px"
                className="card-img-top border-bottom rounded-2"
                alt="Imagen de fondo"
              />
            )}

            <div className="">
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  position: 'absolute',
                  right: '50px',
                  top: '110px',
                }}
                data-toggle="modal"
                data-target="#coverDeleteModal"
              >
                <span
                  className="material-symbols-outlined text-danger rounded-3 px-1 py-1"
                  style={{
                    fontSize: 23,
                    backgroundColor: 'rgba(177, 165, 165, 0.5)',
                  }}
                >
                  delete
                </span>
              </button>

              <input
                id="coverInput"
                type="file"
                hidden
                onChange={(e) => handleProfilePicUpload(e, 'cover')}
              />
              <button
                type="button"
                className="btn btn-sm me-0"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '110px',
                }}
                onClick={() => document.getElementById('coverInput').click()}
              >
                <span
                  className="material-symbols-outlined m-0 p-0 text-info rounded-3 px-1 py-1"
                  style={{
                    fontSize: 23,
                    backgroundColor: 'rgba(177, 165, 165, 0.5)',
                  }}
                >
                  edit
                </span>
              </button>
            </div>
          </div>

          <div className="position-relative mb-5">
            <div
              role="button"
              className="position-absolute top-0 start-0 translate-middle"
              style={{
                width: '140px',
                height: '140px',
              }}
              onClick={onClickProfilePic}
              tabIndex={0}
              data-toggle="modal"
              data-target="#imgModal"
            >
              <img
                src={ppUrl !== '' ? ppUrl : defaultProfile}
                width="100%"
                height="100%"
                id="profile-picture"
                className="rounded-circle mx-auto border-info border-3"
                style={{
                  position: 'relative',
                  right: '-100px',
                  objectFit: 'fill',
                  border: '5px solid white',
                }}
                alt="Foto de perfil"
              />
            </div>
          </div>

          <div className="card-body mt-4 ">
            <h5 className="card-title" id="teacher-name">
              {' '}
            </h5>
            <p className="card-text" id="last-education" />
            <p className="card-text" id="last-experience" />
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="imgModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="imgModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-dark">
            <div className="modal-body d-flex flex-column justify-content-center mb-3">
              <div className="text-center ">
                <h3 className="text-light">Editar foto de perfil</h3>
              </div>
              <div
                className="d-flex mx-auto justify-content-center align-items-center mt-3"
                style={{
                  width: '250px',
                  height: '250px',
                  border: '5px solid white',
                  borderRadius: '50%',
                }}
              >
                <img
                  width={200}
                  src={ppUrl !== '' ? ppUrl : defaultProfile}
                  className="rounded-circle mx-auto border-info border-3"
                  alt="Foto de perfil"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {!(error === '') && (
                <div className="alert alert-danger mt-3 py-0 mb-0" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div className="modal-footer p-0 d-flex justify-content-between px-3 ">
              <label htmlFor="#imageInput" className="m-0 p-0 form-laber">
                <input
                  type="file"
                  id="imageInput"
                  onChange={(e) => handleProfilePicUpload(e, 'pp')}
                  hidden
                />
                <button
                  type="button"
                  className="btn btn-primary pt-2 d-flex align-items-center justify-content-center"
                  onClick={() => document.getElementById('imageInput').click()}
                >
                  <span
                    className="material-symbols-outlined m-0 p-0"
                    style={{ fontSize: 20 }}
                  >
                    edit
                  </span>
                </button>
              </label>

              <button
                type="button"
                className="btn btn-secondary py-1 px-1 d-flex align-items-center justify-content-center"
                data-dismiss="modal"
                onClick={(e) => OnDeletePic(e, 'pp')}
              >
                <span
                  className="material-symbols-outlined text-danger"
                  style={{ fontSize: 24 }}
                >
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="coverDeleteModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="coverDeleteModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog mb-0" role="document">
          <div className="modal-content bg-dark mb-0">
            <div className="modal-body d-flex flex-column justify-content-center mb-3">
              <div className=" ">
                <h4 className="text-light">Eliminar fondo</h4>
              </div>
              <div className="text-center mt-3">
                <p className="text-light">
                  ¿Estás seguro que deseas eliminar el fondo?
                </p>
              </div>
              <div className="modal-footer pt-1 pb-0 d-flex justify-content-between px-3 ">
                <button
                  type="button"
                  className="btn btn-primary pt-1 mb-0 d-flex align-items-center justify-content-center"
                  data-dismiss="modal"
                >
                  <span
                    className="material-symbols-outlined m-0 p-0"
                    style={{ fontSize: 20 }}
                  >
                    close
                  </span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary py-1 mb-0 d-flex align-items-center justify-content-center"
                  data-dismiss="modal"
                  onClick={(e) => OnDeletePic(e, 'cover')}
                >
                  <span
                    className="material-symbols-outlined text-danger"
                    style={{ fontSize: 24 }}
                  >
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
