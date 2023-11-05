import { useEffect, useState } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';
import CategoryApi, { Category } from '../../api/CategoryApi';
import { ProfessorEducation } from '../../api/ProfessorApi';
import SelectCategories from './components/SelectCategories';
import AddDescription from './components/AddDescription';
import AddEducation from './components/AddEducation';

export default function ProfessorTour() {
  const [step, setStep] = useState<number>(1);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [description, setDescription] = useState<string>('');
  const [education, setEducation] = useState<ProfessorEducation>(
    {} as ProfessorEducation
  );

  useEffect(() => {
    async function getCategories() {
      const response = await CategoryApi.getAllCategories();
      const { data } = response;
      setCategories(data);
    }

    if (step === 1) getCategories();
  }, []);

  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Form className="mx-auto w-50">
        {step === 1 && (
          <SelectCategories
            categories={categories}
            setCategories={setCategories}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <AddDescription
            description={description}
            setDescription={setDescription}
            setStep={setStep}
          />
        )}

        {step === 3 && (
          <AddEducation
            setEducation={setEducation}
            categories={categories}
            description={description}
            education={education}
          />
        )}
        <ProgressBar animated className="shadow" now={(step / 3) * 100} />
      </Form>
    </div>
  );
}
