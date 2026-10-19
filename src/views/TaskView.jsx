import Card from "../components/Card";
import TaskList from "../components/TaskList";

const TaskView = ({
  tareas,
  filtro,
  onCambiarFiltro,
  busqueda,
  onCambiarBusqueda,
  onToggle,
  onEliminar,
  onEditar,
  guardando,
}) => {
  return (
    <Card titulo="Mis Tareas">
      <TaskList
        tareas={tareas}
        filtro={filtro}
        onCambiarFiltro={onCambiarFiltro}
        busqueda={busqueda}
        onCambiarBusqueda={onCambiarBusqueda}
        onToggle={onToggle}
        onEliminar={onEliminar}
        onEditar={onEditar}
        guardando={guardando}
      />
    </Card>
  );
};

export default TaskView;
