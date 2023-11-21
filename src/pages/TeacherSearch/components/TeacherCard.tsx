import { useState } from 'react';
import Week from './week';

type TeacherCardProps = {
  id: number;
  description: string;
  firstName: string;
  lastName: string;
  pricePerHour: number;
  reviewCount: number;
  rating: number;
  setTeacherId?: (id: number) => void;
};

export default function TeacherCard(prop: TeacherCardProps) {
  const [showWeek, setShoweek] = useState(false);

  const handleShowWeek = () => {
    setShoweek(!showWeek);
  };

  return (
    <>
      <div className="container border rounded py-4 my-3">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <div className="row">
          {/* imagen de perfil */}
          <div className="col-12 col-md-2 d-flex flex-column">
            <img
              src="https://picsum.photos/80"
              alt="profile pic"
              width={80}
              height={80}
              className="img rounded-5 img-round border mx-auto "
            />
          </div>
          {/* Names and Description */}
          <div className="col-6 col-md-7 d-flex flex-column">
            <div className="names h4">
              <p>
                {prop.firstName} {prop.lastName}
              </p>
            </div>
            <div className="description" style={{ maxHeight: '40px' }}>
              {prop.description}
            </div>
          </div>
          {/* Rating and go to profil button */}
          <div
            className="col-6 col-md-3 d-flex flex-column border-start"
            style={{ minHeight: '100px' }}
          >
            <div className="rating d-inline flex-column justify-content-center align-items-center ">
              <div className="rating-stars d-flex justify-content-cente align-items-center">
                {prop.rating !== 0 ? prop.rating.toFixed(1) : ''}
                <div className="stars d-inline-flex ms-2 justify-content-center align-items-center">
                  {Array.from(Array(Math.ceil(prop.rating)).keys()).map((i) => (
                    <span
                      key={`star-prop.id-${i}`}
                      className="material-symbols-outlined d-inline"
                      style={{ color: '#F0AA07' }}
                    >
                      star_rate
                    </span>
                  ))}
                  <div className="review-count ">({prop.reviewCount})</div>
                </div>
              </div>
            </div>
            <p className="fw-bold mt-2 border-box">S/. {prop.pricePerHour}</p>

            <button
              type="button"
              className="btn btn-info px-0 w-75 "
              id={`availability-btn-${prop.id}`}
              onClick={handleShowWeek}
            >
              Ver disponibilidad
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fad"
        id="week-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      />
      {showWeek && (
        <div className="container d-flex flex-column mt-2 rounded border pt-0 week-container">
          <Week teacherId={prop.id} />
        </div>
      )}
    </>
  );
}
