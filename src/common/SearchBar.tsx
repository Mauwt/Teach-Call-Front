import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search/teacher/${search}`);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="searchbar w-100 d-flex justify-content-center ">
        <Form className="w-75">
          <Row className=" g-1 d-flex justify-content-center align-items-center">
            <Col>
              <Form.Control
                type="text"
                placeholder="¿Que quieres aprender hoy?"
                onChange={onChange}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-info"
                type="submit"
                style={{ color: 'black' }}
                onClick={onSearch}
                className="d-flex justify-content-center"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '22px' }}
                >
                  search
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
