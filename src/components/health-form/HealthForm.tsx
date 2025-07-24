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
import { supabase } from '@/integrations/supabase/client';

import { BiologicalSection } from './BiologicalSection';
import { IPAQSection } from './IPAQSection';
import { LifestyleSection } from './LifestyleSection';
import { HealthConditionsSection } from './HealthConditionsSection';
import { AnthropometricSection } from './AnthropometricSection';
import { BodyCompositionSection } from './BodyCompositionSection';
import { MuscularFunctionSection } from './MuscularFunctionSection';

import { SarcFSection } from './SarcFSection';
import { HealthFormData } from '@/types/health-form';

const healthFormSchema = z.object({
  // Características Biológicas e Sociodemográficas
  age: z.number().min(1, 'Idade deve ser maior que 0').max(120, 'Idade deve ser menor que 120'),
  sex: z.enum(['masculino', 'feminino'], { required_error: 'Sexo é obrigatório' }),
  race: z.enum(['branco', 'negro', 'pardo', 'amarelo', 'indigena'], { required_error: 'Raça é obrigatória' }),

  // Hábitos de Vida - IPAQ
  physicalActivity: z.boolean().optional(),
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
  smokingStatus: z.enum(['nunca', 'fumante', 'ex-fumante']).optional(),
  startSmokingAge: z.number().optional(),
  cigarettesPerDay: z.number().optional(),
  packsPerYear: z.number().optional(),
  quittingDate: z.string().optional(),
  quittingAge: z.number().optional(),
  alcoholStatus: z.enum(['nunca', 'nao-bebe-mais', 'bebe-atualmente']).optional(),
  drinksCurrently: z.boolean().optional(),
  drinkingFrequency: z.number().optional(),
  dosesPerOccasion: z.number().optional(),
  startDrinkingAge: z.number().optional(),
  stopDrinkingAge: z.number().optional(),
  formerDrinkingFrequency: z.number().optional(),
  formerDosesPerOccasion: z.number().optional(),
  alcoholConsumption: z.enum(['nunca', 'ocasional', 'nocivo']).optional(),

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
  bmiStatus: z.string().optional(),
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
  handGripTest: z.number(),
  sitToStandTest: z.number(),
  walkingSpeedTest: z.number(),


  // SARC-F
  sarcF: z.object({
    strength: z.number().min(0).max(2).optional(),
    walkingAssistance: z.number().min(0).max(2).optional(),
    chairRising: z.number().min(0).max(2).optional(),
    stairClimbing: z.number().min(0).max(2).optional(),
    falls: z.number().min(0).max(2).optional(),
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
      // Objetos aninhados
      moderateActivity: { performs: false, frequency: 0, duration: 0 },
      vigorousActivity: { performs: false, frequency: 0, duration: 0 },
      lightWalking: { performs: false, frequency: 0, duration: 0 },
      chronicDiseases: [],
      medications: [],
      sarcF: {
        strength: undefined,
        walkingAssistance: undefined,
        chairRising: undefined,
        stairClimbing: undefined,
        falls: undefined,
        total: undefined,
        interpretation: undefined
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
    { title: 'SARC-F', component: <SarcFSection form={form} /> },
  ];

  // Log mudanças de seção
  console.log('🎯 Seção atual renderizada:', currentSection + 1, 'de', sections.length);

  const progress = ((currentSection + 1) / sections.length) * 100;

  const saveToSupabase = async (data: HealthFormData) => {
    try {
      // Mapear dados para o formato da tabela
      const assessmentData = {
        age: data.age,
        sex: data.sex,
        race: data.race,
        physicalActivity: data.physicalActivity || false,
        sittingTimeWeekdays: data.sittingTimeWeekdays,
        sittingTimeWeekends: data.sittingTimeWeekends,
        moderateActivityPerforms: data.moderateActivity.performs,
        moderateActivityFrequency: data.moderateActivity.frequency,
        moderateActivityDuration: data.moderateActivity.duration,
        vigorousActivityPerforms: data.vigorousActivity.performs,
        vigorousActivityFrequency: data.vigorousActivity.frequency,
        vigorousActivityDuration: data.vigorousActivity.duration,
        lightWalkingPerforms: data.lightWalking.performs,
        lightWalkingFrequency: data.lightWalking.frequency,
        lightWalkingDuration: data.lightWalking.duration,
        smokingStatus: data.smokingStatus || 'nunca',
        cigarettesPerDay: data.cigarettesPerDay,
        startSmokingAge: data.startSmokingAge,
        quittingAge: data.quittingAge,
        alcoholConsumption: data.alcoholConsumption || 'nunca',
        chronicDiseases: data.chronicDiseases,
        weight: data.weight,
        height: data.height / 100, // Converter cm para m
        bmi: data.bmi,
        bmiStatus: data.bmiStatus,
        waistCircumference: data.waistCircumference,
        hipCircumference: data.hipCircumference,
        calfCircumference: data.calfCircumference,
        skeletalMuscle: data.skeletalMuscle,
        fatMass: data.fatMass,
        visceralFat: data.visceralFat,
        bodyAge: data.bodyAge,
        dailyKcal: data.dailyKcal,
        handGripTest: data.handGripTest,
        sitToStandTest: data.sitToStandTest,
        walkingSpeedTest: data.walkingSpeedTest
      };

      // Mapear medicamentos
      const medicationsData = data.medications.map(med => ({
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency
      }));

      // Primeiro inserir avaliação principal
      const { data: result, error } = await (supabase as any)
        .from('sarcopeniaAssessments')
        .insert([assessmentData])
        .select('id')
        .single();

      if (error) {
        console.error('Erro ao salvar avaliação no Supabase:', error);
        toast({
          title: "Erro ao salvar no banco de dados",
          description: "Os dados foram salvos localmente, mas houve um problema com o servidor.",
          variant: "destructive",
        });
      } else {
        console.log('Avaliação salva no Supabase com sucesso:', result);
        
        // Se há medicamentos, salvá-los também
        if (medicationsData.length > 0 && result?.id) {
          const medicationsWithAssessmentId = medicationsData.map(med => ({
            ...med,
            assessmentId: result.id
          }));
          
          const { error: medError } = await (supabase as any)
            .from('medications')
            .insert(medicationsWithAssessmentId);
          
          if (medError) {
            console.error('Erro ao salvar medicamentos:', medError);
          } else {
            console.log('Medicamentos salvos com sucesso');
          }
        }
      }
    } catch (error) {
      console.error('Erro inesperado ao salvar no Supabase:', error);
    }
  };

  const onSubmit = async (data: HealthFormData) => {
    console.log('⚠️ FORMULÁRIO SENDO SUBMETIDO! Seção atual:', currentSection + 1, 'de', sections.length);
    console.log('Stack trace:', new Error().stack);
    
    // Calcular valores do SARC-F antes de submeter
    const scores = [
      data.sarcF?.strength,
      data.sarcF?.walkingAssistance,
      data.sarcF?.chairRising,
      data.sarcF?.stairClimbing,
      data.sarcF?.falls
    ];
    
    if (scores.every(score => score !== undefined && score !== null)) {
      const total = scores.reduce((sum, score) => sum + (score || 0), 0);
      let interpretation = '';
      
      if (total >= 0 && total <= 5) {
        interpretation = 'Sem sinais sugestivos de sarcopenia no momento (cogitar reavaliação periódica)';
      } else if (total >= 6 && total <= 10) {
        interpretation = 'Sugestivo de sarcopenia (Prosseguir com investigação e diagnóstico completo)';
      }
      
      // Atualizar dados com os valores calculados
      data.sarcF = {
        ...data.sarcF,
        total,
        interpretation
      };
    }
    // Salvar no Supabase (não bloqueia se falhar)
    await saveToSupabase(data);
    
    // Manter comportamento original
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
    console.log('🚀 Navegando para próxima seção. Atual:', currentSection, 'Próxima:', currentSection + 1);
    if (currentSection < sections.length - 1) {
      const nextSectionIndex = currentSection + 1;
      console.log('📍 Mudando para seção:', nextSectionIndex);
      setCurrentSection(nextSectionIndex);
      console.log('✅ Seção alterada para:', nextSectionIndex);
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
        <form onSubmit={(e) => {
          // BLOQUEAR COMPLETAMENTE qualquer submit automático
          e.preventDefault();
          e.stopPropagation();
          console.log('🚫 Submit automático bloqueado');
          return false;
        }} className="space-y-6">
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
                    <Button 
                      type="button" 
                      onClick={async () => {
                        console.log('🎯 Clique manual no botão salvar');
                        const formData = form.getValues();
                        console.log('📊 Dados do formulário:', formData);
                        await form.handleSubmit(onSubmit)();
                      }}
                      className="flex items-center gap-2"
                    >
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
