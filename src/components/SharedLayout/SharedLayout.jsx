import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Link } from '../API/Link.styled';
import Loader from '../Loader/Loader';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">
            {' '}
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