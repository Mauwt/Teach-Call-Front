import { useEffect } from 'react';
import ProfessorApi from '../../../api/ProfessorApi';

export default function ProfileCard() {
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
    <div className="container mt-5">
      <div className="card">
        <img
          src="https://random.imagecdn.app/500/150"
          style={{ objectFit: 'fill' }}
          height={150}
          className="card-img-top border-bottom rounded-2 bg-success"
          alt="Imagen de fondo"
        />

        <div className="position-relative mb-5">
          <div className="position-absolute top-0 start-0 translate-middle">
            <img
              src="https://picsum.photos/150"
              width="150px"
              height="150px"
              className="rounded-circle mx-auto border-white border-5"
              style={{
                position: 'relative',
                right: '-100px',
                objectFit: 'cover',
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
  );
}
