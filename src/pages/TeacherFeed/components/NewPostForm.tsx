import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function NewPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-3 border rounded w-75 mt-1">
      <div className="d-flex justify-content-center align-items-center w-100 m-0 p-0">
        <label htmlFor="schoolName" className="mx-auto">
          <p className="mt-3 ms-3"> Titulo</p>
        </label>
        <input
          type="text"
          className="form-control ms-4 mb-0 me-2"
          id="new-post-title"
          placeholder="Titluo del post"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 m-0 p-0">
        <label htmlFor="schoolName" className="mx-auto">
          <p className="mt-3 ms-3"> body</p>
        </label>
        <textarea
          className="form-control ms-4 mb-2 me-2"
          id="new-post-body"
          placeholder="body del post"
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </div>
  );
}

export default NewPostForm;
