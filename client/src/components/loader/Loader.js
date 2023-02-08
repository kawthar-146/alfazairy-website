import './Loader.css';
import { ReactComponent as PreloaderImage } from '../assets/Preloader.svg';

const Loader = (props) => {
  return (
    <div className='loader'>
      <PreloaderImage className='loader-image' />
    </div>
  );
};

export default Loader;
