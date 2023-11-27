import { useState } from 'react';
import { Button } from 'react-bootstrap';
import PostApi from '../../../api/PostApi';

type NewPostFormProps = {
  setRecharge: (recharge: boolean) => void;
  recharge: boolean;
};

function NewPostForm(props: NewPostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [newfile, setNewFile] = useState<File | null>(null);

  const acceptFileExt = ['application/pdf', 'image/png'];

  const onClick = async () => {
    try {
      await PostApi.createPost(title, body, newfile);
      props.setRecharge(!props.recharge);

      const titleElm = document.getElementById(
        'new-post-title'
      ) as HTMLInputElement;
      titleElm.value = '';

      const bodyElm = document.getElementById(
        'new-post-body'
      ) as HTMLInputElement;
      bodyElm.value = '';

      const fileElm = document.getElementById('fileInput') as HTMLInputElement;
      fileElm.value = '';
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelection = (e: any) => {
    const file = e.target.files[0];

    if (!acceptFileExt.find((type) => type === file.type)) {
      setFileError('File must be in PDF or PNG format');
      return;
    }

    if (file.size > 5000000) {
      setFileError('File size cannot exceed more than 5MB');
      return;
    }

    setFileError(null);
    setNewFile(file);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-3 border rounded w-100 mt-1">
      <div className="d-flex flex-column justify-content-around align-items-center w-100 ms-0 p-0">
        <label htmlFor="schoolName" className="">
          Titulo
        </label>
        <input
          type="text"
          className="form-control  my-2 w-75"
          id="new-post-title"
          placeholder="Título"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column justify-content-around align-items-center w-100 ms-0 p-0">
        <label htmlFor="schoolName" className="">
          Contenido
        </label>
        <textarea
          className="form-control mb-2 w-75"
          id="new-post-body"
          placeholder="Publicar"
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column w-100 mt-4 p-0 align-items-center">
        <label
          htmlFor="fileInput"
          className="text-muted"
          style={{ fontSize: 15 }}
        >
          Archivos (solo PDF o PNG)
        </label>
        <input
          type="file"
          className="form-control w-50 ms-0"
          id="fileInput"
          onChange={handleFileSelection}
        />
      </div>
      {fileError && (
        <div className="alert alert-danger py-1 mt-2 px-2">{fileError}</div>
      )}
      <Button variant="primary" className="mb-2 ms-auto me-2" onClick={onClick}>
        Publicar
      </Button>
    </div>
  );
}

export default NewPostForm;
