import { useEffect, useState } from 'react';
import ReviewApi from '../../../api/ReviewApi';

function Reviews() {
  const [currentPage] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const email = localStorage.getItem('email');

        const response = await ReviewApi.getReviewsByProfessorEmail(
          email,
          currentPage,
          5
        );

        if (response.data) {
          setReviews(response.data.content);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <h3 className="text-dark text-center mt-2">Lo que tus alumnos opinan</h3>
      <div
        className="overflow-auto d-flex flex-column reviews ps-0 ms-0 pe-1"
        style={{ height: '70vh' }}
      >
        {reviews.length === 0 && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <span
              className="text-center fw-semibold mt-5"
              style={{ fontSize: 15 }}
            >
              Aun no tiene reviews, deberías publicar algo en tu sección de
              comunidad
            </span>
          </div>
        )}
        {reviews.map((review) => (
          <div key={review.id} className="card my-3">
            <div className="card-body">
              <h5 className="card-title">{review.studentName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {new Date(review.createdAt).toLocaleDateString()}
              </h6>
              <p className="card-text">{review.body}</p>
              <div className="rating">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={`star-${i + 1}`} className="fa fa-star checked" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <span key={`no-start-${i + 1}`} className="fa fa-star" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviews;
