import { useEffect, useState } from 'react';

const DraggableList = ({ onChange = () => {}, initialState = [] }) => {
  const [items, setItems] = useState(initialState);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('draggedItemIndex', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const draggedItemIndex = e.dataTransfer.getData('draggedItemIndex');
    if (draggedItemIndex === undefined) return;

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  useEffect(() => {
    onChange(items);
  }, [items, onChange]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="p-4 mb-2 bg-blue-500 text-white rounded cursor-move"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraggableList;
