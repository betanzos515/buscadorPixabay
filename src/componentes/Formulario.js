import React, { useState } from 'react'
import { Error } from './Error';

export const Formulario = ({ guardarTermino }) => {
    
    const [ busqueda, guardarBusqueda ] = useState('')
    const [ error , guardarError ] = useState(false);
    
    const handleSubmit = ( e )=>{
        e.preventDefault();
        console.log('Enviando ...');
        console.log(error);
        if( busqueda.trim() === '' ){
            guardarError(true);
            return
        }
        guardarError(false);
        guardarTermino(busqueda);
    }
    return (
        <form onSubmit={ handleSubmit }>
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input
                        type='text'
                        value={ busqueda }
                        className='form-control form-control-lg'
                        placeholder='Busca una imagen, ejemplo: futbol o café'
                        onChange={   e => guardarBusqueda(e.target.value) }
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Buscar'
                    />
                </div>
            </div>
            { error ? <Error mensaje='Agrega un término de búsqueda' /> : null }
        </form>
    )
}
