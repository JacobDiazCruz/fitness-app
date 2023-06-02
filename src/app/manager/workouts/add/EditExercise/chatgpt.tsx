import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
    { id: 4, text: "Task 4" },
  ]);

  const [draggedTodo, setDraggedTodo] = useState(null);

  const onDragStart = (e, todo) => {
    e.dataTransfer.setData("text/plain", ""); // Required for Firefox compatibility
    setDraggedTodo(todo);
  };

  const onDragEnter = (e, index) => {
    e.preventDefault();
    const targetIndex = todos.indexOf(draggedTodo);
    if (index !== targetIndex) {
      const updatedTodos = [...todos];
      updatedTodos.splice(targetIndex, 1);
      updatedTodos.splice(index, 0, draggedTodo);
      setTodos(updatedTodos);
    }
  };

  const onDragEnd = () => {
    setDraggedTodo(null);
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            draggable
            onDragStart={(e) => onDragStart(e, todo)}
            onDragEnter={(e) => onDragEnter(e, index)}
            onDragEnd={onDragEnd}
            className={`bg-gray-200 p-4 mb-2 rounded shadow cursor-move ${
              todo === draggedTodo ? "opacity-50" : ""
            }`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
