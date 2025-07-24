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
  const bmiStatus = form.watch('bmiStatus');

  const getBmiStatusColor = (status: string | undefined) => {
    if (!status) return '';
    
    switch (status) {
      case 'Abaixo do peso':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Peso normal':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Sobrepeso':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Obesidade grau 1':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'Obesidade grau 2':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Obesidade grau 3':
        return 'text-red-700 bg-red-100 border-red-300';
      default:
        return '';
    }
  };

  // Calcular IMC e status automaticamente
  useEffect(() => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      const roundedBmi = Math.round(bmi * 100) / 100;
      
      form.setValue('bmi', roundedBmi);
      
      // Calcular status do IMC
      let status = '';
      if (roundedBmi < 18.5) {
        status = 'Abaixo do peso';
      } else if (roundedBmi <= 24.9) {
        status = 'Peso normal';
      } else if (roundedBmi <= 29.9) {
        status = 'Sobrepeso';
      } else if (roundedBmi <= 34.9) {
        status = 'Obesidade grau 1';
      } else if (roundedBmi <= 39.9) {
        status = 'Obesidade grau 2';
      } else {
        status = 'Obesidade grau 3';
      }
      
      form.setValue('bmiStatus', status);
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      field.onChange('');
                    } else {
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? '' : numValue);
                    }
                  }}
                  value={field.value === undefined ? '' : String(field.value)}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      field.onChange('');
                    } else {
                      const numValue = parseInt(value);
                      field.onChange(isNaN(numValue) ? '' : numValue);
                    }
                  }}
                  value={field.value === undefined ? '' : String(field.value)}
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
          name="bmiStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status IMC</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Calculado automaticamente"
                  {...field}
                  readOnly
                  className={`bg-muted font-medium ${getBmiStatusColor(bmiStatus)}`}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      field.onChange('');
                    } else {
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? '' : numValue);
                    }
                  }}
                  value={field.value === undefined ? '' : String(field.value)}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      field.onChange('');
                    } else {
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? '' : numValue);
                    }
                  }}
                  value={field.value === undefined ? '' : String(field.value)}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      field.onChange('');
                    } else {
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? '' : numValue);
                    }
                  }}
                  value={field.value === undefined ? '' : String(field.value)}
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