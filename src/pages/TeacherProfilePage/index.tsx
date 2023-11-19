import DescriptionCard from './components/DescriptionCard';
import EduactionCard from './components/EducationCard';
import ProfileCard from './components/ProfileCard';
import Reviews from './components/Reviews';
import './styles.css';

export default function TeacherProfilePage() {
  return (
    <div className="container-fluid px-0">
      <div className="row d-flex w-100 h-100 mx-0 ps-0 w-100">
        <div
          className="d-flex col-12 col-md-9  flex-column px-2 pb-3 rounded"
          // style={{ backgroundColor: 'rgb(167, 176, 143, .08)' }}
        >
          <ProfileCard />
          <DescriptionCard />
          <EduactionCard />
        </div>
        <div
          className="col-12 col-md-3 my-3 rounded-3 pt-4 ps-3"
          style={{ height: 'fit-content' }}
        >
          <Reviews />
        </div>
      </div>
    </div>
  );
}
