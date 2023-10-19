import imagen from '../../public/img/nosotros.jpg';
import styles from '~/styles/nosotros.css';

export function meta() {
  return (
    [
      { title: 'GuitarLA - Nosotros' },
      { description: 'Venta de guitarras, blog de musica' }
    ]
  )
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros() {

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img alt="imagen sobre nosotros" src={imagen} />

        <div>
          <p>
            Massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.
            In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus, dictum at tempor commodo, ullamcorper a lacus vestibulum. Et pharetra pharetra, massa massa.
          </p>

          <p>
            Amet facilisis magna etiam tempor, orci eu lobortis elementum, nibh tellus molestie nunc, non blandit massa enim nec dui nunc mattis enim ut tellus. Phasellus egestas tellus rutrum tellus pellentesque.
          </p>
        </div>

      </div>
    </main>
  );
}

export default Nosotros;
