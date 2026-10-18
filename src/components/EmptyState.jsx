const EmptyState = ({ mensaje = "No hay tareas disponibles", icono = "📭" }) => {
  return (
    <div style={{ textAlign: "center", padding: "30px", color: "#6b7280" }}>
      <span style={{ fontSize: "2.5rem" }}>{icono}</span>
      <p style={{ marginTop: "10px", fontSize: "1rem" }}>{mensaje}</p>
    </div>
  );
};

export default EmptyState;