interface ProfessorDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserData {
  title: string;
  description: string;
  pricePerHour: number;
  professorData: ProfessorDataProps;
}

interface UserDataProps {
  userData: UserData;
}

function ClassCard({ userData }: UserDataProps) {
    const testUserData = {
        title: 'Matematicas',
        description: 'Clase de matematicas',
        pricePerHour: 10,
        professorData: {
          firstName: 'Juan',
          lastName: 'Perez',
          email: 'juan.perez@teachcall.com',
          password: '1234',
        },
    }
  return (
    <div
      className="d-flex mx-auto border rounded w-75 "
      style={{ height: '25%' }}>
        <div className="img border rounded-5" >
            <img src="" alt="" />
        </div>
    </div>
  )

}

export default function FutureClasses() {
  
  };
  return (
    <div
      className="d-flex flex-column flex-grow-2 border rounded-4"
      style={{ height: '450px' }}
    >
      <ClassCard userData={testUserData} />
    </div>
  );
}
