import { Category } from '../../../api/CategoryApi';

type SelectCategoriesProps = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  setStep: (step: number) => void;
};

export default function SelectCategories(props: SelectCategoriesProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error = document.querySelector('.select-error');
    if (error) {
      error.classList.remove('d-flex');
      error.classList.add('d-none');
    }
    const { checked, id } = e.target;
    const newCategories = props.categories.map((category) => {
      if (category.id.toString() === id) {
        category.selected = checked;
        const option = document.querySelector(`#option_${id}`);
        if (option) {
          if (checked) {
            option.classList.add('bg-info');
            option.classList.add('text-white');
            option.classList.add('border-info-subtle');
          } else {
            option.classList.remove('bg-info');
            option.classList.remove('text-white');
            option.classList.remove('border-info-subtle');
          }
        }
        return { ...category };
      }
      return category;
    });
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
      <h2 className="text-center mt-3"> Selecciona tus Categorías</h2>
      <div className="d-flex flex-wrap w-100  mx-auto py-3">
        {props.categories.map((category) => {
          return (
            <div className="d-inline p-3 mx-0" key={category.id.toString()}>
              <div
                className={`option d-flex align-items-center justify-content-center border rounded-4 p-2 ${
                  category.selected
                    ? 'bg-info text-white border-info-subtle'
                    : ''
                }}`}
                id={`option_${category.id.toString()}`}
              >
                <input
                  type="checkbox"
                  className="form-check-input me-3 rounded-5"
                  id={category.id.toString()}
                  onChange={(e) => handleOnChange(e)}
                  checked={category.selected}
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
