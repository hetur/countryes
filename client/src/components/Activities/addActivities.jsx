import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import style from "./AddActivities.module.css";
import { Link } from "react-router-dom";
import { postActivity } from "../../redux/action";

export default function AddActivities() {
  let dispatch = useDispatch(); //esta variable se utiliza para enviar acciones al store
  let history = useHistory(); //esta variable se utilisa para el historial de navegacion y redireccionar
  let allCountries = useSelector((state) => state.countries); //esta variable obtiene de la funcion que obtiene el estado global de paises 

  const [error, setError] = useState({ //en la constate error se define un objeto para los posibles errorres en el formulario
    countryId: [],
    name: "",
    physicalDifficulty: "",
    technicalDifficulty: "",
    duration: "",
    season: "",
  });

  const [country, setCountry] = useState({ //esta funcion define un estado local que representa los datos del formulario
    countryId: [],
    name: "",
    physicalDifficulty: "",
    technicalDifficulty: "",
    duration: "",
    season: "",
  });

  function validate(country) { //Toma el objeto country como argumento para hacer las validaciones
    let error = {};
    if (!country.countryId) {
      error.countryId = "Seleccione un país";
    } else if (!country.name) {
      error.name = "Seleccione la actividad";
    } else if (!country.duration) {
      error.duration = "Seleccione Duración";
    } else if (!country.physicalDifficulty) {
      error.physicalDifficulty = "Seleccione Difficultad";
    }
    else if (!country.technicalDifficulty) {
      error.technicalDifficulty = "Seleccione el grdo de dificultad";
    } else if (!country.season) {
      error.season = "selecciobe la Estacion";
    }
    return error; //devuelve el objeto error con los mensajes de error
  };

  function onInputChange(e) { //maneja los cambios del formulario
    e.preventDefault();
    setCountry({ //ctualiza el estado local
      ...country,
      [e.target.name]: e.target.value //Actualiza la propiedad con el nuevo valor
    });
    setError(validate({
        ...country,
        [e.target.name]: e.target.value
      }));
  }

  function handleSelect(e) { //esta funcion se ejecutancuando se selecciona un pais en el formulario y actualiza la variable de estado country
    let existe = country.countryId.includes(e.target.value);
    if (!existe) {
      setCountry({
        ...country,
        countryId: [...country.countryId, e.target.value]
      });
    };
  };

  function handleDelete(el) { //esta funcion borra un pais seleccionado
    setCountry({
      ...country,
      countryId: country.countryId.filter(id => id !== el)
    });
  };

  function onSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(country);
    setError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {

      dispatch(postActivity(country)); 

      alert("Su actividad ha sido creada satisfactoriamnte");
      setCountry({
        countryId: "",
        name: "",
        physicalDifficulty: "",
        technicalDifficulty: "",
        duration: "",
        season: ""
      });
      history.push("/home");
    }
  };

  return (
    <div className={style.div}>
      <Link
       className={style.link} to="/home">
        <br />
         <button className={style.button}>Volver a pagina de inicio</button>
       </Link>
      <h1 className={style.h1}>CREAR UN ACTIVIDAD</h1>
    
    <div className={style.form}>  
      <form onSubmit={onSubmit}>
        <div>
          <h3 className={style.h3}>Seleccione un pais para la actividad</h3>
          <br />
          <select
            className={style.select}
            name="countryId"
            onChange={handleSelect}
            value={country.countryId}>
            <option value="Select Country Name" key={-1}>Seleccione un País</option>
            {allCountries && allCountries
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((country, i) => (
                  <option value={country.id} key={i}>
                    {country.name} ({country.id})
                  </option>
                ))}
            {error.countryId && <p>{error.countryId}</p>}
          </select>

          <div>
            {country.countryId.map((el) => 
            (<div>
                <button
                   className={style.x}
                   onClick={(e) => handleDelete(el)}>
                  ❌ Eliminar pais   {el}
                </button>
              </div>
            ))}
          </div>

          <br />
          <h3 className={style.h3}>Actividad:</h3>
          <select
            className={style.select}
            name="name"
            onChange={onInputChange}
            value={country.name}
          >
            <option value="Select Activity Name">Selecione Actividad</option>
            <option value="Adventure Turism">Turismo de Aventura</option>
            <option value="Art gallery tours"> Tour por Galeria de Arte</option>
            <option value="Bádminton">Bádminton </option>
            <option value="Basketball">Basketball</option>
            <option value="Boxing">Boxeo </option>
            <option value="City walking tours">Visitar Ciudades </option>
            <option value="Climbing">Escalar</option>
            <option value="Cricket">Cricket </option>
            <option value="Cycling tours">Ciclismo</option>
            <option value="Farm visits ">Tour por Granjas</option>
            <option value="Fencing">Esgrima</option>
            <option value="Fishing">Pesca</option>
            <option value="Football">Football </option>
            <option value="Gastronomic Tour">Tour gastronomico</option>
            <option value="Golf">Golf</option>
            <option value="Hiking">Senderismo</option>
            <option value="Historical tours">Tours Monumentos</option>
            <option value="Hockey">Hockey</option>
            <option value="Horse Riding">Equitación</option>
            <option value="Kayaking">Kayak</option>
            <option value="Marathons">Marathon</option>
            <option value="Martial Arts">Artes Marciales</option>
            <option value="Music festivals">Recitales</option>
            <option value="Museum visits">Visita a Museos </option>
            <option value="Ping Pong">Ping Pong</option>
            <option value="Racing">Automovilismo</option>
            <option value="Rugby">Rugby</option>
            <option value="Scuba and snorkel diving">Submarinismo</option>
            <option value="Skating">Patinaje</option>
            <option value="Skydiving">Sky</option>
            <option value="Snowboard">Snowboard</option>
            <option value="Soccer">Futbol</option>
            <option value="Sport Competition">Deportes</option>
            <option value="Swimming">Natacion</option>
            <option value="Tennis">Tenis</option>
            <option value="Theme parks">Parques temáticos</option>
            <option value="Triathlons">Triatlon</option>
            <option value="Volley">Volley</option>
            <option value="Waterpolo">Waterpolo</option>
            <option value="Wildlife watching">Tours Vida Silvestre</option>
            <option value="Wine tasting ">Degustacíon de vinos</option>
            <option value="Yoga retreats">Yoga</option>
            {error.name && <option>{error.name} </option>}
          </select>
        </div>

        <div>
          <h3 className={style.h3}>Duración:</h3>
          <select
            className={style.select}
            onChange={onInputChange}
            name="duration"
            type="text"
            value={country.duration}
          >
            <option value="Duration">Seleccione duración</option>
            <option value="1">1 hora</option>
            <option value="2">2 hora</option>
            <option value="3">3 hora</option>
            <option value="4">4 hora</option>
            <option value="5">mas de 5 horas</option>
            {error.duration && (
               <option>
                {error.duration}
                </option>
                )};
          </select>
        </div>

        <div>
          <h3 className={style.h3}>Dificultad</h3>
          <select
            className={style.select}
            name="physicalDifficulty"
            onChange={onInputChange}
            value={country.physicalDifficulty}
          >
            <option value="Select Difficulty">Seleccione Dificultad</option>
            <option value="1">1-Ligero</option>
            <option value="2">2-Moderado</option>
            <option value="3">3-Normal</option>
            <option value="4">4-Fuerte</option>
            <option value="5">5-Muy Fuerte</option>
            {error.physicalDifficulty && (
              <option>
                {error.physicalDifficulty}
              </option>
            )};           
          </select>
        </div>

        <div>
          <h3 className={style.h3}>Grado de Dificultad</h3>
          <select
            className={style.select}
            name="technicalDifficulty"
            onChange={onInputChange}
            value={country.technicalDifficulty}
          >
            <option value="Degree of Difficulty">Seleccione el grado de dificultad</option>
            <option value="1">1-Principiante</option>
            <option value="2">2-Facil</option>
            <option value="3">3-Moderado</option>
            <option value="4">4-Desafiante</option>
            <option value="5">5-Profesional</option>
            {error.technicalDifficulty && (
              <option>
                {error.technicalDifficulty}
              </option>
            )};
          </select>
        </div>

        <div>
          <h3 className={style.h3}>Estación</h3>
          <select
            className={style.select}
            name="season"
            onChange={onInputChange}
            value={country.season}
          >
            <option value="Select Season">Seleccione la Estación</option>
            <option value="Spring">Primvera</option>
            <option value="Summer">Verano</option>
            <option value="Fall">Otoño</option>
            <option value="Winter">Invierno</option>
            {error.season && ( 
                <option>
                  {error.season}
                </option>
                )};
          </select>
        </div>
        <br />
        <center>
          <button
            className={`${style.button} 
                        ${(!country.name ||
                      !country.countryId ||
                      !country.technicalDifficulty
                      || !country.physicalDifficulty
                      || !country.season
                      || !country.duration) ? style.disabled: ''}`}
            type="submit"
            onClick={onSubmit}
            onChange={onInputChange}
            disabled={
              !country.name
              || !country.countryId
              || !country.technicalDifficulty
              || !country.physicalDifficulty
              || !country.season
              || !country.duration}>
            Crear Actividad
          </button>
          <select id="errors" defaultValue={Object.values(error)}>
            {Object.values(error).length === 0 ? (<option value="">Todos los Campos Completos</option>)
             : (
                <option
                  value={JSON.stringify(error)}>{Object.values(error)}
              </option>)}
          </select>
        </center>
      </form>
     </div>
    </div>
  );
}

