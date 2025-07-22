import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';

interface SarcopeniaSectionProps {
  form: UseFormReturn<HealthFormData>;
}

export const SarcopeniaSection = ({ form }: SarcopeniaSectionProps) => {
  return (
    <FormSection title="Sarcopenia">
      <FormField
        control={form.control}
        name="sarcopeniaStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status de Sarcopenia</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pre-sarcopenica">Pré-sarcopênica</SelectItem>
                <SelectItem value="sarcopenica">Sarcopênica</SelectItem>
                <SelectItem value="sarcopenia-grave">Sarcopenia Grave</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};