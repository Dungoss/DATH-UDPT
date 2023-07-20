import React, { useState } from 'react';
const Topic = () => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagInput = (event) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' && tagInput.trim() !== '') {
      event.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <div>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInput}
        onKeyDown={handleKeyDown}
        placeholder="Type and press space to add tags"
      />
      <div>
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button onClick={() => removeTag(tag)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Topic };
