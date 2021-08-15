import { useState, useEffect } from "react";
import { Formulario } from "./componentes/Formulario";
import { ListadoImagenes } from "./componentes/ListadoImagenes";

function App() {
const [ termino, guardarTermino ] = useState("");
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaActual, guardarPaginActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (termino === "") return;

      const imagenesPorPagina = 30;
      const apiKey = "19783336-0b030925e44a2687486bd8837";
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${termino}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      
      const consulta = await fetch(url);
      const data = await consulta.json();

      guardarImagenes(data.hits);

      const calcularPaginas = Math.ceil( data.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularPaginas);

      //mover la pantalla hacia arriba.
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({  behavior: 'smooth' });
    }
    consultarAPI();
  }, [ termino,paginaActual ]);

  //definir la página anterior

  const paginaAnterior = () =>{
    let nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual === 0){
      return null;
    }
    guardarPaginActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () =>{
    let nuevaPaginaActual = paginaActual + 1;
    if(nuevaPaginaActual > totalPaginas){
      return null;
    }
    guardarPaginActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarTermino={guardarTermino} />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes={imagenes}
        />
        {
        (paginaActual === 1) ? null : 
        <button
          type='button'
          className='bbtn btn-info mr-1'
          onClick={paginaAnterior}
        >&laquo; Anterior</button>
        }
        
        {
        (paginaActual === totalPaginas) ? null :
          <button
            type='button'
            className='bbtn btn-info mr-1'
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
