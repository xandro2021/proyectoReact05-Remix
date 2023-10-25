import { useState } from 'react';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { getGuitarra } from '~/models/guitarras.server';

export async function loader({ params }) {
  const { guitarraUrl } = params;

  const guitarra = await getGuitarra(guitarraUrl);

  if (guitarra?.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada',
      data: {}
    })
  }

  return guitarra;
}

// Una vez el loader este disponible, la funcion meta tiene la info en data
export function meta({ data }) {
  if (!data) {
    return {
      title: 'GuitarraLA - Guitarra no encontrada',
      description: 'Guitarras, venta de guitarras, guitarra no encontrada'
    }
  }

  return {
    title: `GuitarraLA - ${data?.data[0]?.attributes.nombre}`,
    description: `Guitarras, venta de guitarras, guitarra ${data?.data[0]?.attributes.nombre}`
  }
}

function Guitarra() {
  const { agregarCarrito } = useOutletContext();
  const [cantidad, setCantidad] = useState(0);
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

  const handleSubmit = e => {
    e.preventDefault();

    if (cantidad < 1) {
      alert('Debes selecionar una cantidad');
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    }

    agregarCarrito(guitarraSeleccionada);
  };

  return (
    <div className="guitarra">

      <img className="imagen" alt={`Imagen de la guitarra ${nombre}`} src={imagen.data.attributes.url} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>

          <select
            id="cantidad"
            onChange={e => setCantidad(parseInt(e.target.value))}
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input
            type="submit"
            value="Agregar al carrito"
          />
        </form>
      </div>

    </div>
  );
}

export default Guitarra;
