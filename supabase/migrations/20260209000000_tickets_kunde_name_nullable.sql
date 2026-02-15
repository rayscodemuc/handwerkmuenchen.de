-- kunde_name bei Partnern ist optional; partner_name ist ausschlaggebend.
-- Diese Migration setzt kunde_name auf NULLABLE.
ALTER TABLE tickets
  ALTER COLUMN kunde_name DROP NOT NULL;
