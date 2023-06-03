import { useDispatch } from 'react-redux';
import {
  ASCENDING,
  DESCENDING,
  HIGHEST,
  LOWER
} from '../../redux/const/sort.js';
import {
  filterCountryByActivity,
  filterCountryByCountinent,
  filterCountryByPopulation,
  sort
} from '../../redux/action';
import style from './order.module.css'


export default function Order() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    dispatch(sort(e.target.value))
  };

  function handleFilterCountinent(e) {
    console.log(e.target.value);
    dispatch(filterCountryByCountinent(e.target.value))
  };

  function handleFilterActivity(e) {
    dispatch(filterCountryByActivity(e.target.value))
  };

  function handleFilterPopulation(e) {
    dispatch(filterCountryByPopulation(e.target.value))
  };

  return <div >
    <h2 className={style.tituloOrder}>FILTRAR -- POR POBLACIÓN-- POR CONTINENTE-- POR ATICIVIDADES</h2>
    <select name="select" onChange={onSelectChange}>
      <option value="ABC Order" > Ordenar de A-Z o Z-A </option>
      <option value={ASCENDING} > ASCENDENTE </option>
      <option value={DESCENDING} > DESCENDENTE </option>
    </select>
    <select name="select" onChange={handleFilterPopulation}>
      <option value="Select Population Amount Order" > ORDENAR POR POBLACIÓN </option>
      <option value={HIGHEST} > MAS ALTA </option>
      <option value={LOWER} > MAS BAJA </option>
    </select>
    <select name='select' onChange={handleFilterCountinent} >
      <option value="Select Continent Order">Seleccione Continente</option>
      <option value="Asia">ASIA</option>
      <option value="North America">AMERICA DEL NORTE</option>
      <option value="South America">AMERICA DEL SUR</option>
      <option value="Africa">AFRICA</option>
      <option value="Antarctica">ANTARTIDA</option>
      <option value="Oceania">OCEANIA</option>
      <option value="Europe">EUROPA</option>
    </select>
    <select name='select' onChange={handleFilterActivity} >
      <option value="Select Activity Name">Selecione Actividad</option>
      <option value="Adventure Turism">Turismo de Aventura</option>
      <option value="Art gallery tours"> Tour por Galeria de Arte</option>
      <option value="Bádminton">Bádminton </option>
      <option value="Basketball">Basketball</option>
      <option value="Boxing">Boxeo</option>
      <option value="City walking tours">Visitar Ciudades</option>
      <option value="Climbing">Escalar</option>
      <option value="Cricket">Cricket </option>
      <option value="Cycling tours">Ciclismo</option>
      <option value="Farm visits ">Tour por Granjas</option>
      <option value="Fencing">Esgrima</option>
      <option value="Fishing">Pesca</option>
      <option value="Football">Football</option>
      <option value="Gastronomic Tour">Tour gastronomico</option>
      <option value="Golf">Golf</option>
      <option value="Hiking">Senderismo</option>
      <option value="Historical tours">Tours Monumentos</option>
      <option value="Hockey">Hockey</option>
      <option value="Horse Riding">Equitación</option>
      <option value="Kayaking">Kayak</option>
      <option value="Marathons">Marathon</option>
      <option value="Martial Arts">rtes Marciales</option>
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
      <option value="Sport Competition">Deprtes</option>
      <option value="Swimming">Natacion</option>
      <option value="Tennis">Tenis</option>
      <option value="Theme parks">Parques temáticos</option>
      <option value="Triathlons">Triatlon</option>
      <option value="Volley">Volley</option>
      <option value="Waterpolo">Waterpolo</option>
      <option value="Wildlife watching">Tours Vida Silvestre</option>
      <option value="Wine tasting ">Degustación de Vinos</option>
      <option value="Yoga retreats">Yoga</option>
    </select>
  </div>
};