# **SPL-Token Balance Extractor**

A Node.js script written in TypeScript to extract the balance and token account state of a specified SPL-token for multiple owner addresses listed in a `.txt` file. The results are exported to an Excel file for easy analysis. This tool is designed for educational purposes but can handle processing thousands of addresses efficiently.

---

## **Table of Contents**

- [**SPL-Token Balance Extractor**](#spl-token-balance-extractor)
  - [**Table of Contents**](#table-of-contents)
  - [**Description**](#description)
  - [**Features**](#features)
  - [**Installation**](#installation)
  - [**Usage**](#usage)
  - [**Output**](#output)
  - [**License**](#license)
  - [**Contact**](#contact)
  - [**Acknowledgments**](#acknowledgments)
  - [**FAQ**](#faq)

---

## **Description**

This script automates the process of fetching SPL-token balances and account states for a list of owner addresses. It uses the Solana Web3.js SDK (`@solana/kit`) and a SQLite database to manage and store data efficiently.

Key Highlights:

- Processes thousands of addresses with ease.
- Outputs results in an Excel file for further analysis.
- Configurable for any SPL-token mint address.
- Single-threaded Node.js implementation using TypeScript.

> **Note:** While this tool is capable of handling large datasets, it is not recommended for processing more than a few thousand addresses due to its single-threaded nature.

---

## **Features**

- Fetches SPL-token balances and account states for multiple owner addresses.
- Supports custom SPL-token mint addresses.
- Exports results to an Excel file (`.xlsx`).
- Uses a SQLite database for efficient data management.
- Configurable via environment variables and constants.

---

## **Installation**

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/capybara0-0/SPL-token-holders-scraper.git
   cd SPL-token-holders-scraper
   ```

2. **Install Dependencies**
   Navigate to root directory of the project and execute the follwing code:

   ```bash
   npm install
   ```

3. **Configure Constants**
   Navigate to `src/constants/constant.ts` and update the following fields as needed:

   ```ts
   export const RPC_URI: string = "<your solana api>";
   export const TARGET_TOKEN_MINT_ADDRESS: string =
     "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // Default: USDC
   export const SPL_TOKEN_PROGRAM_ID: string =
     "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
   export const TEXT_FILE_NAME: string = "<your file name>.txt";
   export const DB_FILE_NAME: string = "solana_addresses.db";
   ```

4. **Prepare Input File**
   - Place your list of owner addresses in a `.txt` file in the root directory.
   - Each address should be on a new line.

---

## **Usage**

To run the program, execute the following commands in the root directory:

```bash
npm run build && npm run start
```

If this is your first time running the script, you should see output similar to this:

```bash
[START] Main program started.
addresses.txt confirmed.
Schema file read successfully.
Schema executed successfully.
New excel file created, named EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v.xlsx
Schema executed successfully.
Total invalid address count:  0
[END] Main program completed.
```

---

## **Output**

After the program completes, you will find the following files in the root directory:

- **Excel File**: Named after the target SPL-token mint address (e.g., `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v.xlsx`), containing all fetched data.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For questions or feedback, feel free to reach out:

- GitHub: [capybara0-0](https://github.com/capybara0-0)
- Email: 127001sudais01@gmail.com

---

## **Acknowledgments**

- Built using the Solana Web3.js SDK v2.0(`@solana/kit`).
- Inspired by the need for automation in blockchain data extraction.

---

## **FAQ**

**Q: Can this script handle millions of addresses?**  
A: In short Yes it can definitely handle it.\
 While the script can process large datasets, it is not optimized for millions of addresses due to its single-threaded design. For such workloads, consider using a multi-threaded or distributed solution. Alternatively, feel free to reach out for a customized implementation.

**Q: What happens if an invalid address is provided?**  
A: Invalid addresses are skipped, and their count is displayed in the terminal output.
