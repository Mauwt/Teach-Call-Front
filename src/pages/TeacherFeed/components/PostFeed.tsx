import { useEffect, useState } from 'react';
import PostApi from '../../../api/PostApi';

type PostFeedProps = {
  setRecharge: (recharge: boolean) => void;
  recharge: boolean;
};

type Post = {
  id: number;
  title: string;
  body: string;
  likes: number;
  createdAt: string;
  mediaUrl: string;
  mediaExtension: string;
};

export default function PostFeed(props: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostApi.getCurrentUserPostWithPagination();
      setPosts(response.data.content);
      setIsLastPage(response.data.last);
      props.setRecharge(false);
      console.log(response.data.content[1]);
    };
    fetchPosts();
  }, [currentPage, props.recharge]);

  const onClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onLike = async (e) => {
    e.preventDefault();
    const postId = e.target.id;
    console.log(postId);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const postId = e.target.id;
    await PostApi.deletePost(postId);
    props.setRecharge(!props.recharge);
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
      <div
        className="d-flex flex-column align-items-center mb-3 border  rounded mt-3 w-100 mx-3 overflow-auto scroll-custom"
        style={{ maxHeight: '350px' }}
      >
        {posts.map((post) => {
          return (
            <div
              className="container my-3"
              key={post.id}
              id={post.id.toString()}
            >
              <div className="row w-100 ">
                <div className="col-1 d-flex-flex-column px-0 border-end ">
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
                        id={post.id.toString()}
                      >
                        heart_plus
                      </span>
                    </button>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p>{post.likes}</p>
                  </div>
                </div>
                <div className="col-10 d-flex flex-colum text-wrap">
                  <div
                    className="d-flex-flex-shrink justify-content-center align-items-center text-wrap "
                    style={{ width: '100%' }}
                  >
                    <div className="h5 mb-0">{post.title}</div>
                    <div className="mb-2 text-muted" style={{ fontSize: 12 }}>
                      {post.createdAt.split('T')[0]}
                    </div>
                    <div
                      className="flex flex-colum justify-content-center align-items-center mt-3  text-break"
                      style={{ width: '100%' }}
                    >
                      {post.body}
                    </div>
                    {post.mediaUrl && post.mediaExtension === 'png' && (
                      <div className="d-flex justify-content-center align-items-center mt-3">
                        <img
                          src={post.mediaUrl}
                          alt="post"
                          className="img-fluid"
                          style={{ maxHeight: '250px' }}
                        />
                      </div>
                    )}
                    {post.mediaUrl && post.mediaExtension === 'pdf' && (
                      <div className="d-flex justify-content-center align-items-center mt-3">
                        <embed
                          src={post.mediaUrl}
                          type="application/pdf"
                          width="100%"
                          height="600px"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-1 d-flex-flex-column align-items-end mt-auto">
                  <div className="d-flex flex-column  w-100 me-0 pe-0 justify-content-between align-items-end">
                    <div className="d-flex justify-content-center align-items- w-100 me-0 mb-1">
                      {false && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ fontSize: 13 }}
                          data-toggle="modal"
                          data-target="#postModal"
                        >
                          editar
                        </button>
                      )}
                    </div>
                    <div className="d-flex justify-content-center align-items-center w-100 me-0">
                      <button
                        id={post.id.toString()}
                        type="button"
                        className="btn btn-danger px-1"
                        style={{ fontSize: 12 }}
                        onClick={onDelete}
                      >
                        eliminar
                      </button>
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

      <div
        className="modal fade"
        id="postModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="postModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="postModalLabel">
                New message
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
