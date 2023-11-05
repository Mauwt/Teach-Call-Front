import { Category } from '../../../api/CategoryApi';

type SelectCategoriesProps = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  setStep: (step: number) => void;
};

export default function SelectCategories(props: SelectCategoriesProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    const newCategories = props.categories.map((category) => {
      if (category.id.toString() === id) {
        category.selected = checked;
        return { ...category };
      }
      return category;
    });
    console.log(newCategories);
    props.setCategories(newCategories);
  };

  const handleOnClick = () => {
    const selectedCategories = props.categories.filter(
      (category) => category.selected
    );
    if (selectedCategories.length === 0) {
      const error = document.querySelector('.select-error');
      if (error) {
        error.classList.remove('d-none');
        error.classList.add('d-flex');
      }
      return;
    }
    props.setStep(2);
  };

  return (
    <div className="container-fluid mb-3 px-0 py-1 rounded shadow-lg">
      <h2 className="text-center"> Selecciona tus Categorías</h2>
      <div className="d-flex flex-wrap w-100  mx-auto py-3">
        {props.categories.map((category) => {
          return (
            <div className="d-inline p-3 mx-0" key={category.id.toString()}>
              <div className="d-flex align-items-center justify-content-center bg-info rounded p-2">
                <input
                  type="checkbox"
                  className="form-check-input me-3 rounded-5"
                  id={category.id.toString()}
                  onChange={(e) => handleOnChange(e)}
                />
                <label
                  className="form-check-label"
                  htmlFor={category.id.toString()}
                >
                  {category.title}
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <div className="select-error d-none w-50 mb-3 mx-auto bg-danger py-2 align-items-center rounded">
        <p className="mx-auto my-0 text-white">
          Selecciona al menos una categoría
        </p>
      </div>
      <div className="d-flex justify-content-end align-items-center me-4 mb-3">
        <button
          type="button"
          className="btn btn-secondary text-light d-flex align-items-center pe-1"
          onClick={handleOnClick}
        >
          Siguiente
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
