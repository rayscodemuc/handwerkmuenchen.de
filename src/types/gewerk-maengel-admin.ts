export type GewerkMangelAdminRow = {
  id: string;
  company_id: string;
  created_by: string;
  adresse: string;
  notiz: string | null;
  image_urls: string[];
  gewerk: string | null;
  created_at: string;
  reporter_display_name: string | null;
};
