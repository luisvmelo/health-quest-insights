import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
          <FormItem className="space-y-3">
            <FormLabel>Status de Sarcopenia</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pre-sarcopenica" id="pre-sarcopenica" />
                  <label htmlFor="pre-sarcopenica" className="text-sm font-medium">
                    Pré-sarcopênica
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sarcopenica" id="sarcopenica" />
                  <label htmlFor="sarcopenica" className="text-sm font-medium">
                    Sarcopênica
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sarcopenia-grave" id="sarcopenia-grave" />
                  <label htmlFor="sarcopenia-grave" className="text-sm font-medium">
                    Sarcopenia Grave
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};