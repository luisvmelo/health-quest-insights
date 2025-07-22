import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';

interface LifestyleSectionProps {
  form: UseFormReturn<HealthFormData>;
}

export const LifestyleSection = ({ form }: LifestyleSectionProps) => {
  const smokingStatus = form.watch('smokingStatus');

  return (
    <FormSection title="Hábitos de Vida Adicionais">
      <div className="space-y-4">
        {/* Tabagismo */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="smokingStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status de Tabagismo</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nunca" id="nunca" />
                      <label htmlFor="nunca" className="text-sm font-medium">
                        Nunca fumou
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fumante" id="fumante" />
                      <label htmlFor="fumante" className="text-sm font-medium">
                        Fumante atual
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ex-fumante" id="ex-fumante" />
                      <label htmlFor="ex-fumante" className="text-sm font-medium">
                        Ex-fumante
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(smokingStatus === 'fumante' || smokingStatus === 'ex-fumante') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="packsPerYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maços por ano</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 10"
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

              {smokingStatus === 'ex-fumante' && (
                <FormField
                  control={form.control}
                  name="quittingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data que parou de fumar</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}
        </div>

        {/* Consumo de Álcool */}
        <FormField
          control={form.control}
          name="alcoholConsumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consumo de Álcool</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o padrão de consumo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nunca">Nunca bebe</SelectItem>
                  <SelectItem value="ocasional">Ocasional (1-2x por mês)</SelectItem>
                  <SelectItem value="regular">Regular (1-2x por semana)</SelectItem>
                  <SelectItem value="excessivo">Excessivo (diário ou quase diário)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};