/*
A continuación, explicaré su funcionalidad en términos generales:
-Importaciones: 
El código comienza importando diferentes paquetes y funciones de React 
y de su framework Redux. También se importan algunos estilos de un archivo CSS local 
y dos funciones que se utilizarán más adelante en el código.

-Componente AddActivities: 
Esta es la función principal que se exporta y que contiene todo el código. 
Este componente utiliza varios hooks de React, como useState, useDispatch, useSelector 
y useHistory, que se explicarán más abajo.

-Variables de estado: 
El componente define dos variables de estado utilizando el hook useState de React: 
una para guardar los errores que se puedan presentar en el formulario 
y otra para guardar la información de la actividad que se están creando. 
Ambas variables de estado tienen la misma estructura: 
un objeto con diferentes propiedades, como: 
countryId (el identificador del país), 
name (el nombre de la actividad), 
physicalDifficulty (la dificultad física de la actividad), 
technicalDifficulty (la dificultad técnica de la actividad), 
duration (la duración de la actividad) 
y season (la temporada o estación en la que se realiza la actividad).

-Función validate: 
Esta función se encarga de validar los campos del formulario 
y devuelve un objeto con los errores encontrados. 
Si todos los campos están completos, devuelve un objeto vacío. 
Se utiliza en la función onSubmit, que se explicará más abajo.

-Función onInputChange: 
Esta función se ejecuta cada vez que hay un cambio en uno de los campos del formulario 
y actualiza la variable de estado "country" con el valor correspondiente. 
Además, utiliza la función "validate" para actualizar la variable de estado "error" 
con los errores correspondientes.

-Función handleSelect: 
Esta función se ejecuta cuando se selecciona un país en el formulario 
y actualiza la variable de estado "country" con el valor correspondiente. 
También utiliza la función "validate" para actualizar la variable de estado "error" 
con los errores correspondientes.

-Función handleDelete: 
Esta función se ejecuta cuando se elimina un país seleccionado en el formulario 
y actualiza la variable de estado country con el valor correspondiente.

-Función onSubmit: 
Esta función se ejecuta cuando se envía el formulario y valida los campos utilizando 
la función "validate". Si no hay errores, utiliza la función "postActivity" 
del paquete Redux para enviar la información de la actividad al servidor 
y mostrar una alerta de éxito. 
También resetea las variables de estado "country" y "error" y redirige al usuario 
a la página de inicio.

-Return: 
En la última sección de mi código, 
se presenta el JSX que se renderiza en el navegador. 
Este JSX incluye varios elementos HTML y utiliza las variables de estado 
y las funciones explicadas anteriormente para crear el formulario 
y mostrar los errores en tiempo real. 
Además, incluye un botón para volver a la página de inicio 
y un título que indica que se está creando una actividad.
*/
