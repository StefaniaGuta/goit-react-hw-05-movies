import { Form, Field, Formik } from 'formik';
import { useState } from 'react';
import './CreateWatchlist.css';


const Watchlist = ({setOpen, open}) => {
  const [form, setForm] = useState({name: '', description: ''});

  const resetForm = () => {
    setForm({name: '', description: ''});
  }
    
  const handleSubmit = async() => {
    try{
      resetForm();
    } catch(e) {
      console.log(e)
    }
  }

  const closeModal = () => setOpen(!open)
  return (
    <section className='createWatchlistSection'>
      <Formik
        initialValues={{
          name: '',
          description: ''
        }}
        onSubmit={handleSubmit}
        >
        <Form className="createWatchlistForm">
          <h1 className='createWatchlistFormTitle'>Create new watchlist</h1>
          <label className='createWatchlistFormLabel'>
            Name
            <Field id="name"
              type="text"
              className="inputWatchlistName"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className='createWatchlistFormLabel'>
            Description
            <Field id="description"
              type="text"
              className="inputWatchlistDescription"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </label>
          <div className='createWatchlistFormBtnContainer'>
            <button className='createWatchlistFormCancelBtn' onClick={closeModal}>Cancel</button>
            <button className='createWatchlistFormSaveBtn' type='submit'>Save</button>
          </div>
        </Form>
      </Formik>
    </section>
  )
}

export default Watchlist;