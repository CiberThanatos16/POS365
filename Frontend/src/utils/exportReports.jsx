import ExcelJS from "exceljs";

export const exportToReports = async (
    data,
    fileName = "reportes",
    sheetName = "Reporte"
) => {

    if (!data || !data.length) {
        alert("No hay datos para exportar");
        return;
    }

    const report = data[0];

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "POS365";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(sheetName);

    // =========================
    // TITULO
    // =========================

    worksheet.mergeCells("A1:J3");

    const title = worksheet.getCell("A1");

    title.value = "POS365 - Reporte Ejecutivo";

    title.font = {
        size: 22,
        bold: true,
        color: { argb: "FFFFFF" }
    };

    title.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
            argb: "050B1F"
        }
    };

    title.alignment = {
        horizontal: "center",
        vertical: "middle"
    };

    // =========================
    // FECHA
    // =========================

    worksheet.getCell("A4").value =
        `Fecha: ${new Date().toLocaleDateString("es-MX")}`;

    worksheet.getCell("A4").font = {
        bold: true
    };

    // =========================
    // TARJETA VENTAS
    // =========================

    worksheet.mergeCells("A6:B8");

    const salesCard = worksheet.getCell("A6");

    salesCard.value =
        `Ventas\n${report.Ventas_del_dia}`;

    salesCard.font = {
        size: 14,
        bold: true,
        color: { argb: "FFFFFF" }
    };

    salesCard.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "121B4A" }
    };

    salesCard.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true
    };

    // =========================
    // TOTAL VENTAS
    // =========================

    worksheet.mergeCells("C6:D8");

    const totalSalesCard = worksheet.getCell("C6");

    totalSalesCard.value =
        `Total Ventas\n$${report.Total_de_ventas.toFixed(2)}`;

    totalSalesCard.font = {
        size: 14,
        bold: true,
        color: { argb: "FFFFFF" }
    };

    totalSalesCard.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "121B4A" }
    };

    totalSalesCard.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true
    };

    // =========================
    // IVA
    // =========================

    worksheet.mergeCells("E6:F8");

    const ivaCard = worksheet.getCell("E6");

    ivaCard.value =
        `IVA\n$${report.IVA_generado.toFixed(2)}`;

    ivaCard.font = {
        size: 14,
        bold: true,
        color: { argb: "00D68F" }
    };

    ivaCard.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "121B4A" }
    };

    ivaCard.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true
    };

    // =========================
    // INVERSION
    // =========================

    worksheet.mergeCells("G6:H8");

    const investmentCard = worksheet.getCell("G6");

    investmentCard.value =
        `Inversión\n$${report.Inversion.toFixed(2)}`;

    investmentCard.font = {
        size: 14,
        bold: true,
        color: { argb: "FF6B6B" }
    };

    investmentCard.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "121B4A" }
    };

    investmentCard.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true
    };

    // =========================
    // UTILIDAD
    // =========================

    worksheet.mergeCells("I6:J8");

    const profitCard = worksheet.getCell("I6");

    profitCard.value =
        `Utilidad\n$${report.Utilidad.toFixed(2)}`;

    profitCard.font = {
        size: 14,
        bold: true,
        color: { argb: "00D68F" }
    };

    profitCard.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "121B4A" }
    };

    profitCard.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true
    };

    // =========================
    // TABLA
    // =========================

    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);

    const headers = Object.keys(report);

    worksheet.addRow(headers);

    const headerRow = worksheet.lastRow;

    headerRow.font = {
        bold: true,
        color: { argb: "FFFFFF" }
    };

    headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "203864" }
    };

    headerRow.alignment = {
        horizontal: "center"
    };

    const dataRow = worksheet.addRow(
        headers.map(header => report[header])
    );

    dataRow.eachCell(cell => {

        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "0D153A"
            }
        };

        cell.font = {
            color: {
                argb: "FFFFFF"
            }
        };

        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
        };

    });

    // =========================
    // AUTO WIDTH
    // =========================

    worksheet.columns.forEach(column => {

        let maxLength = 15;

        column.eachCell(
            { includeEmpty: true },
            cell => {

                const value =
                    cell.value?.toString() || "";

                maxLength = Math.max(
                    maxLength,
                    value.length
                );

            }
        );

        column.width = maxLength + 5;

    });

    // =========================
    // DESCARGA
    // =========================

    const buffer =
        await workbook.xlsx.writeBuffer();

    const blob = new Blob(
        [buffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    const url = URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = `${fileName}.xlsx`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};