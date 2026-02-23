export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      ticket_history: {
        Row: {
          aktion: string
          details: Json | null
          erstellt_at: string | null
          id: string
          ticket_id: string | null
        }
        Insert: {
          aktion: string
          details?: Json | null
          erstellt_at?: string | null
          id?: string
          ticket_id?: string | null
        }
        Update: {
          aktion?: string
          details?: Json | null
          erstellt_at?: string | null
          id?: string
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_history_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          abgelehnt_am: string | null
          ablehnungs_grund: string | null
          abschluss_check: boolean | null
          additional_data: Json | null
          assigned_to: string | null
          beschreibung: string | null
          bild_urls: string[] | null
          company_id: string | null
          created_at: string
          dringlichkeit: string | null
          gewerk: string[] | null
          hat_stern_markierung: boolean | null
          historie: Json | null
          id: string
          image_urls: string[] | null
          internal_notes: string | null
          interne_notizen: string | null
          is_partner: boolean | null
          kommentare: Json | null
          kontakt_email: string
          kontakt_telefon: string | null
          kunde_name: string | null
          notizen_intern: string | null
          objekt_adresse: string
          partner_name: string | null
          position: number | null
          priority_score: number | null
          quelle: string | null
          status: string | null
          telefonnummer: string | null
          termin_ende: string | null
          termin_start: string | null
          termin_typ: string | null
          ticket_display_id: string | null
          zugewiesener_mitarbeiter: string | null
        }
        Insert: {
          abgelehnt_am?: string | null
          ablehnungs_grund?: string | null
          abschluss_check?: boolean | null
          additional_data?: Json | null
          assigned_to?: string | null
          beschreibung?: string | null
          bild_urls?: string[] | null
          company_id?: string | null
          created_at?: string
          dringlichkeit?: string | null
          gewerk?: string[] | null
          hat_stern_markierung?: boolean | null
          historie?: Json | null
          id?: string
          image_urls?: string[] | null
          internal_notes?: string | null
          interne_notizen?: string | null
          is_partner?: boolean | null
          kommentare?: Json | null
          kontakt_email: string
          kontakt_telefon?: string | null
          kunde_name?: string | null
          notizen_intern?: string | null
          objekt_adresse: string
          partner_name?: string | null
          position?: number | null
          priority_score?: number | null
          quelle?: string | null
          status?: string | null
          telefonnummer?: string | null
          termin_ende?: string | null
          termin_start?: string | null
          termin_typ?: string | null
          ticket_display_id?: string | null
          zugewiesener_mitarbeiter?: string | null
        }
        Update: {
          abgelehnt_am?: string | null
          ablehnungs_grund?: string | null
          abschluss_check?: boolean | null
          additional_data?: Json | null
          assigned_to?: string | null
          beschreibung?: string | null
          bild_urls?: string[] | null
          company_id?: string | null
          created_at?: string
          dringlichkeit?: string | null
          gewerk?: string[] | null
          hat_stern_markierung?: boolean | null
          historie?: Json | null
          id?: string
          image_urls?: string[] | null
          internal_notes?: string | null
          interne_notizen?: string | null
          is_partner?: boolean | null
          kommentare?: Json | null
          kontakt_email?: string
          kontakt_telefon?: string | null
          kunde_name?: string | null
          notizen_intern?: string | null
          objekt_adresse?: string
          partner_name?: string | null
          position?: number | null
          priority_score?: number | null
          quelle?: string | null
          status?: string | null
          telefonnummer?: string | null
          termin_ende?: string | null
          termin_start?: string | null
          termin_typ?: string | null
          ticket_display_id?: string | null
          zugewiesener_mitarbeiter?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
