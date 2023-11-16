import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';
import PostApi from '../../../api/PostApi';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostApi.getCurrentUserPostWithPagination();
      setPosts(response.data.content);
      setIsLastPage(response.data.last);
    };
    fetchPosts();
  }, [currentPage]);

  const onClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onLike = async (e) => {
    e.preventDefault();
    const postId = e.target.id;
    console.log(postId);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center mb-3 border rounded mt-3 w-100 mx-3">
        {posts.map((post) => {
          return (
            <div className="container" key={post.id} id={post.id}>
              <div className="row">
                <div className="col-1 d-flex-flex-column px-0 me-1 border-end">
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                  />
                  <div>
                    <button
                      type="button"
                      className="btn d-flex flex-column justify-content-center align-items-center w-100"
                      onClick={onLike}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ color: '#e33d3d' }}
                        id={post.id}
                      >
                        heart_plus
                      </span>
                    </button>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p>{post.likes}</p>
                  </div>
                </div>
                <div className="col-10 d-flex flex-colum">
                  <div className="d-flex-flex-shrink justify-content-center align-items-center">
                    <div className="h5 mb-0">{post.title}</div>
                    <div className="mb-2 text-muted" style={{ fontSize: 12 }}>
                      {post.createdAt.split('T')[0]}
                    </div>
                    <div className="flex flex-colum justify-content-center align-items-center mt-3">
                      {post.body}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center align-items-center w-100">
        <button
          type="button"
          className="btn btn-primary mb-2 ms-auto me-2"
          onClick={onClick}
          disabled={isLastPage}
        >
          Ver mas
        </button>
      </div>
    </>
  );
}
