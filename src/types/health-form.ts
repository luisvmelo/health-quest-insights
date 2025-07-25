
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

  // Consumo de Álcool - Estrutura atualizada
  alcoholStatus: 'nunca' | 'nao-bebe-mais' | 'bebe-atualmente';
  drinksCurrently?: boolean; // mantido para compatibilidade
  drinkingFrequency?: number; // vezes por semana
  dosesPerOccasion?: number; // doses por ocasião
  startDrinkingAge?: number; // idade que começou a beber (ex-bebedor)
  stopDrinkingAge?: number; // idade que parou de beber (ex-bebedor)
  formerDrinkingFrequency?: number; // vezes por semana quando bebia (ex-bebedor)
  formerDosesPerOccasion?: number; // doses por ocasião quando bebia (ex-bebedor)
  alcoholConsumption: 'nunca' | 'ocasional' | 'nocivo';

  // Condições de Saúde
  chronicDiseases: string[]; // Array de strings para doenças crônicas
  otherChronicDiseases?: string; // Campo de texto para outras doenças
  noChronicDiseases?: boolean;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>; // Array de objetos para medicamentos
  noMedications?: boolean;

  // Medidas Antropométricas
  weight: number;
  height: number;
  bmi?: number;
  bmiStatus?: string;
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
