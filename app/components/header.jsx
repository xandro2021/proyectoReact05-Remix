import { Link, useLocation } from '@remix-run/react';
import logo from '../../public/img/logo.svg';

function Header() {
  const location = useLocation();
  console.log(location);

  return (
    <header className="header">
      <div className="contenedor barra">

        <Link to="/">
          <img className="logo" alt="Imagen logo" src={logo} />
        </Link>

        <div className="navegacion">
          <Link
            to="/"
          >Inicio</Link>

          <Link
            to="/nosotros"
          >Nosotros</Link>

          <Link
            to="/tienda"
          >Tienda</Link>

          <Link
            to="/blog"
          >Blog</Link>

        </div>

      </div>
    </header>
  );
}

export default Header;
