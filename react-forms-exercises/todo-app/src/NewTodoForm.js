import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const NewTodoForm = ({ addTodo }) => {
  const [formData, setFormData] = useState({ task: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //update state of formData on every change to any form input with attribut onChange={handleChange}
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    //prevents page from reloading on form submission
    e.preventDefault();
    //addTodo from parent component adds a todo to the state of TodoList
    addTodo({ ...formData, id: uuid() });
    //reset state of form to empty
    setFormData({ task: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Task</label>
      <input
        type="text"
        id="task"
        name="task"
        onChange={handleChange}
        value={formData.task}
      />
      <button>Add Todo</button>
    </form>
  );
};
export default NewTodoForm;
