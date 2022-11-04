import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

  //Citas guardadas en localstorage verificar
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Citas
  const [todasCitas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(todasCitas));
    }else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [todasCitas]);

  //Tomar citas actuales y guardar las nuevas
  const crearCita = cita => {
    guardarCitas([
      ...todasCitas,
      cita
    ])
  }

  //Eliminar citas
  const eliminarCita = id => {
    const nuevasCitas = todasCitas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas)
  }

  //Validar mensaje a mostrar
  const mensajeTitulo = todasCitas.length !== 0 ? 'Administra tus citas' : 'No hay citas';


  return (
    <Fragment>
      <h1> Administrador de pacientes </h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{mensajeTitulo}</h2>
            {todasCitas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
