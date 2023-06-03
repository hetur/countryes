import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountry } from '../../redux/action';
import Country from "../Country/country";
import Paginated from "../Paginated/paginated";
import SearchBar from "../SearchBar/searchBar";
import Order from "../Order/order";
import style from './Home.module.css';
import { Link } from "react-router-dom";



export default function Home() {
    let allCountries = useSelector((state) => state.filterCountries);
    /*
    Uso el hook "useSelector" de Redux para obtener el estado de "filterCountries" 
    del store global de Redux y le asigno a la variable "allCountries".       
    */
    let dispatch = useDispatch(); //Uso el hook "useDispatch" de Redux para enviar acciones al store global de Redux y le asigno a la variable "dispatch" .

    let [currentPage, setCurrentPage] = useState(1); 
    /*
    Uso el hook "useState" de React para crear un estado local llamado "currentPage" 
    y le asigno la variable "setCurrentPage". 
    El valor inicial de "currentPage" es 1.
    ------------------------------------------------------------*/
    let [countriesPerPage] = useState(10);//Creo una constante llamada "countriesPerPage" y le asigno el valor 10.
    let indexOfLastCountry = (currentPage * countriesPerPage);
    /*
    Calculo el índice del último país de la página actual multiplicando 
    "currentPage" por "countriesPerPage" y le asigno la variable "indexOfLastCountry".
    */
    let indexOfFirstCountry = (indexOfLastCountry - countriesPerPage);
    /*
    Calculo el índice del primer país de la página actual 
    restando "countriesPerPage" del índice del último país de la página actual 
    y le asigno la variable "indexOfFirstCountry".
    */
    let currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    /*
    Uso el método "slice" de JavaScript para extraer un subconjunto de "allCountries" 
    que va desde "indexOfFirstCountry" hasta "indexOfLastCountry" 
    y le asigno la variable "currentCountries".
    */
   
    let paginated = (pageNumber) => { setCurrentPage(pageNumber) };
    /*
    Defino una función llamada "paginated" 
    que toma de argumento "pageNumber" y se lo asigno a "setCurrentPage".
    --------------------------------------------------------------*/

    function handleOnclick(e) {
        e.preventDefault();
        dispatch(fetchCountry())
    };
    /*
    Defino una función llamada "handleOnclick" 
    que toma un evento "e" como argumento y llama a "fetchCountry" usando "dispatch". 
    Previene el comportamiento predeterminado del evento con "preventDefault" para que no se refresque la página.
    */

    return (
        <div>
            <Link to='/add' className={style.textoSinEstilo}>
                    <button className={style.by}>Crear Actividad</button>
                </Link>
                  <Link to="/" className={style.textoSinEstilo}>
                    <button className={style.by}> Volver  la pagina de inicio </button>
                </Link>
                       
            <h1 className={style.h1}>Paises del Mundo</h1>
            <SearchBar />
            <Order />
            <center>
                <input
                    type='submit'
                    value='TODOS LOS PAISES'
                    className={style.allcountries}
                    onClick={e => { handleOnclick(e) }}
                />
               
            </center>
            {currentCountries?.map((country) => {
                return <Country
                    key={country.id}
                    name={country.name}
                    population={country.population}
                    continent={country.continent}
                    flag={country.flag}
                    id={country.id}
                />
            })}
            <Paginated
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginated={paginated}
                
            />
           
        </div>
    );
};
/*
Este componente renderiza una lista de países, 
que pueden ser filtrados y ordenados, 
y una barra de búsqueda para buscar países específicos. 
*/