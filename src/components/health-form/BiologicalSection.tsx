import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';

interface BiologicalSectionProps {
  form: UseFormReturn<HealthFormData>;
}

export const BiologicalSection = ({ form }: BiologicalSectionProps) => {
  return (
    <FormSection title="Características Biológicas e Sociodemográficas">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
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
          name="sex"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <label htmlFor="masculino" className="text-sm font-medium">
                      Masculino
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <label htmlFor="feminino" className="text-sm font-medium">
                      Feminino
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="race"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Raça</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="branco" id="branco" />
                    <label htmlFor="branco" className="text-sm font-medium">
                      Branco
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="negro" id="negro" />
                    <label htmlFor="negro" className="text-sm font-medium">
                      Negro
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pardo" id="pardo" />
                    <label htmlFor="pardo" className="text-sm font-medium">
                      Pardo
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amarelo" id="amarelo" />
                    <label htmlFor="amarelo" className="text-sm font-medium">
                      Amarelo
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="indigena" id="indigena" />
                    <label htmlFor="indigena" className="text-sm font-medium">
                      Indígena
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};