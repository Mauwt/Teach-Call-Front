import SideBar from '../TeacherDashboard/components/SideBar';
import NewPostForm from './components/NewPostForm';

export default function TeacherFeed() {
  return (
    <div className="container-fluid g-0 " style={{ height: '100vh' }}>
      <div className="row d-flex w-100 h-100 mx-0">
        <div className="d-flex col-12 col-md-2 fake-xxl h-sm-100px px-0 bg-info sticky-top">
          <SideBar />
        </div>
        <div
          className="d-flex col-12 col-md-7 col-xl-8 flex-column pt-1 pe-0"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <div className="d-flex flex-column flex-shrink justify-content-center align-items-center mx-auto w-75 ">
            <div className="h5 mb-0">Nuevo Post</div>
            <NewPostForm />
          </div>
          <div className="d-flex flex-fill">
            <div className="d-flex flex-column flex-shrink justify-content-center align-items-center mx-auto w-75 border">
              <div className="h5 mb-0">Post</div>
              <NewPostForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
