import StickyNav from '../../common/StickyNav';
import RegisterOptions from './components/RegisterOptions';
import './styles.css';

export default function Register() {
  return (
    <div className="register-page d-flex flex-column ">
      <StickyNav />
      <RegisterOptions />
    </div>
  );
}
