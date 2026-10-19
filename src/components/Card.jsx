const Card = ({ titulo, children, Children }) => {
  return (
    <div className="card">
      {titulo && <h2 className="section-title">{titulo}</h2>}
      {children || Children}
    </div>
  );
};

export default Card;