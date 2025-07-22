import { useEffect } from 'react';
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

export const LifestyleSection = ({
  form
}: LifestyleSectionProps) => {
  const smokingStatus = form.watch('smokingStatus');
  const age = form.watch('age');
  const startSmokingAge = form.watch('startSmokingAge');
  const cigarettesPerDay = form.watch('cigarettesPerDay');
  const quittingAge = form.watch('quittingAge');
  
  // Novos campos para álcool
  const sex = form.watch('sex');
  const drinksCurrently = form.watch('drinksCurrently');
  const drinkingFrequency = form.watch('drinkingFrequency');
  const dosesPerOccasion = form.watch('dosesPerOccasion');
  const alcoholConsumption = form.watch('alcoholConsumption');

  // Cálculo automático de maços-ano para fumantes atuais
  useEffect(() => {
    if (smokingStatus === 'fumante' && age && startSmokingAge && cigarettesPerDay) {
      const yearsOfSmoking = age - startSmokingAge;
      if (yearsOfSmoking > 0) {
        const packsPerYear = cigarettesPerDay / 20 * yearsOfSmoking;
        form.setValue('packsPerYear', Math.round(packsPerYear * 100) / 100);
      }
    }
  }, [smokingStatus, age, startSmokingAge, cigarettesPerDay, form]);

  // Cálculo automático de maços-ano para ex-fumantes
  useEffect(() => {
    if (smokingStatus === 'ex-fumante' && startSmokingAge && quittingAge && cigarettesPerDay) {
      const yearsOfSmoking = quittingAge - startSmokingAge;
      if (yearsOfSmoking > 0) {
        const packsPerYear = cigarettesPerDay / 20 * yearsOfSmoking;
        form.setValue('packsPerYear', Math.round(packsPerYear * 100) / 100);
      }
    }
  }, [smokingStatus, startSmokingAge, quittingAge, cigarettesPerDay, form]);

  // Cálculo automático do consumo de álcool
  useEffect(() => {
    if (drinksCurrently && drinkingFrequency && dosesPerOccasion && sex) {
      const weeklyConsumption = (drinkingFrequency * dosesPerOccasion * 14) / 7;
      const threshold = sex === 'feminino' ? 20 : 40;
      const consumption = weeklyConsumption > threshold ? 'nocivo' : 'ocasional';
      form.setValue('alcoholConsumption', consumption);
    } else if (!drinksCurrently) {
      form.setValue('alcoholConsumption', 'nunca');
      form.setValue('drinkingFrequency', undefined);
      form.setValue('dosesPerOccasion', undefined);
    }
  }, [drinksCurrently, drinkingFrequency, dosesPerOccasion, sex, form]);

  // Helper function to get color class for alcohol consumption
  const getAlcoholConsumptionColorClass = (consumption: string) => {
    if (consumption === 'ocasional') {
      return 'text-green-600 bg-green-50 border-green-200';
    } else if (consumption === 'nocivo') {
      return 'text-red-600 bg-red-50 border-red-200';
    }
    return 'bg-gray-100';
  };

  return (
    <FormSection title="Hábitos de Vida Adicionais">
      <div className="space-y-4">
        {/* Tabagismo */}
        <div className="space-y-4">
          {/* Status de Tabagismo */}
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

          {/* Campos para fumante atual */}
          {smokingStatus === 'fumante' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="startSmokingAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade que começou a fumar</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 18"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            field.onChange(value === '' ? undefined : Number(value));
                          }
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
                name="cigarettesPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cigarros por dia</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 20"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            field.onChange(value === '' ? undefined : Number(value));
                          }
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
                name="packsPerYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maços-ano</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        readOnly
                        className="bg-gray-100"
                        placeholder="Será calculado automaticamente"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Campos para ex-fumante */}
          {smokingStatus === 'ex-fumante' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="startSmokingAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade que começou a fumar</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 18"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            field.onChange(value === '' ? undefined : Number(value));
                          }
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
                name="quittingAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade que parou de fumar</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 35"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            field.onChange(value === '' ? undefined : Number(value));
                          }
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
                name="cigarettesPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cigarros por dia</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 20"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            field.onChange(value === '' ? undefined : Number(value));
                          }
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
                name="packsPerYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maços-ano</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        readOnly
                        className="bg-gray-100"
                        placeholder="Será calculado automaticamente"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Consumo de Álcool */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="drinksCurrently"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Bebe atualmente?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === 'sim')}
                    value={field.value ? 'sim' : 'nao'}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="bebe-sim" />
                      <label htmlFor="bebe-sim" className="text-sm font-medium">
                        Sim
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="bebe-nao" />
                      <label htmlFor="bebe-nao" className="text-sm font-medium">
                        Não
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {drinksCurrently && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="drinkingFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantas vezes por semana?</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 2"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || (/^\d+$/.test(value) && Number(value) <= 7)) {
                            field.onChange(value === '' ? undefined : Number(value));
                          }
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
                name="dosesPerOccasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quando bebe, quantas doses costuma tomar?</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 3"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            field.onChange(value === '' ? undefined : Number(value));
                          }
                        }}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Campo de resultado automático */}
          <FormField
            control={form.control}
            name="alcoholConsumption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consumo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    readOnly
                    className={`capitalize ${getAlcoholConsumptionColorClass(field.value || '')}`}
                    placeholder="Será calculado automaticamente"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormSection>
  );
};
