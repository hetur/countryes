import React from "react"; //importo la biblioteca react (se utiliza generalmente para construir interfaces de usuario en spa)
import { Link } from 'react-router-dom'; //se import para crear enlaces a rutas.
import style from './landPage.module.css'; //estilos para que solo afecten a este componente
import github from "../../img/github.png";//
import linkedIn from "../../img/linkedIn.png";//



export default function LandingPage(){
    return (
        <div>
            <h2 className={style.titulo1}>PARA INGRESAR A VER PAISES CLICK DONDE SE INDICA</h2>
                <Link
                    className={style.link}
                    to='/Home'
                >
                    <input  
                        className={style.boton}
                        type='submit'
                        value='CLICK AQUI'
                    />
                </Link>
            <p className={style.parrafo}> Developer Hector Ricardo Lopez Pepa <br />
                                          Proyecto individual HENRY <br />
                                          PAISES DEL MUNDO <br />
                                          TECNOLOGIAS:**React**, **Redux**, **Node**, **Express** y **Sequelize**.</p>

            <div className={style.containerIcons}>
                <a href="https://github.com/hetur" target="_blank"
                rel="noopener noreferrer"><img className={style.socials} src={github} alt="github" /></a>
                <a href="https://www.linkedin.com/in/hector-ricardo-lopez-pepa-040621a4/" target="_blank"
                rel="noopener noreferrer"><img className={style.socials} src={linkedIn} alt="linkdlin" /></a>
               
          </div>
        </div>
    );
}; 