import Button from "./Button";
import EmptyState from "./EmptyState";
import TaskItem from "./TaskItem";

const TaskList = ({
  tareas = [],
  filtro = "todas",
  onCambiarFiltro,
  busqueda = "",
  onCambiarBusqueda,
  onToggle,
  onEliminar,
  onEditar,
  guardando = false,
}) => {
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Buscar tareas por título..."
          value={busqueda}
          onChange={(e) => onCambiarBusqueda && onCambiarBusqueda(e.target.value)}
          className="task-input"
          style={{ width: "100%", boxSizing: "border-box", marginBottom: "12px" }}
        />

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button
            label="📑 Todas"
            onClick={() => onCambiarFiltro && onCambiarFiltro("todas")}
            variant={filtro === "todas" ? "primary" : "secondary"}
          />
          <Button
            label="⏳ Pendientes"
            onClick={() => onCambiarFiltro && onCambiarFiltro("pendientes")}
            variant={filtro === "pendientes" ? "primary" : "secondary"}
          />
          <Button
            label="✅ Completadas"
            onClick={() => onCambiarFiltro && onCambiarFiltro("completadas")}
            variant={filtro === "completadas" ? "primary" : "secondary"}
          />
        </div>
      </div>

      {tareas.length === 0 ? (
        <EmptyState
          mensaje={
            busqueda
              ? `No se encontraron tareas que coincidan con "${busqueda}"`
              : "No hay tareas en esta categoría"
          }
          icono={busqueda ? "🔍" : "🎉"}
        />
      ) : (
        <ul className="task-list">
          {tareas.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              onToggle={onToggle}
              onEliminar={onEliminar}
              onEditar={onEditar}
              guardando={guardando}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;