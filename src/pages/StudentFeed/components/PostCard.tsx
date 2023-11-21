import { useState } from 'react';
import PostApi from '../../../api/PostApi';

type PostCardProps = {
  id: string;
  title: string;
  body: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  liked: boolean;
  likesQ: number;
};
export default function PostCard(post: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likesQ, setLikesQ] = useState(post.likesQ);
  const onLiked = async () => {
    try {
      if (liked) {
        await PostApi.removeLike(post.id); // Assuming removeLike function handles the DELETE request
        setLiked(false);
        setLikesQ(likesQ - 1);
      } else {
        await PostApi.addLike(post.id); // Assuming addLike function handles the POST request
        setLiked(true);
        setLikesQ(likesQ + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              className="btn d-flex flex-column justify-content-center align-items-center w-100 like-btn"
              // disabled={liked}
              onClick={onLiked}
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
            <p className="text-dark">{likesQ}</p>
          </div>
        </div>
        <div className="col-10 d-flex flex-colum">
          <div className="d-flex-flex-shrink justify-content-center align-items-center">
            <div className="h5 mb-0">{post.title}</div>
            <div className="mb-2 text-muted" style={{ fontSize: 12 }}>
              <p className="text-dark mb-1">
                {post.firstName} {post.lastName}
              </p>
              {post.createdAt.split('T')[0]}
            </div>
            <div className="flex flex-colum justify-content-center align-items-center my-3">
              {post.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
