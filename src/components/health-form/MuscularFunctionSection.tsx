
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';
import { useMemo } from 'react';

interface MuscularFunctionSectionProps {
  form: UseFormReturn<HealthFormData>;
}

export const MuscularFunctionSection = ({ form }: MuscularFunctionSectionProps) => {
  const sex = form.watch('sex');
  const handGripTest = form.watch('handGripTest');
  const sitToStandTest = form.watch('sitToStandTest');
  const walkingSpeedTest = form.watch('walkingSpeedTest');

  // Obter dados necessários para o cálculo
  const weight = form.watch('weight');
  const height = form.watch('height');
  const age = form.watch('age');
  const race = form.watch('race');

  const sarcopeniaStatus = useMemo(() => {
    if (!sex || !weight || !height || !age || !race || !handGripTest || !sitToStandTest || !walkingSpeedTest) {
      return null;
    }

    // Converter altura para metros se necessário
    const heightM = height / 100; // assumindo que altura está em cm
    
    // Calcular MMEA e IMMEA
    const sexoNum = sex === 'masculino' ? 1 : 0;
    const racaAdj = (race === 'branco') ? 0 : (race === 'negro' ? 1.4 : -1.2);
    
    const MMEA = (0.244 * weight) + (7.8 * heightM) + (6.6 * sexoNum) - (0.098 * age) + (racaAdj - 3.3);
    const IMMEA = MMEA / (heightM * heightM);
    
    // Definir flags
    const massaMuscularBaixa = (sex === 'masculino') ? (IMMEA < 7.0) : (IMMEA < 5.5);
    const prensaoBaixa = (sex === 'masculino') ? (handGripTest < 27) : (handGripTest < 16);
    const marchaLenta = walkingSpeedTest <= 0.8;
    const sentLevantarRuim = sitToStandTest > 15;
    
    // Classificar status
    if (!massaMuscularBaixa) {
      return 'sem-sarcopenia';
    } else if (!prensaoBaixa && !sentLevantarRuim && !marchaLenta) {
      return 'pre-sarcopenica';
    } else if (marchaLenta) {
      return 'sarcopenia-grave';
    } else {
      return 'sarcopenica';
    }
  }, [sex, weight, height, age, race, handGripTest, sitToStandTest, walkingSpeedTest]);

  const getStatusDisplay = (status: string | null) => {
    if (!status) return null;

    const statusConfig = {
      'sem-sarcopenia': {
        label: 'Sem sarcopenia',
        className: 'text-green-600 bg-green-50 border-green-200'
      },
      'pre-sarcopenica': {
        label: 'Pré Sarcopênico',
        className: 'text-yellow-600 bg-yellow-50 border-yellow-200'
      },
      'sarcopenica': {
        label: 'Sarcopênico',
        className: 'text-orange-600 bg-orange-50 border-orange-200'
      },
      'sarcopenia-grave': {
        label: 'Sarcopenia Grave',
        className: 'text-red-600 bg-red-50 border-red-200'
      }
    };

    return statusConfig[status as keyof typeof statusConfig];
  };

  const statusDisplay = getStatusDisplay(sarcopeniaStatus);

  return (
    <FormSection title="Avaliação de Função Muscular">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="handGripTest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teste de Preensão Palmar (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 35.5"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : parseFloat(value));
                  }}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sitToStandTest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teste de Sentar e Levantar (segundos)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 12.5"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : parseFloat(value));
                  }}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="walkingSpeedTest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teste de Velocidade de Marcha (m/s)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 1.2"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : parseFloat(value));
                  }}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {statusDisplay && (
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">STATUS DA SARCOPENIA:</h3>
          <div className={`px-4 py-2 rounded-lg border ${statusDisplay.className}`}>
            <span className="font-medium">{statusDisplay.label}</span>
          </div>
        </div>
      )}
    </FormSection>
  );
};
