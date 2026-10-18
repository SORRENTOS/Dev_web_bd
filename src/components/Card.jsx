import { Children } from "react";

const Card = ({titulo, Children}) => {
    return (
        <div className="card">
             {titulo && <h2 className="section-tittle">{titulo}</h2>}
             {Children}
        </div>
    );
};

export default Card;