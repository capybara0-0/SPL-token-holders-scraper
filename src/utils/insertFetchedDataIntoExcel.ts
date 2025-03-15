import ExcelJS from "exceljs";
import { XLSX_FILE_PATH } from "../constants/constant.js";
import { fetchedDataFromApi } from "../models/interfaces.js";

export async function insertFetchedDataIntoExcel(
  data: fetchedDataFromApi[]
): Promise<boolean> {
  const workBook = new ExcelJS.Workbook();

  try {
    await workBook.xlsx.readFile(XLSX_FILE_PATH);
    const worksheet = workBook.worksheets[0];

    // const rows = data.map((row) => [
    //   row.ownerAddress,
    //   row.associatedTokenAccount,
    //   row.tokenAmount,
    //   row.tokenAccountState,
    // ]);

    const rows = data.map(
      ({
        ownerAddress,
        associatedTokenAccount,
        tokenAmount,
        tokenAccountState,
      }) => [
        ownerAddress,
        associatedTokenAccount,
        tokenAmount,
        tokenAccountState,
      ]
    );

    worksheet.addRows(rows);
    await workBook.xlsx.writeFile(XLSX_FILE_PATH);
    console.log("All data added");
    return true;
  } catch (error) {
    console.error("Error inserting data into excel sheet: ", error);
    return false;
  }
}
