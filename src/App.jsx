import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Modal from './components/Modal';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useTareas from './hooks/useTareas';

const App = () => {
  // tutorial11
  // traemos los estados y las funciones desde el custom hook
  const { tareas, cargando, error, crearTarea, actualizarTarea, eliminarTarea } = useTareas();
  // estado para controlar la tarea que se va a eliminar en el modal
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  /* ------------
     importante!: se comenta el estado original y el fetch de el david y el nico para que 
     no choque con el tutorial 11, pero se conserva aqui abajo
  -------------
  // Datos temporales para visualizar la interfaz
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("taskcampus-tareas");
    return guardadas ? JSON.parse(guardadas) : []
    });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hayDatosLocales = localStorage.getItem("taskcampus-tareas");
    if (hayDatosLocales) return;

    const cargarDesdeAPI = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        if (!response.ok) throw new Error(`error HTTP: ${response.status}`);
        
        const data = await response.json();
        
        const tareasAdaptadas = data.map((item) => ({
          id: item.id,
          titulo: item.title,
          completada: item.completed,
        }));

        setTareas(tareasAdaptadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarDesdeAPI();
  }, []);  
  ------*/
  useEffect(() => {
    localStorage.setItem("taskcampus-tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus  (${pendientes} pendientes)`;
  }, [tareas]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("taskCampus activo");
    }, 5000);

    return () => clearInterval(timer);
  }, []);

/*
funciones de abajo son previas a los cambios hechos por david y nico
 son diferentes a las de los tutoriales no se si hagan lo mismo o hay que cambiarlas xd (tuto 9)
*/

  const handleAgregarTarea = async (titulo) => {
    // alert(`¡Intentaste agregar la tarea: "${titulo}"!`);
    crearTarea(titulo); //  tutorial 11
  };

  /*const handleCompletar = (id) => {
    alert(`¡Intentaste cambiar el estado de la tarea con ID: ${id}!`);
  };*/

  /*para probar*/
  // tutorial 11: modificado para recibir el estado completada actual
  const handleToggleCompletada = (id, completadaActual) => {
    // codigo anterior comentado:
    /*
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
    */
    // se conecta al tutorial 11 !!
    actualizarTarea(id, { completada: !completadaActual });
  };

  const handleEliminar = (id) => {
    // alert(`¡Intentaste eliminar la tarea con ID: ${id}!`);
    setTareaAEliminar(id); // tutorial11
  };

  // tutorial 11: nueva funcion para confirmar la eliminacion en el modal
  const handleConfirmarEliminacion = () => {
    eliminarTarea(tareaAEliminar);
    setTareaAEliminar(null);
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestor de tareas académicas" />
      

      <div className="card">
        <h2 className="section-title">Resumen de tareas</h2>
        <TaskSummary 
          total={tareas.length} 
          completadas={tareas.filter(t => t.completada).length} 
          pendientes={tareas.filter(t => !t.completada).length} 
          mostrando={tareas.length} 
          filtroActual="todas" 
        />
      </div>

      <TaskForm onAgregar={handleAgregarTarea} />
      
      {cargando && <p className="estado-carga" style={{textAlign: "center"}}> Cargando tareas...</p>}
      {error && <p className="estado-error" style={{textAlign: "center"}}> Error: {error}</p>}
           
      {!cargando && !error && (
        <TaskList 
          tareas={tareas} 
          onCompletar={(id) => handleToggleCompletada(id, tareas.find((t) => t.id === id)?.completada)} 
          onEliminar={handleEliminar} 
        />
      )}
      
      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
      />
      
    </div>
  );
}

export default App;