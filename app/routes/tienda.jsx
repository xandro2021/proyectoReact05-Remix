import { getGuitarras } from '~/models/guitarras.server';

export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras;
}

function Tienda() {

  return (
    <h1>Compra en nuestra tienda</h1>
  );
}

export default Tienda;
