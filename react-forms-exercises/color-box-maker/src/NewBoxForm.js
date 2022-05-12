import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./NewBoxForm.css";

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = {
    width: "",
    height: "",
    color: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    //destructure name and value from inputs
    const { name, value } = e.target;
    //update state of formData on every change to any form input
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //use parent component function to add box to parent's 'boxes' state
    addBox({ ...formData, id: uuid() });
    //reset form state to empty
    setFormData(INITIAL_STATE);
  };

  return (
    <form className="NewBoxForm" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="width">Width</label>
        <input
          type="number"
          id="width"
          name="width"
          onChange={handleChange}
          value={formData.width}
        />
      </div>
      <div className="field">
        <label htmlFor="height">Height</label>
        <input
          type="number"
          id="height"
          name="height"
          onChange={handleChange}
          value={formData.height}
        />
      </div>
      <div className="field">
        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          name="color"
          onChange={handleChange}
          value={formData.color}
        />
      </div>

      <button className="NewBoxForm-btn">Add Box</button>
    </form>
  );
};

export default NewBoxForm;
