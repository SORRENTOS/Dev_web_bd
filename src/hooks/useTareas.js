import { useState, useEffect } from "react";

// URL para reutilizar
const API_URL = "https://jsonplaceholder.typicode.com/todos";

const useTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    // GET - Cargar tareas iniciales
    useEffect(() => {
        const cargarTareas = async () => {
            try {
                // usamos _limit=10 para no traer tantas tareas de prueba
                const response = await fetch(`${API_URL}?_limit=10`);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();

                const tareasAdaptadas = data.map((item) => ({
                    id: item.id,
                    titulo: item.title,
                    completada: item.completed,
                }));

                setTareas(tareasAdaptadas);
            } catch (err){
                setError(err.message);
            } finally{
                setCargando(false);
            }
        };
        cargarTareas();
    }, []);

    //  - crear una nueva tarea
    const crearTarea = async (titulo) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: titulo,
                    completed: false,
                    userId: 1,
                }),
            });
            
            if (!res.ok) throw new Error("Error al crear la tarea");
            
            const nueva = await res.json();
            
            // JSONPlaceholder siempre devuelve id: 201, asi que generamos uno unico localmente
            const tareaLocal = {
                id: Date.now(), 
                titulo: nueva.title,
                completada: nueva.completed,
            };
            
            // agregamos al inicio del array
            setTareas((prev) => [tareaLocal, ...prev]);
        } catch (err) {
            setError(err.message);
        }
    };

    // PUT - actualizar tarea existente (ej. marcar como completada)
    const actualizarTarea = async (id, cambios) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cambios),
            });
            
            if (!res.ok) throw new Error("Error al actualizar la tarea");

            // actualizamos solo la tarea modificada en el estado local
            setTareas((prev) =>
                prev.map((t) => (t.id === id ? { ...t, ...cambios } : t))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    // DELETE - eliminar tarea
    const eliminarTarea = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            
            if (!res.ok) throw new Error("Error al eliminar la tarea");

            // filtramos para quitar la tarea del estado local
            setTareas((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    // retornamos los estados y las nuevas funciones (ya no exportamos setTareas)
    return { tareas, cargando, error, crearTarea, actualizarTarea, eliminarTarea };
};

export default useTareas;