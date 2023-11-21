import { useEffect, useState } from 'react';
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
      console.log(response.data.content[0]);
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
      {posts.length === 0 && (
        <div className="d-flex flex-column align-items-center mb-3 border rounded mt-3 w-100 mx-3">
          <div className="col-10 d-flex flex-colum">
            <div className="d-flex-flex-shrink justify-content-center align-items-center w-100">
              <div className="h5 mb-0 text-center mt-2">
                Bienvenido a tu feed
              </div>
              <div className="flex flex-columalign-items-center text-center pt-0">
                <p className="mt-0 pt-0">Aqui podras ver y editar tus post</p>
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />

                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 30, color: 'black' }}
                >
                  post_add
                </span>
                <div className="d-flex justify-content-center align-items-center">
                  <p>Haz una publicación para que más alumnos te conozcan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
        {!(posts.length === 0) && (
          <button
            type="button"
            className="btn btn-primary mb-2 ms-auto me-2"
            onClick={onClick}
            disabled={isLastPage}
          >
            Ver mas
          </button>
        )}
      </div>
    </>
  );
}
