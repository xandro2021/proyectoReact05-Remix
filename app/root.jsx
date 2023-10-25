import { useState, useEffect } from 'react';
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useCatch,
  Link
} from '@remix-run/react';
import styles from '~/styles/index.css';
import Header from '~/components/header';
import Footer from '~/components/footer';

export function meta() {
  return (
    {
      charset: 'utf-8',
      title: 'GuitarLA - Remix',
      viewport: 'width=device-width,initial-scale=1'
    }
  )
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export default function App() {
  // Si existe window significa que estamos en el cliente por lo que podemos usar el local storage, de lo contrario no haga nada (null)
  // const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null;
  // const [carrito, setCarrito] = useState(carritoLS);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Verifico que carrito tenga algo antes de guardarlo en el storage para evitar borrar todo al recargar la pagina en el primer renderizado
    if (carrito?.length === 0) return;
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const carritoLS = JSON.parse(localStorage.getItem('carrito')) ?? [];
    setCarrito(carritoLS);
  }, []);



  const agregarCarrito = guitarra => {
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      // Itero sobre el arreglo e indifico el duplicado
      const carritoActualizado = carrito.map(guitarraState => {
        // Reescribo valor de cantidad
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad;
        }

        return guitarraState;
      })

      setCarrito(carritoActualizado);
    }
    else {
      // Registro nuevo carrito
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }

      return guitarraState;
    });

    setCarrito(carritoActualizado);
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id);
    // Debido a la verificacion del useState del carrito que no guarda cuando no hay elementos, entonces se debe hacer manualmente aqui
    carritoActualizado.length === 0 && localStorage.setItem('carrito', '[]');
    setCarrito(carritoActualizado);
  };

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
        }}
      />
    </Document>
  )
}

function Document({ children }) {

  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <Header />
        {children}
        <Footer />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

/* Manejo de Errores */
export function CatchBoundary() {
  const error = useCatch();
  return (
    <Document>
      <p className="error"> {error.status} {error.statusText} </p>

      <Link
        to="/"
        className="error-enlace"
      >Volver a la pagina Principal</Link>
    </Document>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <p className="error"> {error.status} {error.statusText} </p>

      <Link
        to="/"
        className="error-enlace"
      >Volver a la pagina Principal</Link>
    </Document>
  )
}
