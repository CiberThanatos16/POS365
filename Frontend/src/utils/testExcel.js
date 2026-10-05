import ExcelJS from "exceljs";

async function test() {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Prueba");

    worksheet.getCell("A1").value = "Hola POS365";

    await workbook.xlsx.writeFile("prueba.xlsx");

    console.log("Archivo creado");
}

test();