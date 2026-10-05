import { useEffect, useState } from "react";
import api from "../../api/api";

export const NameBusiness = () => {

    //Obtener datos
    const [name_business, setNameBusiness] = useState("");

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await api.get("/pos365/business");
        setItems(res.data);
        setNameBusiness(res.data[0]?.name_business || "");
    };

    //Actualizar los datos
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await api.put("/pos365/business/1", {
                name_business: name_business
            });
            console.log(res.data);
            fetchData();

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <section className="p-5">
            <div className="pb-5">
                <h2 className="text-2xl font-bold">Nombre de tu negocio: {items[0]?.name_business || "Sin nombre"}</h2>
            </div>
            <form onSubmit={handleUpdate} className="flex-wrap mb-5">
                <label>Nombre del negocio</label><br />
                <input type="text" className="bg-gray-800 mb-5 p-2 w-2xl" placeholder="Ejemplo: CostructShop"
                    value={name_business}
                    onChange={(e) => setNameBusiness(e.target.value)} />

                <br />

                <button
                    type="submit"
                    className="bg-blue-800 p-2 w-2xl">
                    Guardar nombre
                </button>
            </form>
            <p>El nombre de tu negocio se reflejara en los tickets</p>
            <p className="mb-5">de lo contrario aparecerá como POS365</p>
            <p>El nombre debe ser el nombre de tu negocio :D</p>
        </section>
    )
}