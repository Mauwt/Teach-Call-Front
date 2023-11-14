import DescriptionCard from './components/DescriptionCard';
import EduactionCard from './components/EducationCard';
import ProfileCard from './components/ProfileCard';
import Reviews from './components/Reviews';

export default function TeacherProfilePage() {
  return (
    <div className="container-fluid px-2 py-4">
      <div className="row d-flex w-100 h-100 mx-0 px-5 ps-0">
        <div
          className="d-flex col-12 col-md-9  flex-column px-2 pb-3 rounded shadow-lg"
          style={{ backgroundColor: 'rgb(167, 176, 143, .08)' }}
        >
          <ProfileCard />
          <DescriptionCard />
          <EduactionCard />
        </div>
        <div className="col-12 col-md-3 d-md-block">
          <Reviews />
        </div>
      </div>
    </div>
  );
}
