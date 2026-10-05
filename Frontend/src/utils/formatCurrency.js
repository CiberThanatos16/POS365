// Formatea un número como moneda mexicana (MXN)
// Ejemplo: 1500 → "$1,500.00"
export const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(value || 0);
};
