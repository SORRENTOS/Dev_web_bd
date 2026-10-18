import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Modal from './components/Modal';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
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
        if (!response.ok) throw new Error('error HTTP: ${response.status}');
        
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
    alert(`¡Intentaste agregar la tarea: "${titulo}"!`);
  };

  /*const handleCompletar = (id) => {
    alert(`¡Intentaste cambiar el estado de la tarea con ID: ${id}!`);
  };*/

  /*para probar*/
  const handleCompletar = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const handleEliminar = (id) => {
    alert(`¡Intentaste eliminar la tarea con ID: ${id}!`);
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
      
      <TaskList 
        tareas={tareas} 
        onCompletar={handleCompletar} 
        onEliminar={handleEliminar} 
      />
      
    </div>
  );
}

export default App;