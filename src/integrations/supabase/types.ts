export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      job_applications: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          job_description_text: string | null
          job_description_url: string | null
          job_handle: string
          job_title: string | null
          requirements: string[] | null
          skills_mentioned: string[] | null
          updated_at: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: string
          job_description_text?: string | null
          job_description_url?: string | null
          job_handle: string
          job_title?: string | null
          requirements?: string[] | null
          skills_mentioned?: string[] | null
          updated_at?: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          job_description_text?: string | null
          job_description_url?: string | null
          job_handle?: string
          job_title?: string | null
          requirements?: string[] | null
          skills_mentioned?: string[] | null
          updated_at?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: []
      }
      portfolio_content: {
        Row: {
          company: string | null
          content_type: string
          created_at: string
          description: string | null
          embedding: string | null
          end_date: string | null
          id: string
          impact_metrics: Json | null
          is_featured: boolean | null
          keywords: string[] | null
          proficiency_level: number | null
          role: string | null
          start_date: string | null
          tags: string[] | null
          technologies: string[] | null
          title: string
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          company?: string | null
          content_type: string
          created_at?: string
          description?: string | null
          embedding?: string | null
          end_date?: string | null
          id?: string
          impact_metrics?: Json | null
          is_featured?: boolean | null
          keywords?: string[] | null
          proficiency_level?: number | null
          role?: string | null
          start_date?: string | null
          tags?: string[] | null
          technologies?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          company?: string | null
          content_type?: string
          created_at?: string
          description?: string | null
          embedding?: string | null
          end_date?: string | null
          id?: string
          impact_metrics?: Json | null
          is_featured?: boolean | null
          keywords?: string[] | null
          proficiency_level?: number | null
          role?: string | null
          start_date?: string | null
          tags?: string[] | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          full_name: string
          github_url: string | null
          id: string
          linkedin_url: string | null
          phone: string | null
          tagline: string | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          full_name: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          tagline?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          tagline?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      tailored_presentations: {
        Row: {
          created_at: string
          dynamic_tagline: string | null
          expires_at: string | null
          highlighted_keywords: string[] | null
          id: string
          job_handle: string
          layout_config: Json | null
          relevance_scores: Json | null
          selected_content: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          dynamic_tagline?: string | null
          expires_at?: string | null
          highlighted_keywords?: string[] | null
          id?: string
          job_handle: string
          layout_config?: Json | null
          relevance_scores?: Json | null
          selected_content: Json
          user_id: string
        }
        Update: {
          created_at?: string
          dynamic_tagline?: string | null
          expires_at?: string | null
          highlighted_keywords?: string[] | null
          id?: string
          job_handle?: string
          layout_config?: Json | null
          relevance_scores?: Json | null
          selected_content?: Json
          user_id?: string
        }
        Relationships: []
      }
      view_analytics: {
        Row: {
          actions_taken: Json | null
          company_detected: string | null
          created_at: string
          id: string
          job_handle: string
          sections_viewed: string[] | null
          time_spent: number | null
          user_id: string
          viewer_agent: string | null
          viewer_ip: string | null
        }
        Insert: {
          actions_taken?: Json | null
          company_detected?: string | null
          created_at?: string
          id?: string
          job_handle: string
          sections_viewed?: string[] | null
          time_spent?: number | null
          user_id: string
          viewer_agent?: string | null
          viewer_ip?: string | null
        }
        Update: {
          actions_taken?: Json | null
          company_detected?: string | null
          created_at?: string
          id?: string
          job_handle?: string
          sections_viewed?: string[] | null
          time_spent?: number | null
          user_id?: string
          viewer_agent?: string | null
          viewer_ip?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      calculate_similarity: {
        Args: { vec1: string; vec2: string }
        Returns: number
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      increment_view_count: {
        Args: { handle: string }
        Returns: undefined
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
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
  public: {
    Enums: {},
  },
} as const
