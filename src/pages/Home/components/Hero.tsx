import { useRef, useEffect } from 'react';
/* eslint-disable-next-line */
// @ts-ignore
import Typed from 'typed.js';
import SearchBar from '../../../common/SearchBar';
import dashboardImg from '../../../assets/dashboard.png';

export default function Hero() {
  const elem = useRef(null);
  const elemSmall = useRef(null);

  useEffect(() => {
    const typed = new Typed(elem.current, {
      strings: [
        '<b>Cálculo</b>^1500',
        '<b>Química</b>^1500',
        '<b>Programación</b>^1500',
        '<b>Física</b>^1500',
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 500,
      showCursor: false,
      loop: true,
    });
    const typedSmall = new Typed(elemSmall.current, {
      strings: [
        '<b>Cálculo</b>^1500',
        '<b>Química</b>^1500',
        '<b>Programación</b>^1500',
        '<b>Física</b>^1500',
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 500,
      showCursor: false,
      loop: true,
    });
    return () => {
      typed.destroy();
      typedSmall.destroy();
    };
  }, []);

  return (
    <div className="container-fluid hero py-5">
      <div className="position-relative">
        <h1 className="d-lg-flex d-none display-2  text-center position-absolute top-0 start-50 translate-middle">
          TeachCall
        </h1>
        <h1 className="d-lg-none display-2 text-center">TeachCall</h1>

        <div className="row d-flex d-lg-none">
          <div className="col-12">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <div className="d-flex d-lg-none justify-content-center">
                  <h1 className="d-block" style={{ lineHeight: '5vh' }}>
                    <span className="" style={{ whiteSpace: 'nowrap' }}>
                      Aprendizaje efectivo{' '}
                    </span>
                    <br />
                    <span className="" style={{ whiteSpace: 'nowrap' }}>
                      para tus clases de{' '}
                    </span>
                    <br />
                    <span
                      className=""
                      ref={elemSmall}
                      style={{ whiteSpace: 'nowrap' }}
                    />
                    <br />
                    donde quieras
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row d-lg-flex d-none">
          <div className="col-6  d-flex align-items-center">
            <div className="jumbotron jumbotron-fluid ps-3">
              <div className="d-flex">
                <h1 className="d-block" style={{ lineHeight: '5vh' }}>
                  <span className="" style={{ whiteSpace: 'nowrap' }}>
                    Aprendizaje efectivo{' '}
                  </span>
                  <br />
                  <span className="" style={{ whiteSpace: 'nowrap' }}>
                    para tus clases de{' '}
                  </span>
                  <span
                    className=""
                    ref={elem}
                    style={{ whiteSpace: 'nowrap' }}
                  />
                  <br />
                  donde quieras
                </h1>
              </div>
            </div>
          </div>

          <div className="col-6 d-flex align-items-center">
            <div className="">
              <img
                src={dashboardImg}
                alt=""
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center mt-5">
          <div className=" col-sm-10 col-md-8 col-lg-8 d-flex justify-content-center">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
