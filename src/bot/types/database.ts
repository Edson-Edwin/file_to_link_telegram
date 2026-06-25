export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          telegram_id: number;
          username: string | null;
          first_name: string | null;
          joined_at: string;
        };
        Insert: {
          telegram_id: number;
          username?: string | null;
          first_name?: string | null;
          joined_at?: string;
        };
        Update: {
          telegram_id?: number;
          username?: string | null;
          first_name?: string | null;
          joined_at?: string;
        };
        Relationships: [];
      };
      download_links: {
        Row: {
          id: string;
          token: string;
          telegram_file_id: string;
          file_name: string | null;
          file_size: number | null;
          created_by: number;
          created_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          token: string;
          telegram_file_id: string;
          file_name?: string | null;
          file_size?: number | null;
          created_by: number;
          created_at?: string;
          expires_at: string;
        };
        Update: {
          id?: string;
          token?: string;
          telegram_file_id?: string;
          file_name?: string | null;
          file_size?: number | null;
          created_by?: number;
          created_at?: string;
          expires_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
}
