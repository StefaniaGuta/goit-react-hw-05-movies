import { Formik, Form, Field } from "formik";
import {register } from '../../redux/auth/operations';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notiflix from 'notiflix';
import "./Registration.css";

const Registration = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const resetForm = () => {
    setForm({ name: '', email: '', password: '' });
  };

   const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) {
       Notiflix.Notify.failure('Password must be at least 8 characters long.');
    } else if (!hasUpperCase) {
       Notiflix.Notify.failure('The password should contain at least 1 uppercase character.');
    } else if (!hasNumber) {
       Notiflix.Notify.failure('Password must contain at least one number.');
    } else if (!hasSpecialChar) {
       Notiflix.Notify.failure('Password must contain at least one special character (!@#$%^&*).');
    }
    return ''; 
  };

 const handleSubmit = async(e) => {
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      Notiflix.Notify.failure(passwordError);
      return;
    }
    try{
      const response = await dispatch(register({ ...form }));
      
        if (register.fulfilled.match(response.payload)) {
        resetForm();
        navigate('/home');
      } else {
        console.error("Eroare la răspunsul serverului:", response.payload);
      }
      console.log(response.payload)
        return response.payload
    } catch(e){
      console.log(e)
    }
  }

  return(
    <section className="registrationSection">
      <p className='helloText'>
        Hello! <br></br>
        Please log in or create an account
        to use the features of this app
      </p>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        onSubmit={handleSubmit}
      >
        <Form className="registrationForm">
          <label>
            Name*
            <Field id="name"
              type="text"
              className="input"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your email adress"
            />
          </label>
          <label>
            Email&
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
          <button type="submit">Create Profile</button>
        </Form>
      </Formik>
    </section>
  )
}

export default Registration;