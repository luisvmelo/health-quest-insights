import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';
import { useEffect } from 'react';

interface AnthropometricSectionProps {
  form: UseFormReturn<HealthFormData>;
}

export const AnthropometricSection = ({ form }: AnthropometricSectionProps) => {
  const weight = form.watch('weight');
  const height = form.watch('height');
  const waistCircumference = form.watch('waistCircumference');
  const hipCircumference = form.watch('hipCircumference');

  // Calcular IMC automaticamente
  useEffect(() => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      form.setValue('bmi', Math.round(bmi * 100) / 100);
    }
  }, [weight, height, form]);

  // Calcular relação cintura-quadril automaticamente
  useEffect(() => {
    if (waistCircumference && hipCircumference) {
      const ratio = waistCircumference / hipCircumference;
      form.setValue('waistHipRatio', Math.round(ratio * 100) / 100);
    }
  }, [waistCircumference, hipCircumference, form]);

  return (
    <FormSection title="Medidas Antropométricas">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso Corporal (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 70.5"
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex: 170"
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
          name="bmi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IMC (calculado automaticamente)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Calculado automaticamente"
                  {...field}
                  readOnly
                  className="bg-muted"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="waistCircumference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Circunferência da Cintura (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 85.5"
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
          name="hipCircumference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Circunferência do Quadril (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 95.0"
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
          name="waistHipRatio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relação Cintura-Quadril (calculado)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Calculado automaticamente"
                  {...field}
                  readOnly
                  className="bg-muted"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calfCircumference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Circunferência da Panturrilha (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 35.0"
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