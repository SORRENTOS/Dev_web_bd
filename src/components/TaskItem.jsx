import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

const TaskItem = ({
  tarea,
  onToggle,
  onEliminar,
  onEditar,
  guardando = false,
}) => {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tarea.titulo);

  const guardarEdicion = () => {
    const textoLimpio = nuevoTitulo.trim();
    if (textoLimpio.length >= 3 && textoLimpio !== tarea.titulo) {
      if (onEditar) {
        onEditar(tarea.id, textoLimpio);
      }
    } else {
      setNuevoTitulo(tarea.titulo);
    }
    setEditando(false);
  };

  const manejarKeyDown = (e) => {
    if (e.key === "Enter") {
      guardarEdicion();
    } else if (e.key === "Escape") {
      setNuevoTitulo(tarea.titulo);
      setEditando(false);
    }
  };

  return (
    <li className="task-item">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <Badge
          texto={tarea.completada ? "completada" : "pendiente"}
          onClick={() => onToggle(tarea.id, tarea.completada)}
        />
        {editando ? (
          <input
            type="text"
            className="task-input"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            onKeyDown={manejarKeyDown}
            onBlur={guardarEdicion}
            autoFocus
            disabled={guardando}
            style={{ padding: "4px 8px", fontSize: "0.95rem" }}
          />
        ) : (
          <span
            onDoubleClick={() => setEditando(true)}
            title="Doble clic para editar"
            style={{
              textDecoration: tarea.completada ? "line-through" : "none",
              color: tarea.completada ? "#94a3b8" : "inherit",
              cursor: "pointer",
              flex: 1,
            }}
          >
            {tarea.titulo}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <Button
          label={tarea.completada ? "Desmarcar" : "Completar"}
          onClick={() => onToggle(tarea.id, tarea.completada)}
          variant={tarea.completada ? "success" : "primary"}
          disabled={guardando}
        />
        <Button
          label="Eliminar"
          onClick={() => onEliminar(tarea.id)}
          variant="danger"
          disabled={guardando}
        />
      </div>
    </li>
  );
};

export default TaskItem;
