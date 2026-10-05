import { useState } from "react";
import { createProduct } from "../services/product.service";

const ProductForm = ({ onSaved }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price_sale: "",
    price_buy: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createProduct({
        ...form,
        price_sale: Number(form.price_sale),
        price_buy: Number(form.price_buy)
      });

      setForm({
        name: "",
        description: "",
        price_sale: "",
        price_buy: ""
      });

      if (onSaved) onSaved();
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nuevo Producto</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input name="name" value={form.name} onChange={handleChange} />
      <textarea name="description" value={form.description} onChange={handleChange} />
      <input name="price_sale" type="number" value={form.price_sale} onChange={handleChange} />
      <input name="price_buy" type="number" value={form.price_buy} onChange={handleChange} />

      <button disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default ProductForm;
