import React, { useState } from "react";

const Todo = ({ id, task, update, remove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);
  const [completed, setCompleted] = useState(false);

  const toggleCompletion = () => {
    completed ? setCompleted(false) : setCompleted(true);
  };

  const toggleEdit = () => {
    setIsEditing((edit) => !edit);
  };

  const handleChange = (e) => {
    setEditTask(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    update(id, editTask);
    setIsEditing(false);
  };

  const handleDelete = () => remove(id);

  const styles = completed ? { textDecoration: "line-through" } : null;

  // default todo view
  let jsx = (
    <div>
      <li style={styles}>
        {task}
        <button onClick={toggleEdit}>Edit</button>
        <button onClick={toggleCompletion}>✓</button>
        <button onClick={handleDelete}>X</button>
      </li>
    </div>
  );

  //todo view when editing
  if (isEditing) {
    jsx = (
      <div>
        <form onSubmit={handleUpdate}>
          <input type="text" value={editTask} onChange={handleChange} />
          <button>Update</button>
        </form>
      </div>
    );
  }

  return jsx;
};

export default Todo;
