const TaskSummary = ({
  total = 0,
  completadas = 0,
  pendientes = 0,
  mostrando = 0,
  filtroActual = "todas",
}) => {
  return (
    <div className="summary-grid">
      <div className="summary-item">
        <p className="summary-numero">{total}</p>
        <p className="summary-label">Total</p>
      </div>
      <div className="summary-item">
        <p className="summary-numero" style={{ color: "#16a34a" }}>
          {completadas}
        </p>
        <p className="summary-label">Completadas</p>
      </div>
      <div className="summary-item">
        <p className="summary-numero" style={{ color: "#f59e0b" }}>
          {pendientes}
        </p>
        <p className="summary-label">Pendientes</p>
      </div>
      <div className="summary-item">
        <p className="summary-numero" style={{ color: "#0f172a" }}>
          {mostrando}
        </p>
        <p className="summary-label">Mostrando ({filtroActual})</p>
      </div>
    </div>
  );
};

export default TaskSummary;