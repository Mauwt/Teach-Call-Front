import { useEffect, useState } from 'react';
import PostApi from '../../api/PostApi';
import PostCard from './components/PostCard';
import './styles.css';

type Post = {
  id: string;
  title: string;
  body: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  liked: boolean;
  likesQ: number;
  mediaUrl?: string;
  mediaExtension?: string;
};

export default function StudentFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await PostApi.getPostWithPagination(page, 10);
      console.log(response.data.content);
      setPosts(response.data.content);
      setIsLastPage(response.data.last);
    };

    fetchCourses();
  }, [page]);

  const onClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center border rounded my-3 mx-auto w-75 pb-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            firstName={post.firstName}
            lastName={post.lastName}
            createdAt={post.createdAt}
            liked={post.liked}
            likesQ={post.likesQ}
            mediaUrl={post.mediaUrl}
            mediaExtension={post.mediaExtension}
          />
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center w-100">
        <button
          type="button"
          className="btn btn-primary mb-2 ms-auto me-2"
          onClick={onClick}
          disabled={isLastPage}
        >
          {isLastPage ? 'No hay más publicaciones' : 'Ver más'}
        </button>
      </div>
    </>
  );
}
