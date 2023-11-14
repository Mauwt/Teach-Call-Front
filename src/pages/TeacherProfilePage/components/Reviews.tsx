import { useEffect, useState } from 'react';
import ReviewApi from '../../../api/ReviewApi';

function Reviews() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const email = localStorage.getItem('email');
        console.log(email);
        console.log(currentPage);

        const response = await ReviewApi.getReviewsByProfessorEmail(
          email,
          currentPage,
          5
        );

        if (response.data) {
          console.log(response.data);
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
      <h2 className="">Lo que tus alumnos dicen de ti</h2>
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
                <span key={i} className="fa fa-star checked" />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <span key={i} className="fa fa-star" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Reviews;
