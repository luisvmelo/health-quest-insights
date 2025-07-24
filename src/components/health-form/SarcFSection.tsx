import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';
import { useEffect } from 'react';

interface SarcFSectionProps {
  form: UseFormReturn<HealthFormData>;
}

const sarcFQuestions = [
  {
    name: 'sarcF.strength' as const,
    label: 'Força',
    question: 'Quanta dificuldade você tem para levantar e carregar 5 kg?'
  },
  {
    name: 'sarcF.walkingAssistance' as const,
    label: 'Ajuda para caminhar',
    question: 'Quanta dificuldade você tem para atravessar um cômodo caminhando?'
  },
  {
    name: 'sarcF.chairRising' as const,
    label: 'Levantar da cadeira',
    question: 'Quanta dificuldade você tem para se levantar de uma cadeira ou cama?'
  },
  {
    name: 'sarcF.stairClimbing' as const,
    label: 'Subir escadas',
    question: 'Quanta dificuldade você tem para subir um lance de 10 degraus?'
  },
  {
    name: 'sarcF.falls' as const,
    label: 'Quedas',
    question: 'Quantas vezes você caiu no último ano?'
  }
];

const scoreOptions = [
  { value: 0, label: 'Nenhuma dificuldade / Nenhuma queda', description: 'Nenhuma' },
  { value: 1, label: 'Alguma dificuldade / 1-3 quedas', description: 'Alguma' },
  { value: 2, label: 'Muita dificuldade ou incapaz / 4+ quedas', description: 'Muita ou incapaz' }
];

export const SarcFSection = ({ form }: SarcFSectionProps) => {
  const strength = form.watch('sarcF.strength');
  const walkingAssistance = form.watch('sarcF.walkingAssistance');
  const chairRising = form.watch('sarcF.chairRising');
  const stairClimbing = form.watch('sarcF.stairClimbing');
  const falls = form.watch('sarcF.falls');

  // Calcular valores apenas para exibição (sem alterar o formulário)
  const calculateDisplayValues = () => {
    const scores = [strength, walkingAssistance, chairRising, stairClimbing, falls];
    
    if (scores.every(score => score !== undefined && score !== null)) {
      const total = scores.reduce((sum, score) => sum + score, 0);
      let interpretation = '';
      
      if (total >= 0 && total <= 5) {
        interpretation = 'Sem sinais sugestivos de sarcopenia no momento (cogitar reavaliação periódica)';
      } else if (total >= 6 && total <= 10) {
        interpretation = 'Sugestivo de sarcopenia (Prosseguir com investigação e diagnóstico completo)';
      }
      
      return { total, interpretation };
    }
    
    return { total: null, interpretation: '' };
  };

  const displayValues = calculateDisplayValues();

  return (
    <FormSection title="Questionário SARC-F">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Para cada pergunta, selecione a pontuação de 0 a 2 que melhor descreve sua situação:
        </p>

        {sarcFQuestions.map((question) => (
          <FormField
            key={question.name}
            control={form.control}
            name={question.name}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">
                  {question.label}: {question.question}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                    className="flex flex-col space-y-3"
                  >
                    {scoreOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option.value.toString()} 
                          id={`${question.name}-${option.value}`} 
                        />
                        <label 
                          htmlFor={`${question.name}-${option.value}`} 
                          className="text-sm font-medium cursor-pointer flex-1"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{option.value} - {option.description}</span>
                            <span className="text-xs text-muted-foreground">{option.label}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Resultado */}
        {displayValues.total !== null && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Resultado SARC-F
                <Badge variant={displayValues.total <= 5 ? "secondary" : "warning"} className="ml-2">
                  Pontuação: {displayValues.total}/10
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`font-medium ${displayValues.total <= 5 ? 'text-accent' : 'text-warning'}`}>
                {displayValues.interpretation}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </FormSection>
  );
};