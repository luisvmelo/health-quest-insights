import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';

interface BodyCompositionSectionProps {
  form: UseFormReturn<HealthFormData>;
}

export const BodyCompositionSection = ({ form }: BodyCompositionSectionProps) => {
  return (
    <FormSection title="Composição Corporal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="skeletalMuscle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Massa de Músculo Esquelético (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 25.5"
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
          name="fatMass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Massa de Gordura (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 15.3"
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
          name="visceralFat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gordura Visceral (nível)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex: 8"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : parseInt(value));
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
          name="bodyAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body Age (anos)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex: 35"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : parseInt(value));
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
          name="dailyKcal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kcal Gasto por Dia</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex: 1850"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : parseInt(value));
                  }}
                  value={field.value || ''}
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