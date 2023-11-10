export type ProfessorEducation = {
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  schoolName: string;
  imgUrl: string;
};

export type AddCategoriesReq = {
  email: string | null;
  categories: Array<number>;
};
