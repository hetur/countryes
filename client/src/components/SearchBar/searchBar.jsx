import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountry } from '../../redux/action';
import './searchBar.css';


export default function SearchBar() {
    const [search, setSearch] = useState('');//aqui el hook maneja el valor del input
    let dispatch = useDispatch();//se utiliza la funcion para enviar acciones al store de Redux
    const countriesAll = useSelector((state) => state.countries);// se obtiene el array de paises de el store de redux

    function onSubmit(e) { //esta funcion se activa al enviar el formulario
        e.preventDefault();
        if (search.trim() === '') {
            alert('Ingrese un país.'); //verifica si el input esta vacio 
            return;
        }
        const toSearch = search.toLowerCase();
        const validate = countriesAll.filter((el) =>
            el.name
                .toLowerCase()
                .includes(toSearch)
        );
        if (validate.length < 1) {
            return alert('El país buscado no existe');
        } else {
            dispatch(searchCountry(search));//se envia una acion al store 
            setSearch('');
        };
    };

    function onInputChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return <div>
        <form
            onSubmit={onSubmit}
        >
            <input
                type='text'
                placeholder='Ingresar el país'
                onChange={onInputChange}
                value={search} />
            <input
                type='submit'
                value='Buscar' />
        </form>
    </div>
};
