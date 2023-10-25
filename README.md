# Teach Call Frontend

## Contenido
- [Teach Call Frontend](#teach-call-frontend)
  - [Contenido](#contenido)
  - [Recomendaciones para el desarrollo](#recomendaciones-para-el-desarrollo)
    - [Instalación de dependencias](#instalación-de-dependencias)
    - [Ejecutar el proyecto](#ejecutar-el-proyecto)
  - [Estructura del proyecto](#estructura-del-proyecto)
      - [`./src/api`](#srcapi)
      - [`./src/pages`](#srcpages)
  - [Linter y formateo de código](#linter-y-formateo-de-código)
    - [Deshabilitar el linter (solo para pruebas y situaciones muy especificas)](#deshabilitar-el-linter-solo-para-pruebas-y-situaciones-muy-especificas)
  - [TypeScript](#typescript)
    - [Props en React usando TypeScript](#props-en-react-usando-typescript)
    - [Hooks en React usando TypeScript](#hooks-en-react-usando-typescript)
    - [Tipado de elementos ajenos a React](#tipado-de-elementos-ajenos-a-react)
  - [React Router](#react-router)
    - [Como añadir una nueva ruta](#como-añadir-una-nueva-ruta)
    - [Redireccionamiento](#redireccionamiento)
  - [Bootstrap](#bootstrap)

## Recomendaciones para el desarrollo


### Instalación de dependencias

Para instalar las dependencias del proyecto, ejecutar el siguiente comando estando ***en el root del proyecto***:

```bash
npm install
```

### Ejecutar el proyecto

Para ejecutar el proyecto, ejecutar el siguiente comando estando ***en el root del proyecto***:

```bash
npm run dev
```

## Estructura del proyecto


#### `./src/api`

En esta carpeta se encuentran todos los archivos que se encargan de realizar las peticiones al backend.

👀 Para las llamadas al backend se esta usando [axios](https://axios-http.com/).

#### `./src/pages`

En esta carpeta se encuentran todas los paginas que se usanrán en el proyecto. La estructura básica de un `page` es la siguiente:

```
./src/pages
   ├── PageName
       ├── components
       │   ├── Component1.tsx
       │   ├── Component2.tsx
       ├── index.ts          # Es necesario que tenga este nombre para que react-router funcione
       ├── styles.css
```
👀 Se pueden agregar más carpetas dentro de la carpeta `PageName` si es que consideran que ese elemento se usará exclusivamente en esa `page`. 

- `context` debería almacenar los `context` y `providers` de React, pero, supongo, eso solo se usará si nos da el tiempo y la complejidad del proyecto lo amerita.
- `assets` debería almacenar los assets de la página, como imágenes, videos, etc.

## Linter y formateo de código

Para mantener un estilo de código consistente, se utiliza [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/). Todas las configuraciones se basan en este [video](https://youtu.be/cchqeWY0Nak?t=518). Los estandares para el linting se basan en [Airbnb JavaScript Style Guide](https://www.npmjs.com/package/eslint-config-airbnb)

La configuración de ambos se encuentra en el archivo [.eslintrc.js](.eslintrc.js). y funciona junto con el archivo [tsconfig.json](tsconfig.json) para mantener un estilo de código consistente.

El archivo [.prettierrc.cjs](.prettierrc.cjs) se encarga de cofiguraciones básicas pero que suelen ser ***polemicas*** 🥸, como los tabs o el uso de comillas simples o dobles. **¡ No lo cambién !** Incluso estando agregado en el `.gitignore` los cambios de estilo se verán reflejados en el código de los demás.

👀 Debería funcionar en VSCode, no se si en WebStorm. 

### Deshabilitar el linter (solo para pruebas y situaciones muy especificas)

Para las reglas de ESLint, se puede deshabilitar el linter en un archivo agregando el siguiente comentario al inicio del archivo:
- `/* eslint-disable */` para deshabilitar el linter en el archivo
- `/* eslint-disable-next-line */` para deshabilitar el linter solo en la siguiente línea
- `/* eslint-disable no-console */` si es que desean usar `console.log` sin que salte un warning

En general pueden user `/* eslint-disable [regla]*/` para deshabilitar una regla en especifico. Pueden ver todas las reglas de ESLint [aquí](https://eslint.org/docs/rules/).

> Si bien las reglas incumplidas se marcan como errores, el código se puede ejecutar sin problemas.



## TypeScript

El proyecto está escrito en [TypeScript](https://www.typescriptlang.org/). Esto significa que todo el código JavaScript es válido pero deberiamos hacer uso de las ventajas que nos ofrece TypeScript.

👀 No es necesario añadir configuraciones ya que usamos Vite como bundler y este ya viene con soporte para TypeScript.

### Props en React usando TypeScript

Para definir las props de un componente, se deber crear una interfaz `Props` (O el nombre que consideren adecuado) que definirá las props del componente. Por ejemplo:

```tsx
interface Props {
  name: string;
  age: number;
  
}

export default function MyComponent({ name, age } : Props) => {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
};
```

### Hooks en React usando TypeScript

Para definir el tipo de dato que devuelve un hook, se debe crear una interfaz con el nombre que consideren adecuado para el caso de uso que definirá el tipo de dato que devuelve el hook. Por ejemplo:

```tsx   
interface User {
  name: string;
  age: number;
}

export default function MyComponent() => {
  const [data, setData] = useState<User | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      name: e.currentTarget.name.value,
      age: e.currentTarget.age.value,
    };
    setData(newUser);
    // equivalente sería setData({ name: e.currentTarget.name.value, age: e.currentTarget.age.value });
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <input type="number" name="age" />
        <button type="submit">Submit</button>
    </div>
  );
};
```

En este caso el hook `useState` solo aceptará objetos de la forma en que se define la interfaz `User` o simplemente `null`.

👀 Pueden revisar más sobre el tipado de hooks en esta [guía](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks).

### Tipado de elementos ajenos a React

Para tipar elementos ajenos a React, se debe crear una interfaz en la carpeta `./src/types` si es que consideran que la interfaz puede ser usada en más de una page o incluso globalmente, si es que tienen la seguridad que la interfaz se usará exclusivamente en la `page` que están desarrollando se puede crear una subcarpeta `types` . 

Un ejemplo de tipados de elementos ajenos a React sería lo puden encontrar en el archivo [AuthApi](./src/api/AuthApi.tsx) donde se usan varias interfaces para tipar los datos que se envían y reciben del backend.   

```tsx	
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from '../types/Auth';

const AuthApi = {
  login: async (data: LoginReq): Promise<AxiosResponse<LoginRes>> => {
    const response = await api.post('/auth/login', { data });
    return response;
  },
  register: async (data: RegisterReq): Promise<AxiosResponse<RegisterRes>> => {
    const response = await api.post('/auth/register', { data });
    return response;
  },
  logout: (): void => {
    localStorage.removeItem('token');
  },
  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  },
};

export default AuthApi;
```

Las interfaces están definidas en el archivo [Auth](./src/types/Auth.tsx) ya que considero se usarán en más de una página en un futuro. 


## React Router

Para el manejo de rutas se está usando [React Router](https://reactrouter.com/web/guides/quick-start). La configuración se encuentra en el archivo [Routes.tsx](./src/Router.tsx).

### Como añadir una nueva ruta

Para añadir una nueva ruta, se debe importar el componente de la página que se quiere añadir y agregarlo en el arreglo `routes` de la siguiente forma:

```tsx
// imports adicionales

import {NewPage} from './pages/NewPage';	
const Routes = () => {
  return (
    <Routes>
      // rutas ya existentes
      <Route path="/new-page" element={<NewPage />} />
    </Routes>
  );
};
```

Para más información pueden consultar la [docu](https://reactrouter.com/en/main) de React Router.

### Redireccionamiento

En proyecto de JS vanilla + HTML + CSS se usa un elemento `anchor` (\<a\>\</a\>) o `button` para redireccionar a otra página con un `href` o `onclick` respectivamente indicandole el path de la página a la que se quiere redireccionar. Como estamos usando React los path yo no son tan utiles y debemos remplazar los elementos `anchor` o `button` por el componente `Link` de React Router indicando la routa en su atributo obligatorio `to`.

👀 La ruta debe estar previamente definida en el archivo [Routes.tsx](./src/Router.tsx) como se menciono justo antes.

```tsx

import { Link } from 'react-router-dom';

const MyComponent = () => {
  return (
    <div>
      <Link to="/new-page">Go to new page</Link>
    </div>
  );
};
```

Si es que el redireccionamiento se debe hacer en una función, se debe usar el hook `useNavigate` de React Router. Este hook devuelve una función que se puede usar para redireccionar a otra página. 

```tsx
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-page');
  };

  return (
    <div>
      <button onClick={handleClick}>Go to new page</button>
    </div>
  );
};
```

## Bootstrap

Para el manejo de estilos se está usando [Bootstrap](https://getbootstrap.com/).

La linea `import 'bootstrap/dist/css/bootstrap.min.css';` en el archivo [App.tsx](./src/App.tsx) importa el css de bootstrap globalmente. Pueden ver más sobre bootstrap [aquí](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
  