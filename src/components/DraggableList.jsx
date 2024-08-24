import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const DraggableList = ({ onChange = () => {}, initialState = [] }) => {
  const [items, setItems] = useState(initialState);

  const moveItemUp = (index) => {
    if (index === 0) return; // Can't move the first item up
    const updatedItems = [...items];
    [updatedItems[index], updatedItems[index - 1]] = [updatedItems[index - 1], updatedItems[index]];
    setItems(updatedItems);
  };

  const moveItemDown = (index) => {
    if (index === items.length - 1) return; // Can't move the last item down
    const updatedItems = [...items];
    [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
    setItems(updatedItems);
  };

  useEffect(() => {
    onChange(items);
  }, [items, onChange]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <label
        htmlFor="items"
        className=" text-xl flex items-center flex-col justify-center text-secondary-a font-semibold"
      >
        <span>Set</span>
        <span>Redirect Rules Priority</span>
      </label>
      <ul className="mt-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 mb-2 bg-primary-b text-secondary-b rounded text-center"
          >
            <span>{item}</span>
            <div className="flex space-x-2">
              <FontAwesomeIcon
                className="bg-secondary-a text-white px-2 py-1 rounded hover:cursor-pointer"
                icon={'arrow-up'}
                onClick={() => moveItemUp(index)}
                disabled={index === 0}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="bg-secondary-a text-white px-2 py-1 rounded hover:cursor-pointer"
                icon={'arrow-down'}
                onClick={() => moveItemDown(index)}
                disabled={index === items.length - 1}
              ></FontAwesomeIcon>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraggableList;
