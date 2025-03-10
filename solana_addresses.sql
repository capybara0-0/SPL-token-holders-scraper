CREATE TABLE IF NOT EXISTS solana_addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    publicKey VARCHAR(42) NOT NULL,
    status VARCHAR(7) NOT NULL CHECK (status IN ('pending', 'success', 'failed')) DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_status ON solana_addresses(status);