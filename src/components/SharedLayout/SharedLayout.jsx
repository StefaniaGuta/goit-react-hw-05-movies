import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Link } from '../API/Link.styled';
import Loader from '../Loader/Loader';
//import cinemaxImage from '../../images/46d2a7bbe40e47c8b474ca1ea7823992-free.png';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <>
      <header className={styles.header}>
        {/*<img src={cinemaxImage} alt='cinemax' />*/}
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">
            {' '}
            {/*nu pun END daca vreau sa se coloreze */}
            Movies
          </Link>
        </nav>
      </header>
      <Suspense fallback={<div><Loader/></div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;