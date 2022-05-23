import React from "react";
import { useFormik } from "formik";
import "./NewColorForm.css";
import { useHistory } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required!";
  } else if (values.name.length > 22) {
    errors.name = "Must be 22 characters or less";
  }

  if (!values.hex) {
    errors.hex = "Required!";
  }

  return errors;
};

const NewColorForm = ({ addColor }) => {
  //Grab history object for form submission redirect to '/colors'
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      hex: "#000000",
    },
    validate,
    //THIS IS ON SUBMIT HANDLER LOGIC

    onSubmit: (values) => {
      /* addColor prop passed down from Routes to add colors on form submission*/
      /* pushing onto history object redirects to the path "/colors"*/
      const { name, hex } = values;
      addColor({ [name]: hex });
      history.push("/colors");
    },
  });
  return (
    <div className="NewColor">
      <form onSubmit={formik.handleSubmit}>
        <h3>Create A Color!</h3>
        <div className="row">
          <div className="col-4">
            <label htmlFor="name" className="col-form-label">
              Color Name
            </label>
          </div>
          <div className="col-8">
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className="NewColorForm-error">{formik.errors.name}</div>
        ) : null}

        <div className="row">
          <div className="col-4">
            <label htmlFor="hex" className="col-form-label">
              Color Value
            </label>
          </div>
          <div className="col-8">
            <input
              id="hex"
              name="hex"
              type="color"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hex}
            />
          </div>
        </div>
        {formik.touched.hex && formik.errors.hex ? (
          <div className="NewColorForm-error">{formik.errors.hex}</div>
        ) : null}

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewColorForm;
