
export interface HealthFormData {
  // Características Biológicas e Sociodemográficas
  age: number;
  sex: 'masculino' | 'feminino';
  race: 'branco' | 'negro' | 'pardo' | 'amarelo' | 'indigena';

  // Hábitos de Vida - IPAQ
  physicalActivity: boolean;
  moderateActivity: {
    performs: boolean;
    frequency: number;
    duration: number;
  };
  vigorousActivity: {
    performs: boolean;
    frequency: number;
    duration: number;
  };
  lightWalking: {
    performs: boolean;
    frequency: number;
    duration: number;
  };
  sittingTimeWeekdays: number;
  sittingTimeWeekends: number;

  // Tabagismo
  smokingStatus: 'nunca' | 'fumante' | 'ex-fumante';
  startSmokingAge?: number;
  cigarettesPerDay?: number;
  packsPerYear?: number;
  quittingAge?: number;

  // Consumo de Álcool
  alcoholConsumption: 'nunca' | 'ocasional' | 'regular' | 'excessivo';

  // Condições de Saúde
  chronicDiseases: string[];
  otherChronicDiseases: string[];
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  noMedications?: boolean;

  // Medidas Antropométricas
  weight: number;
  height: number;
  bmi?: number;
  waistCircumference: number;
  hipCircumference: number;
  waistHipRatio?: number;
  calfCircumference: number;

  // Composição Corporal
  skeletalMuscle: number;
  fatMass: number;
  visceralFat: number;
  bodyAge: number;
  dailyKcal: number;

  // Avaliação de Função Muscular
  handGripTest: number;
  sitToStandTest: number;
  walkingSpeedTest: number;

  // Sarcopenia
  sarcopeniaStatus: 'pre-sarcopenica' | 'sarcopenica' | 'sarcopenia-grave';

  // SARC-F
  sarcF: {
    strength: number; // 0-2
    walkingAssistance: number; // 0-2
    chairRising: number; // 0-2
    stairClimbing: number; // 0-2
    falls: number; // 0-2
    total?: number;
    interpretation?: string;
  };
}

export interface StatisticsData {
  totalForms: number;
  ageDistribution: Record<string, number>;
  sexDistribution: Record<string, number>;
  raceDistribution: Record<string, number>;
  sarcopeniaDistribution: Record<string, number>;
  sarcFDistribution: Record<string, number>;
  averageBMI: number;
  averageWaistHipRatio: number;
  physicalActivityPercentage: number;
  smokingDistribution: Record<string, number>;
}
