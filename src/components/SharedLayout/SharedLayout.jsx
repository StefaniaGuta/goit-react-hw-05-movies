import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import './SharedLayout.css';
import Searchbar from 'components/Searchbar/Searchbar';
import bell from "../Images/bell.png";
import { useSelector } from 'react-redux';
import {logOut} from "../../redux/auth/operations";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SharedLayout = () => {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const userAvatar = useSelector((state => state.auth.user.avatarURL));
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logout = async() => {
    try{
      await dispatch(logOut());
      navigate('/')
    } catch(e) {
      console.log(e)
    }

  }
  return (
    <>
      <header className='header'>
        <nav className='navigation'>
          <Link to="/home" className="link">
            Home
          </Link>
          <Link className="link">Genre</Link>
          <Searchbar/>
          <Link className="link">Movies</Link>
          <Link className="link">Series</Link>
          {isLogin ? ((
            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
              <button onClick={() => logout()} className='logOutButton' type='submit'>Logout</button>
              <img height="28px" width="28px" src={userAvatar} alt='avatar of the user'/>
            </div>)) 
              : 
          (
            <div style={{display: 'flex', width: '140px', alignItems: 'center', gap: "5px"}}>
              <Link to="/login" className="link">Login</Link> / 
              <Link to="/registration" className="link">Singup</Link>
            <img height="16px" width="14px" src={bell} alt='bell'/>
          </div>
          )
          }
        </nav>
      </header>
      <Suspense fallback={<div><Loader/></div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;