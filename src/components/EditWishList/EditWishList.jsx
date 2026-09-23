import { Form, Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import {updateWishList} from '../../redux/wishList/wishList';
import "./EditWishList.css";


const EditWishList = ({
  setEditWishListId,
  wishList
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        updateWishList({
          id: wishList._id,
          name: values.name,
          description: values.description
        })
      ).unwrap();

     setEditWishListId(null);

    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setEditWishListId(null);
  };

  return (
    <section className="editWishListPopup">
      <Formik
        initialValues={{
          name: wishList.name || '',
          description: wishList.description || ''
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="editWatchlistForm">

            <h1 className="editWatchlistFormTitle">
              Edit your Watchlist
            </h1>

            <label className="editWatchlistFormLabel">
              Name

              <Field
                id="name"
                name="name"
                type="text"
                className="editedInputWatchlistName"
                required
              />
            </label>

            <label className="editWatchlistFormLabel">
              Description

              <Field
                id="description"
                name="description"
                type="text"
                className="editedInputWatchlistDescription"
                required
              />
            </label>

            <div className="editWatchlistFormBtnContainer">

              <button
                type="button"
                className="editWatchlistFormCancelBtn"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="editWatchlistFormSaveBtn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>

            </div>

          </Form>
        )}
      </Formik>
    </section>
  );
};
export default EditWishList;