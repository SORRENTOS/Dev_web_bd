import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";
import SummaryView from "./views/SummaryView";
import TaskView from "./views/TaskView";
import NewTaskView from "./views/NewTaskView";
import useTareas from "./hooks/useTareas";
import "./App.css";

const App = () => {
  const {
    tareas,
    cargando,
    guardando,
    error,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
  } = useTareas();

  const [vistaActiva, setVistaActiva] = useState("tareas");
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  const tareasFiltradas = tareas.filter((t) => {
    const coincideFiltro =
      filtro === "completadas"
        ? t.completada
        : filtro === "pendientes"
        ? !t.completada
        : true;
    const coincideBusqueda = t.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("TaskCampus activo");
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleAgregarTarea = async (titulo) => {
    await crearTarea(titulo);
    setVistaActiva("tareas");
  };

  const handleToggleCompletada = (id, completadaActual) => {
    actualizarTarea(id, { completada: !completadaActual });
  };

  const handleEditarTitulo = (id, nuevoTitulo) => {
    actualizarTarea(id, { titulo: nuevoTitulo });
  };

  const handleConfirmarEliminacion = () => {
    if (tareaAEliminar !== null) {
      eliminarTarea(tareaAEliminar);
      setTareaAEliminar(null);
    }
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestor de tareas académicas" />

      <Navigation
        vistaActiva={vistaActiva}
        onCambiarVista={setVistaActiva}
      />

      {cargando && (
        <p className="estado-carga">⏳ Cargando tareas...</p>
      )}

      {error && (
        <p className="estado-error">⚠️ Error: {error}</p>
      )}

      {guardando && (
        <p className="estado-guardando">💾 Procesando operación...</p>
      )}

      {!cargando && !error && (
        <>
          {vistaActiva === "resumen" && (
            <SummaryView
              total={tareas.length}
              completadas={tareas.filter((t) => t.completada).length}
              pendientes={tareas.filter((t) => !t.completada).length}
              mostrando={tareasFiltradas.length}
              filtroActual={filtro}
            />
          )}

          {vistaActiva === "tareas" && (
            <TaskView
              tareas={tareasFiltradas}
              filtro={filtro}
              onCambiarFiltro={setFiltro}
              busqueda={busqueda}
              onCambiarBusqueda={setBusqueda}
              onToggle={handleToggleCompletada}
              onEliminar={setTareaAEliminar}
              onEditar={handleEditarTitulo}
              guardando={guardando}
            />
          )}

          {vistaActiva === "nueva" && (
            <NewTaskView
              onAgregar={handleAgregarTarea}
              guardando={guardando}
            />
          )}
        </>
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
      />
    </div>
  );
};

export default App;