import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  //add a todo to todos array
  const add = (todoObj) => {
    setTodos((todos) => [...todos, todoObj]);
  };

  //update task of a todo using id
  const update = (id, updatedTask) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask } : todo
      )
    );
  };

  //remove a todo by id
  const remove = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const todoComponents = todos.map((todo) => (
    <Todo
      key={todo.id}
      id={todo.id}
      task={todo.task}
      update={update}
      remove={remove}
    />
  ));

  return (
    <div className="TodoList">
      <div className="TodoList-form">
        <NewTodoForm addTodo={add} />
      </div>
      <ul>{todoComponents}</ul>
    </div>
  );
};

export default TodoList;
