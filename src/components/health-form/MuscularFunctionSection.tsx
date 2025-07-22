import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';

interface MuscularFunctionSectionProps {
  form: UseFormReturn<HealthFormData>;
}

export const MuscularFunctionSection = ({ form }: MuscularFunctionSectionProps) => {
  return (
    <FormSection title="Avaliação de Função Muscular">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
              <FormLabel>Teste de Sentar e Levantar (repetições)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex: 12"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};