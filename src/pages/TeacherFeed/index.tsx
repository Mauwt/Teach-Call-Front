import NavB from '../TeacherDashboard/components/Nav';
import SideBar from '../TeacherDashboard/components/SideBar';
import NewPostForm from './components/NewPostForm';
import PostFeed from './components/PostFeed';

import './styles.css';

export default function TeacherFeed() {
  return (
    <div
      className="container-fluid g-0 d-flex flex-column"
      style={{ height: '100vh' }}
    >
      <div className="row mx-auto w-100 ">
        <div className="border-bottom d-flex flex-shrink align-items-center justify-content-center">
          <NavB />
        </div>
      </div>
      <div className="row d-flex w-100 h-100 mx-0 flex-fill">
        <div className="d-flex col-12 col-md-2 fake-xxl h-sm-100px px-0 bg-info sticky-top">
          <SideBar />
        </div>
        <div
          className="d-flex col-12 col-md-7 col-xl-8 flex-column pt-1 pe-0"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <div className="d-flex flex-column flex-shrink justify-content-center align-items-center mx-auto w-75 mt-3">
            <div className="h5 mb-0">Nuevo Post</div>
            <NewPostForm />
          </div>
          <div className="d-flex flex-column flex-fill mt-5 border-top w-75 mx-auto">
            <div className="w-100 mx-auto mt-3">
              <h5 className="fw-bold">Mis Post</h5>
            </div>
            <div className="d-flex flex-column flex-shrink  align-items-center mx-auto w-100 px-2">
              <PostFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
