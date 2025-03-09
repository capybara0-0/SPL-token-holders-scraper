import path from "path";
import * as fs from "fs/promises";

export async function checkFileExistence(fileName: string): Promise<boolean> {
  console.log(`Starting file existence check...`);

  const filePath = path.join(process.cwd(), fileName);

  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    const errnoException = error as NodeJS.ErrnoException;

    switch (errnoException.code) {
      case "ENOENT":
        console.log(
          `Error: The file "${fileName}" does not exist in the current working directory.`
        );
        break;
      case "EACCES":
        console.log(
          `Error: Permission denied while accessing the file "${fileName}". `
        );
        break;
      default:
        console.log(
          `Error while checking file "${fileName}": `,
          errnoException.message
        );
        break;
    }
    process.exit(1);
  }
}
