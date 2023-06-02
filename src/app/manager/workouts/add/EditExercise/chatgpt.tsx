import React, { useState } from 'react';

const Item = React.memo(({ id, content, handleDragStart }) => {
  return (
    <div
      className="item bg-white p-2 mb-2 shadow-md cursor-move"
      draggable="true"
      onDragStart={(e) => handleDragStart(e, id)}
    >
      {content}
    </div>
  );
});

const TrelloBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 'task1', content: 'Task 1' },
    { id: 'task2', content: 'Task 2' },
    { id: 'task3', content: 'Task 3' },
  ]);

  const [items, setItems] = useState([
    { id: 'item1', content: 'Item 1' },
    { id: 'item2', content: 'Item 2' },
    { id: 'item3', content: 'Item 3' },
  ]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e) => {
    const droppedItemId = e.dataTransfer.getData('text/plain');
    const droppedItem = tasks.find((task) => task.id === droppedItemId);

    if (droppedItem) {
      setTasks(tasks.filter((task) => task.id !== droppedItemId));
      setItems([...items, droppedItem]);
    }
  };

  return (
    <div className="trello-board flex justify-center items-center h-screen bg-gray-100">
      <div className="task-list bg-gray-200 p-4">
        {tasks.map((task) => (
          <Item key={task.id} id={task.id} content={task.content} handleDragStart={handleDragStart} />
        ))}
      </div>
      <div className="item-list bg-gray-200 p-4" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {items.map((item) => (
          <Item key={item.id} id={item.id} content={item.content} handleDragStart={handleDragStart} />
        ))}
      </div>
    </div>
  );
};

export default TrelloBoard;
