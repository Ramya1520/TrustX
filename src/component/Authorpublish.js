import React, { useState } from 'react';

function Authorpublish() {
  const [formData, setFormData] = useState({
    title: '',
    numAuthors: '',
    primaryAuthor: '',
    paperType: '',
    references: '',
    file: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      file: event.target.files[0]
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Total number of authors:
        <input type="number" name="numAuthors" value={formData.numAuthors} onChange={handleChange} />
      </label>
      <label>
        Primary author:
        <input type="text" name="primaryAuthor" value={formData.primaryAuthor} onChange={handleChange} />
      </label>
      <label>
        Type of paper:
        <select name="paperType" value={formData.paperType} onChange={handleChange}>
          <option value="research">Research</option>
          <option value="review">Review</option>
          <option value="case-study">Case Study</option>
        </select>
      </label>
      <label>
        References:
        <textarea name="references" value={formData.references} onChange={handleChange}></textarea>
      </label>
      <label>
        Upload document:
        <input type="file" name="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Authorpublish;
