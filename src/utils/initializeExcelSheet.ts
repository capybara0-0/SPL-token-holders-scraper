import * as fs from "fs";
import ExcelJS from "exceljs";
import {
  TARGET_TOKEN_MINT_ADDRESS,
  XLSX_FILE_PATH,
} from "../constants/constant.js";
import chalk from "chalk";

export async function createExcelSheet(): Promise<boolean> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet();
  const XLSX_FILE_EXISITS = fs.existsSync(XLSX_FILE_PATH);

  if (XLSX_FILE_EXISITS) {
    console.log(
      chalk.green(
        `Excel sheet named: ${TARGET_TOKEN_MINT_ADDRESS}.xlsx exists.`
      )
    );
    return true;
  }

  worksheet.columns = [
    { header: "Owner Address", key: "ownerAddress", width: 45 },
    {
      header: "Associated Token Account",
      key: "associatedTokenAccount",
      width: 45,
    },
    { header: "Token Amount", key: "tokenAmount", width: 15 },
    { header: "Token Account State", key: "tokenAccountState", width: 15 },
  ];

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };

  try {
    await workbook.xlsx.writeFile(XLSX_FILE_PATH);
    console.log(
      chalk.green(
        `New excel file created, named ${TARGET_TOKEN_MINT_ADDRESS}.xlsx`
      )
    );
    return true;
  } catch (error) {
    console.error(chalk.red("Error while creating excel file: "), error);
    return false;
  }
}
