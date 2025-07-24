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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      medications: {
        Row: {
          assessmentId: string
          createdAt: string | null
          dosage: string | null
          frequency: string | null
          id: string
          name: string
        }
        Insert: {
          assessmentId: string
          createdAt?: string | null
          dosage?: string | null
          frequency?: string | null
          id?: string
          name: string
        }
        Update: {
          assessmentId?: string
          createdAt?: string | null
          dosage?: string | null
          frequency?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "medications_assessmentId_fkey"
            columns: ["assessmentId"]
            isOneToOne: false
            referencedRelation: "sarcopenia_complete_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medications_assessmentId_fkey"
            columns: ["assessmentId"]
            isOneToOne: false
            referencedRelation: "sarcopeniaAssessments"
            referencedColumns: ["id"]
          },
        ]
      }
      sarcopeniaAssessments: {
        Row: {
          age: number
          alcoholConsumption: Database["public"]["Enums"]["alcohol_consumption_enum"]
          bmi: number | null
          bodyAge: number | null
          calfCircumference: number | null
          chronicDiseases: Json | null
          cigarettesPerDay: number | null
          createdAt: string | null
          dailyKcal: number | null
          fatMass: number | null
          handGripTest: number | null
          height: number | null
          hipCircumference: number | null
          id: string
          lightWalkingDuration: number | null
          lightWalkingFrequency: number | null
          lightWalkingPerforms: boolean | null
          moderateActivityDuration: number | null
          moderateActivityFrequency: number | null
          moderateActivityPerforms: boolean | null
          otherChronicDiseases: string | null
          packsPerYear: number | null
          physicalActivity: boolean | null
          quittingAge: number | null
          race: Database["public"]["Enums"]["race_enum"]
          sarcFAjudaCaminhar: number | null
          sarcFForca: number | null
          sarcFLevantarCadeira: number | null
          sarcFQuedas: number | null
          sarcFResult: Database["public"]["Enums"]["sarc_f_result_enum"] | null
          sarcFSubirEscada: number | null
          sarcFTotal: number | null
          sarcopeniaStatus:
            | Database["public"]["Enums"]["sarcopenia_status_enum"]
            | null
          sex: Database["public"]["Enums"]["sex_enum"]
          sittingTimeWeekdays: number | null
          sittingTimeWeekends: number | null
          sitToStandTest: number | null
          skeletalMuscle: number | null
          smokingStatus: Database["public"]["Enums"]["smoking_status_enum"]
          startSmokingAge: number | null
          updatedAt: string | null
          userId: string | null
          vigorousActivityDuration: number | null
          vigorousActivityFrequency: number | null
          vigorousActivityPerforms: boolean | null
          visceralFat: number | null
          waistCircumference: number | null
          waistHipRatio: number | null
          walkingSpeedTest: number | null
          weight: number | null
        }
        Insert: {
          age: number
          alcoholConsumption: Database["public"]["Enums"]["alcohol_consumption_enum"]
          bmi?: number | null
          bodyAge?: number | null
          calfCircumference?: number | null
          chronicDiseases?: Json | null
          cigarettesPerDay?: number | null
          createdAt?: string | null
          dailyKcal?: number | null
          fatMass?: number | null
          handGripTest?: number | null
          height?: number | null
          hipCircumference?: number | null
          id?: string
          lightWalkingDuration?: number | null
          lightWalkingFrequency?: number | null
          lightWalkingPerforms?: boolean | null
          moderateActivityDuration?: number | null
          moderateActivityFrequency?: number | null
          moderateActivityPerforms?: boolean | null
          otherChronicDiseases?: string | null
          packsPerYear?: number | null
          physicalActivity?: boolean | null
          quittingAge?: number | null
          race: Database["public"]["Enums"]["race_enum"]
          sarcFAjudaCaminhar?: number | null
          sarcFForca?: number | null
          sarcFLevantarCadeira?: number | null
          sarcFQuedas?: number | null
          sarcFResult?: Database["public"]["Enums"]["sarc_f_result_enum"] | null
          sarcFSubirEscada?: number | null
          sarcFTotal?: number | null
          sarcopeniaStatus?:
            | Database["public"]["Enums"]["sarcopenia_status_enum"]
            | null
          sex: Database["public"]["Enums"]["sex_enum"]
          sittingTimeWeekdays?: number | null
          sittingTimeWeekends?: number | null
          sitToStandTest?: number | null
          skeletalMuscle?: number | null
          smokingStatus: Database["public"]["Enums"]["smoking_status_enum"]
          startSmokingAge?: number | null
          updatedAt?: string | null
          userId?: string | null
          vigorousActivityDuration?: number | null
          vigorousActivityFrequency?: number | null
          vigorousActivityPerforms?: boolean | null
          visceralFat?: number | null
          waistCircumference?: number | null
          waistHipRatio?: number | null
          walkingSpeedTest?: number | null
          weight?: number | null
        }
        Update: {
          age?: number
          alcoholConsumption?: Database["public"]["Enums"]["alcohol_consumption_enum"]
          bmi?: number | null
          bodyAge?: number | null
          calfCircumference?: number | null
          chronicDiseases?: Json | null
          cigarettesPerDay?: number | null
          createdAt?: string | null
          dailyKcal?: number | null
          fatMass?: number | null
          handGripTest?: number | null
          height?: number | null
          hipCircumference?: number | null
          id?: string
          lightWalkingDuration?: number | null
          lightWalkingFrequency?: number | null
          lightWalkingPerforms?: boolean | null
          moderateActivityDuration?: number | null
          moderateActivityFrequency?: number | null
          moderateActivityPerforms?: boolean | null
          otherChronicDiseases?: string | null
          packsPerYear?: number | null
          physicalActivity?: boolean | null
          quittingAge?: number | null
          race?: Database["public"]["Enums"]["race_enum"]
          sarcFAjudaCaminhar?: number | null
          sarcFForca?: number | null
          sarcFLevantarCadeira?: number | null
          sarcFQuedas?: number | null
          sarcFResult?: Database["public"]["Enums"]["sarc_f_result_enum"] | null
          sarcFSubirEscada?: number | null
          sarcFTotal?: number | null
          sarcopeniaStatus?:
            | Database["public"]["Enums"]["sarcopenia_status_enum"]
            | null
          sex?: Database["public"]["Enums"]["sex_enum"]
          sittingTimeWeekdays?: number | null
          sittingTimeWeekends?: number | null
          sitToStandTest?: number | null
          skeletalMuscle?: number | null
          smokingStatus?: Database["public"]["Enums"]["smoking_status_enum"]
          startSmokingAge?: number | null
          updatedAt?: string | null
          userId?: string | null
          vigorousActivityDuration?: number | null
          vigorousActivityFrequency?: number | null
          vigorousActivityPerforms?: boolean | null
          visceralFat?: number | null
          waistCircumference?: number | null
          waistHipRatio?: number | null
          walkingSpeedTest?: number | null
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      sarcopenia_complete_data: {
        Row: {
          age: number | null
          alcoholConsumption:
            | Database["public"]["Enums"]["alcohol_consumption_enum"]
            | null
          bmi: number | null
          bodyAge: number | null
          calfCircumference: number | null
          chronicDiseases: Json | null
          cigarettesPerDay: number | null
          createdAt: string | null
          dailyKcal: number | null
          fatMass: number | null
          handGripTest: number | null
          height: number | null
          hipCircumference: number | null
          id: string | null
          lightWalkingDuration: number | null
          lightWalkingFrequency: number | null
          lightWalkingPerforms: boolean | null
          medications_details: Json[] | null
          moderateActivityDuration: number | null
          moderateActivityFrequency: number | null
          moderateActivityPerforms: boolean | null
          packsPerYear: number | null
          physicalActivity: boolean | null
          quittingAge: number | null
          race: Database["public"]["Enums"]["race_enum"] | null
          sarcFAjudaCaminhar: number | null
          sarcFForca: number | null
          sarcFLevantarCadeira: number | null
          sarcFQuedas: number | null
          sarcFResult: Database["public"]["Enums"]["sarc_f_result_enum"] | null
          sarcFSubirEscada: number | null
          sarcFTotal: number | null
          sarcopeniaStatus:
            | Database["public"]["Enums"]["sarcopenia_status_enum"]
            | null
          sex: Database["public"]["Enums"]["sex_enum"] | null
          sittingTimeWeekdays: number | null
          sittingTimeWeekends: number | null
          sitToStandTest: number | null
          skeletalMuscle: number | null
          smokingStatus:
            | Database["public"]["Enums"]["smoking_status_enum"]
            | null
          startSmokingAge: number | null
          updatedAt: string | null
          userId: string | null
          vigorousActivityDuration: number | null
          vigorousActivityFrequency: number | null
          vigorousActivityPerforms: boolean | null
          visceralFat: number | null
          waistCircumference: number | null
          waistHipRatio: number | null
          walkingSpeedTest: number | null
          weight: number | null
        }
        Relationships: []
      }
      sarcopenia_statistics: {
        Row: {
          bmi_medio: number | null
          feminino_count: number | null
          grip_medio: number | null
          idade_media: number | null
          masculino_count: number | null
          pre_sarcopenica: number | null
          sarcopenia_grave: number | null
          sarcopenica: number | null
          sem_sarcopenia: number | null
          total_assessments: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      insert_assessment_with_medications: {
        Args: { assessment_data: Json; medications_data?: Json }
        Returns: string
      }
    }
    Enums: {
      alcohol_consumption_enum: "nunca" | "ocasional" | "regular" | "excessivo"
      race_enum: "branco" | "negro" | "pardo" | "amarelo" | "indigena"
      sarc_f_result_enum: "Sem sinais" | "Sugestivo sarcopenia"
      sarcopenia_status_enum:
        | "sem sarcopenia"
        | "pré-sarcopênica"
        | "sarcopênica"
        | "sarcopenia grave"
      sex_enum: "masculino" | "feminino"
      smoking_status_enum: "nunca" | "fumante" | "ex-fumante"
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
    Enums: {
      alcohol_consumption_enum: ["nunca", "ocasional", "regular", "excessivo"],
      race_enum: ["branco", "negro", "pardo", "amarelo", "indigena"],
      sarc_f_result_enum: ["Sem sinais", "Sugestivo sarcopenia"],
      sarcopenia_status_enum: [
        "sem sarcopenia",
        "pré-sarcopênica",
        "sarcopênica",
        "sarcopenia grave",
      ],
      sex_enum: ["masculino", "feminino"],
      smoking_status_enum: ["nunca", "fumante", "ex-fumante"],
    },
  },
} as const
