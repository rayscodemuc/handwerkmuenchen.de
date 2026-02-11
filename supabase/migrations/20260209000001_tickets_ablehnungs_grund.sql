-- Spalte für Ablehnungsgrund bei abgelehnten Anfragen
ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS ablehnungs_grund text;

COMMENT ON COLUMN tickets.ablehnungs_grund IS 'Grund der Ablehnung (z.B. keine Kapazität, außerhalb Einzugsgebiet).';
