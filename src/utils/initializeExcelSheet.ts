import ExcelJS from "exceljs";
import path from "path";
import { TARGET_TOKEN_MINT_ADDRESS } from "../constants/constant.js";

export async function createExcelSheet(): Promise<boolean> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet();

  worksheet.columns = [
    { header: "Owner Address", key: "ownerAddress", width: 45 },
    {
      header: "Associated Token Account",
      key: "associatedTokenAccount",
      width: 45,
    },
    { header: "Token Amount", key: "tokenAmount", width: 45 },
    { header: "Token Account State", key: "tokenAccountState", width: 15 },
  ];

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };

  const filePath = path.join(
    process.cwd(),
    `${TARGET_TOKEN_MINT_ADDRESS}.xlsx`
  );

  try {
    await workbook.xlsx.writeFile(filePath);
    console.log("Excel file created at: ", filePath);
    return true;
  } catch (error) {
    console.error("Error while creating excel file: ", error);
    return false;
  }
}
