import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

const TaskList = ({ tareas, onCompletar, onEliminar }) => {
  const [filtro, setFiltro] = useState("todas");

  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  return (
    <div className="card">
      <h2 className="section-title">Mis tareas</h2>
      
      {/* Botones de filtro */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <Button
          label="📑 Todas"
          onClick={() => setFiltro("todas")}
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button
          label="⏳ Pendientes"
          onClick={() => setFiltro("pendientes")}
          variant={filtro === "pendientes" ? "primary" : "secondary"}
        />
        <Button
          label="✅ Completadas"
          onClick={() => setFiltro("completadas")}
          variant={filtro === "completadas" ? "primary" : "secondary"}
        />
      </div>

      {/* Mensaje si no hay tareas categoría */}
      {tareasFiltradas.length === 0 && (
        <p style={{ textAlign: "center", color: "#94a3b8" }}>
          No hay tareas en esta categoría 🎉
        </p>
      )}

      {/* Lista de tareas */}
      <ul className="task-list">
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id} className="task-item">
            
            {/* ZONA IZQUIERDA: badge + título */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
              <Badge texto={tarea.completada ? "completada" : "pendiente"} />
              <span
                style={{
                  textDecoration: tarea.completada ? "line-through" : "none",
                  color: tarea.completada ? "#94a3b8" : "inherit",
                }}
              >
                {tarea.titulo}
              </span>
            </div>

            {/* ZONA DERECHA: botones */}
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              <Button
                label={tarea.completada ? "Desmarcar" : "Completar"}
                onClick={() => onCompletar(tarea.id)}
                variant={tarea.completada ? "success" : "primary"}
              />
              <Button
                label="Eliminar"
                onClick={() => onEliminar(tarea.id)}
                variant="danger"
              />
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;