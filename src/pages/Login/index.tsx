import StickyNav from '../../common/StickyNav';
import LoginOptions from './components/LoginOptions';

import './styles.css';

export default function Login() {
  return (
    <div className="d-flex flex-column " style={{ height: '100vh' }}>
      <StickyNav />
      <LoginOptions />
    </div>
  );
}
