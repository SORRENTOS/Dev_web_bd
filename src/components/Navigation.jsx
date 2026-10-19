const Navigation = ({ vistaActiva, onCambiarVista }) => {
  return (
    <nav className="nav-container">
      <button
        type="button"
        className={`nav-tab ${vistaActiva === "resumen" ? "nav-tab-active" : ""}`}
        onClick={() => onCambiarVista("resumen")}
      >
        📊 Resumen
      </button>
      <button
        type="button"
        className={`nav-tab ${vistaActiva === "tareas" ? "nav-tab-active" : ""}`}
        onClick={() => onCambiarVista("tareas")}
      >
        📋 Tareas
      </button>
      <button
        type="button"
        className={`nav-tab ${vistaActiva === "nueva" ? "nav-tab-active" : ""}`}
        onClick={() => onCambiarVista("nueva")}
      >
        ➕ Nueva Tarea
      </button>
    </nav>
  );
};

export default Navigation;
