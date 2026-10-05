// ---- FUNCIONES DE EXPORTACION DE REPORTES ----
// En esta funcion voy a recibir los datos de los reportes y voy a crear un excel con esos datos
import ExcelJS from "exceljs";

export const exportToExcel = async (
    data,
    fileName = "reporte",
    sheetName = "Hoja1"
) => {

    if (!data || !data.length) {
        alert("No hay datos para exportar");
        return;
    }

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "POS365";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(sheetName);

    const headers = Object.keys(data[0]);

    // Obtener última columna automáticamente
    const lastColumn = String.fromCharCode(64 + headers.length);

    // ===== TÍTULO =====

    worksheet.mergeCells(`A1:${lastColumn}2`);

    const title = worksheet.getCell("A1");

    title.value = "POS365 - Reporte de Inventario";

    title.font = {
        size: 18,
        bold: true,
        color: { argb: "FFFFFF" }
    };

    title.alignment = {
        horizontal: "center",
        vertical: "middle"
    };

    title.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1F4E78" }
    };

    // ===== INFORMACIÓN DEL REPORTE =====

    worksheet.getCell("A3").value =
        `Fecha: ${new Date().toLocaleDateString("es-MX")}`;

    worksheet.getCell("D3").value =
        `Total registros: ${data.length}`;

    worksheet.getCell("A3").font = {
        bold: true
    };

    worksheet.getCell("D3").font = {
        bold: true
    };

    // ===== ENCABEZADOS =====

    worksheet.addRow(headers);

    const headerRow = worksheet.getRow(4);

    headerRow.height = 25;

    headerRow.font = {
        bold: true,
        color: { argb: "FFFFFF" }
    };

    headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4472C4" }
    };

    headerRow.alignment = {
        horizontal: "center",
        vertical: "middle"
    };

    // ===== DATOS =====

    data.forEach(row => {

        const excelRow = worksheet.addRow(
            headers.map(header => row[header])
        );

        excelRow.eachCell(cell => {

            cell.font = {
                color: { argb: "FFFFFF" }
            };

            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                    argb: "1F4E78"
                }
            };

        });

    });

    // ===== FORMATO MONEDA AUTOMÁTICO =====

    headers.forEach((header, index) => {

        const headerName = header.toLowerCase();

        if (
            headerName.includes("price") ||
            headerName.includes("precio") ||
            headerName.includes("balance") ||
            headerName.includes("ganancia") ||
            headerName.includes("total")
        ) {

            worksheet.getColumn(index + 1).numFmt =
                '$#,##0.00';

        }

    });

    // ===== BORDES =====

    worksheet.eachRow(row => {

        row.eachCell(cell => {

            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };

        });

    });

    // ===== FILAS ALTERNADAS =====

    worksheet.eachRow((row, rowNumber) => {

        if (rowNumber > 4 && rowNumber % 2 === 0) {

            row.eachCell(cell => {

                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "F2F2F2" }
                };

            });

        }

    });

    // ===== ANCHO AUTOMÁTICO =====

    worksheet.columns.forEach(column => {

        let maxLength = 10;

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

    // ===== CONGELAR ENCABEZADOS =====

    worksheet.views = [
        {
            state: "frozen",
            ySplit: 4
        }
    ];

    // ===== GENERAR ARCHIVO =====

    const buffer =
        await workbook.xlsx.writeBuffer();

    const blob = new Blob(
        [buffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = `${fileName}.xlsx`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};