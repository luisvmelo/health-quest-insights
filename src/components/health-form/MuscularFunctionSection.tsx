
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

  const sarcopeniaStatus = useMemo(() => {
    if (!sex || !handGripTest || !sitToStandTest || !walkingSpeedTest) {
      return null;
    }

    // Critérios de corte
    const lowGripStrength = sex === 'masculino' ? handGripTest < 27 : handGripTest < 16;
    const lowSitToStand = sitToStandTest > 15; // > 15 segundos = baixo desempenho
    const lowWalkingSpeed = walkingSpeedTest < 0.8; // < 0.8 m/s = baixo desempenho

    // Lógica de classificação
    if (!lowGripStrength && !lowSitToStand && !lowWalkingSpeed) {
      return 'sem-sarcopenia';
    } else if (lowGripStrength && !lowSitToStand && !lowWalkingSpeed) {
      return 'pre-sarcopenica';
    } else if (lowGripStrength && (lowSitToStand || lowWalkingSpeed) && !(lowSitToStand && lowWalkingSpeed)) {
      return 'sarcopenica';
    } else if (lowGripStrength && lowSitToStand && lowWalkingSpeed) {
      return 'sarcopenia-grave';
    }
    
    return null;
  }, [sex, handGripTest, sitToStandTest, walkingSpeedTest]);

  const getStatusDisplay = (status: string | null) => {
    if (!status) return null;

    const statusConfig = {
      'sem-sarcopenia': {
        label: 'Sem sarcopenia',
        className: 'text-green-600 bg-green-50 border-green-200'
      },
      'pre-sarcopenica': {
        label: 'Pré-sarcopênica',
        className: 'text-yellow-600 bg-yellow-50 border-yellow-200'
      },
      'sarcopenica': {
        label: 'Sarcopênica',
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
