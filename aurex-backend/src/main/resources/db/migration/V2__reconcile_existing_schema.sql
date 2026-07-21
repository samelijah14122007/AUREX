ALTER TABLE users
    ALTER COLUMN name TYPE VARCHAR(120),
    ALTER COLUMN email TYPE VARCHAR(320),
    ALTER COLUMN password TYPE VARCHAR(100),
    ALTER COLUMN role TYPE VARCHAR(32),
    ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE change_requests
    ALTER COLUMN risk_level TYPE VARCHAR(16),
    ALTER COLUMN analysis_json SET NOT NULL,
    ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

-- Reconcile legacy schemas without assuming Hibernate-generated constraint names.
-- Every operation is guarded so this migration also succeeds after V1 on a new database.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_change_requests_user') THEN
        ALTER TABLE change_requests ADD CONSTRAINT fk_change_requests_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_change_requests_risk_score') THEN
        ALTER TABLE change_requests ADD CONSTRAINT chk_change_requests_risk_score CHECK (risk_score BETWEEN 0 AND 100);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_change_requests_confidence_score') THEN
        ALTER TABLE change_requests ADD CONSTRAINT chk_change_requests_confidence_score CHECK (confidence_score BETWEEN 0 AND 100);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_change_requests_risk_level') THEN
        ALTER TABLE change_requests ADD CONSTRAINT chk_change_requests_risk_level CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_users_role') THEN
        ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (role IN ('USER', 'ADMIN'));
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_change_requests_user_created_at ON change_requests (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_change_requests_user_risk_level ON change_requests (user_id, risk_level);
