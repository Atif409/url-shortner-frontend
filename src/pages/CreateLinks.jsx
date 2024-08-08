import React from 'react'
import ToggleButton from '../components/ToggleButton';
const CreateLinks = () => {
  return (
    <div className="flex flex-col justify-start">
      <h1 className="font-bold">Create Short Links</h1>

      <div className="p-4">
        <ToggleButton
          title="Set Custom Alias (optional)"
          description="Enable this to set a custom URL alias"
          onClick={handleToggle}
          className="mb-4 "
          titleClassName="text-secondary-a"
          descriptionClassName="text-secondary-a"
        />
        <ToggleButton description="Enable notifications" onClick={handleToggle} isToggled={true} />
      </div>
    </div>
  );
}

export default CreateLinks