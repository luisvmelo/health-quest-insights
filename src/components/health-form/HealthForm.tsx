
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Save, FileText, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import { BiologicalSection } from './BiologicalSection';
import { IPAQSection } from './IPAQSection';
import { LifestyleSection } from './LifestyleSection';
import { HealthConditionsSection } from './HealthConditionsSection';
import { AnthropometricSection } from './AnthropometricSection';
import { BodyCompositionSection } from './BodyCompositionSection';
import { MuscularFunctionSection } from './MuscularFunctionSection';
import { SarcopeniaSection } from './SarcopeniaSection';
import { SarcFSection } from './SarcFSection';
import { HealthFormData } from '@/types/health-form';

const healthFormSchema = z.object({
  // Características Biológicas e Sociodemográficas
  age: z.number().min(1, 'Idade deve ser maior que 0').max(120, 'Idade deve ser menor que 120'),
  sex: z.enum(['masculino', 'feminino'], { required_error: 'Sexo é obrigatório' }),
  race: z.enum(['branco', 'negro', 'pardo', 'amarelo', 'indigena'], { required_error: 'Raça é obrigatória' }),

  // Hábitos de Vida - IPAQ
  physicalActivity: z.boolean(),
  moderateActivity: z.object({
    performs: z.boolean(),
    frequency: z.number().min(0).max(7),
    duration: z.number().min(0),
  }),
  vigorousActivity: z.object({
    performs: z.boolean(),
    frequency: z.number().min(0).max(7),
    duration: z.number().min(0),
  }),
  lightWalking: z.object({
    performs: z.boolean(),
    frequency: z.number().min(0).max(7),
    duration: z.number().min(0),
  }),
  sittingTimeWeekdays: z.number().min(0),
  sittingTimeWeekends: z.number().min(0),

  // Tabagismo e Álcool - Atualizado
  smokingStatus: z.enum(['nunca', 'fumante', 'ex-fumante']),
  startSmokingAge: z.number().optional(),
  cigarettesPerDay: z.number().optional(),
  packsPerYear: z.number().optional(),
  quittingDate: z.string().optional(),
  quittingAge: z.number().optional(),
  drinksCurrently: z.boolean(),
  drinkingFrequency: z.number().optional(),
  dosesPerOccasion: z.number().optional(),
  alcoholConsumption: z.enum(['nunca', 'ocasional', 'nocivo']),

  // Condições de Saúde
  chronicDiseases: z.array(z.string()),
  medications: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
  })),
  noMedications: z.boolean().optional(),

  // Medidas Antropométricas
  weight: z.number().min(20, 'Peso deve ser maior que 20kg').max(300, 'Peso deve ser menor que 300kg'),
  height: z.number().min(100, 'Altura deve ser maior que 100cm').max(250, 'Altura deve ser menor que 250cm'),
  bmi: z.number().optional(),
  waistCircumference: z.number().min(40, 'Medida deve ser maior que 40cm').max(200, 'Medida deve ser menor que 200cm'),
  hipCircumference: z.number().min(50, 'Medida deve ser maior que 50cm').max(200, 'Medida deve ser menor que 200cm'),
  waistHipRatio: z.number().optional(),
  calfCircumference: z.number().min(15, 'Medida deve ser maior que 15cm').max(60, 'Medida deve ser menor que 60cm'),

  // Composição Corporal
  skeletalMuscle: z.number().min(5, 'Valor deve ser maior que 5kg').max(100, 'Valor deve ser menor que 100kg'),
  fatMass: z.number().min(1, 'Valor deve ser maior que 1kg').max(150, 'Valor deve ser menor que 150kg'),
  visceralFat: z.number().min(1, 'Nível deve ser maior que 1').max(30, 'Nível deve ser menor que 30'),
  bodyAge: z.number().min(18, 'Idade deve ser maior que 18').max(100, 'Idade deve ser menor que 100'),
  dailyKcal: z.number().min(800, 'Valor deve ser maior que 800').max(5000, 'Valor deve ser menor que 5000'),

  // Função Muscular
  handGripTest: z.number().min(5, 'Valor deve ser maior que 5kg').max(80, 'Valor deve ser menor que 80kg'),
  sitToStandTest: z.number().min(0, 'Valor deve ser maior ou igual a 0').max(30, 'Valor deve ser menor que 30'),
  walkingSpeedTest: z.number().min(0.1, 'Valor deve ser maior que 0.1m/s').max(3, 'Valor deve ser menor que 3m/s'),

  // Sarcopenia
  sarcopeniaStatus: z.enum(['pre-sarcopenica', 'sarcopenica', 'sarcopenia-grave']),

  // SARC-F
  sarcF: z.object({
    strength: z.number().min(0).max(2),
    walkingAssistance: z.number().min(0).max(2),
    chairRising: z.number().min(0).max(2),
    stairClimbing: z.number().min(0).max(2),
    falls: z.number().min(0).max(2),
    total: z.number().optional(),
    interpretation: z.string().optional(),
  }),
});

interface HealthFormProps {
  onFormSubmit: (data: HealthFormData) => void;
  onShowStatistics: () => void;
  totalForms: number;
}

export const HealthForm = ({ onFormSubmit, onShowStatistics, totalForms }: HealthFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  const form = useForm<HealthFormData>({
    resolver: zodResolver(healthFormSchema),
    defaultValues: {
      physicalActivity: false,
      moderateActivity: { performs: false, frequency: 0, duration: 0 },
      vigorousActivity: { performs: false, frequency: 0, duration: 0 },
      lightWalking: { performs: false, frequency: 0, duration: 0 },
      sittingTimeWeekdays: 0,
      sittingTimeWeekends: 0,
      drinksCurrently: false,
      alcoholConsumption: 'nunca',
      chronicDiseases: [],
      medications: [],
      sarcF: {
        strength: 0,
        walkingAssistance: 0,
        chairRising: 0,
        stairClimbing: 0,
        falls: 0,
      },
    },
  });

  const sections = [
    { title: 'Dados Biológicos', component: <BiologicalSection form={form} /> },
    { title: 'Atividade Física (IPAQ)', component: <IPAQSection form={form} /> },
    { title: 'Estilo de Vida', component: <LifestyleSection form={form} /> },
    { title: 'Condições de Saúde', component: <HealthConditionsSection form={form} /> },
    { title: 'Medidas Antropométricas', component: <AnthropometricSection form={form} /> },
    { title: 'Composição Corporal', component: <BodyCompositionSection form={form} /> },
    { title: 'Função Muscular', component: <MuscularFunctionSection form={form} /> },
    { title: 'Sarcopenia', component: <SarcopeniaSection form={form} /> },
    { title: 'SARC-F', component: <SarcFSection form={form} /> },
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const onSubmit = (data: HealthFormData) => {
    onFormSubmit(data);
    toast({
      title: "Formulário salvo com sucesso!",
      description: "Os dados foram registrados e estão disponíveis para análise.",
    });
    
    // Reset form after submission
    form.reset();
    setCurrentSection(0);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                Formulário de Avaliação de Sarcopenia
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Seção {currentSection + 1} de {sections.length}: {sections[currentSection].title}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onShowStatistics}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Estatísticas ({totalForms})
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {sections[currentSection].component}

          {/* Navigation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                >
                  Anterior
                </Button>

                <div className="flex gap-2">
                  {currentSection === sections.length - 1 ? (
                    <Button type="submit" className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Salvar Formulário
                    </Button>
                  ) : (
                    <Button type="button" onClick={nextSection}>
                      Próximo
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};
