import * as fs from "fs/promises";
import { TEXT_FILE_NAME, TEXT_FILE_PATH } from "../constants/constant.js";
import chalk from "chalk";

export async function checkFileExistence(): Promise<boolean> {
  try {
    await fs.access(TEXT_FILE_PATH, fs.constants.F_OK);
    console.log(chalk.green(`${TEXT_FILE_NAME} confirmed.`));
    return true;
  } catch (error) {
    const errnoException = error as NodeJS.ErrnoException;

    switch (errnoException.code) {
      case "ENOENT":
        console.log(
          chalk.red(
            `Error: The file "${TEXT_FILE_NAME}" does not exist in the current working directory.`
          )
        );
        break;
      case "EACCES":
        console.log(
          chalk.red(
            `Error: Permission denied while accessing the file "${TEXT_FILE_NAME}". `
          )
        );
        break;
      default:
        console.log(
          chalk.red(
            `Error while checking file "${TEXT_FILE_NAME} existence": `,
            errnoException.message
          )
        );
        break;
    }
    return false;
  }
}
