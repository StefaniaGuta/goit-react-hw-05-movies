import { Form, Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        Please log in or create an account
        to use the features of this app
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
            Email*
            <Field id="email"
              type="text"
              className="input"
              required
              placeholder="Enter your email adress"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Password*
            <Field id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          <button type='submit'>Submit</button>
          <a href='registration'>or create an account</a>
        </Form>
      </Formik>
    </section>
  )

}

export default LogIn;