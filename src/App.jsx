import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  // Datos temporales para visualizar la interfaz
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Aprender qué es React", completada: false },
    { id: 2, titulo: "Crear proyecto con Vite", completada: true },
    { id: 3, titulo: "Practicar JSX", completada: false },
  ]);

  const handleAgregarTarea = (titulo) => {
    alert(`¡Intentaste agregar la tarea: "${titulo}"!`);
  };

  const handleCompletar = (id) => {
    alert(`¡Intentaste cambiar el estado de la tarea con ID: ${id}!`);
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