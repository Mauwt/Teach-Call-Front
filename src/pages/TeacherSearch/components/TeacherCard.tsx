type TeacherCardProps = {
  id: number;
  description: string;
  firstName: string;
  lastName: string;
  pricePerHour: number;
  reviewCount: number;
  rating: number;
};

export default function TeacherCard(prop: TeacherCardProps) {
  return (
    <div className="container border rounded py-4 w-100">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="row">
        {/* imagen de perfil */}
        <div className="col-12 col-md-2 d-flex flex-column">
          <img
            src=""
            alt=""
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
          <div
            className="rating d-inline flex-column justify-content-center align-items-center"
            style={{ flexGrow: 2 }}
          >
            <div className="rating-stars d-inline">
              {prop.rating !== 0 ? prop.rating : ''}
            </div>
            <div className="stars d-inline-flex ms-2 justify-content-center align-items-center">
              {Array.from(Array(Math.ceil(prop.rating)).keys()).map((i) => (
                <span key={i} className="material-symbols-outlined d-inline">
                  star_rate
                </span>
              ))}
              <div className="review-count">({prop.reviewCount}) reviews</div>
            </div>
          </div>
          <p className="fw-bold">S/.</p>
          <p className="price-per-hour">{prop.pricePerHour}</p>

          <div className="go-to-profile">
            <button type="button" className="btn btn-primary">
              Ver perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
