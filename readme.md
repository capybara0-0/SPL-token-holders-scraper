# ⚠️ `getProgramAccounts` RPC Method Disabled/Restricted

## SPL Token Holders Scraper

This NodeJS script automates the process of listing and filtering SPL token holders based on the Mint Address provided by the user.

## Important Notice

The `getProgramAccounts` RPC method, which was previously used in this script, has been **disabled or restricted** by many Solana RPC providers. This is due to the high resource usage and cost associated with querying token accounts at scale.

### Future Development

I am actively working on a **new script** that will use more efficient and provider-friendly methods to scrape token holder data. This update will be released in the next few weeks. Stay tuned!

---

## Features

- **Scraping**: Automates the retrieval of SPL token holder data directly from the blockchain.
- **Filtering**: Implements logic to exclude holders listed in the provided whitelist.
- **Data Export**: Outputs the processed data into an Excel file.

## Output Format

The exported Excel file will contain the following columns:

| Owner Address   | Token Account  | Token Amount | Token Account State |
| --------------- | -------------- | ------------ | ------------------- |
| `example_addr1` | `example_acc1` | 100          | Active              |

## Prerequisites

Before you begin, ensure that NodeJS is installed on your system. Download and install NodeJS from the [official Node.js website](https://nodejs.org/).

## Configuration

To configure the scraper:

1. Create a `txt` file inside the `src` directory (if there is none) and populate it with the addresses you want to exclude from the scraping process.
2. Open the `src/constants/constatnt.js` file and set your parameters.

## Usage

To execute the script, navigate to the root directory of the project and run the following command in your terminal:

```bash
node src/index.js
```
