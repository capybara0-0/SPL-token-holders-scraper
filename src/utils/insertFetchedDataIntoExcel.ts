import ExcelJS from "exceljs";
import path from "path";
import { TARGET_TOKEN_MINT_ADDRESS } from "../constants/constant.js";
import { fetchedDataFromApi } from "../models/interfaces.js";

export async function insertFetchedDataIntoExcel(
  data: fetchedDataFromApi[]
): Promise<boolean> {
  const filePath = path.join(
    process.cwd(),
    `${TARGET_TOKEN_MINT_ADDRESS}.xlsx`
  );
  const workBook = new ExcelJS.Workbook();

  try {
    await workBook.xlsx.readFile(filePath);
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
    await workBook.xlsx.writeFile(filePath);
    console.log("All data added");
    return true;
  } catch (error) {
    console.error("Error inserting data into excel sheet: ", error);
    return false;
  }
}
