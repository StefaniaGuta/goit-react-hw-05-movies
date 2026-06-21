import { Form, Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../Images/icons.svg';
import './Login.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({email: '', password: ''});
  const navigate = useNavigate();
  
  const resetForm = () => {
    setForm({email: '', password: ''})
  }
  
  const handleSubmit = async() => {
    try{
      const response = await dispatch(logIn({...form}));
      resetForm();
      navigate('/home');
      return response.payload
    } catch(e) {
      console.log(e)
    }
  }
  
  return (
    <section className='loginSection'>
      <p className='helloText'>
        Hello! <br></br>
        Sing in 
        to access the features of this app
      </p>
      <Formik
      initialValues={{
        email:'',
        password: ''
      }}
      onSubmit={handleSubmit}
      >
        <Form className="loginForm">
          <label>
            <Field id="email"
              type="text"
              className="input"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="off"
            />
           <svg width="24" height="24"><use xlinkHref={`${url}#email`}/></svg>
          </label>
          
          <label>
            <Field id="password"
              type="password"
              className="input"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              autoComplete="off"
            />
            <svg width="24" height="24"><use xlinkHref={`${url}#password`}/></svg>
          </label>
          <button type='submit'>sing in</button>
          <a href='registration'>or create an account</a>
        </Form>
      </Formik>
    </section>
  )

}

export default LogIn;