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
  
  // Campos para álcool
  const sex = form.watch('sex');
  const alcoholStatus = form.watch('alcoholStatus');
  const drinkingFrequency = form.watch('drinkingFrequency');
  const dosesPerOccasion = form.watch('dosesPerOccasion');
  const formerDrinkingFrequency = form.watch('formerDrinkingFrequency');
  const formerDosesPerOccasion = form.watch('formerDosesPerOccasion');
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

  // Cálculo automático do consumo de álcool para bebedores atuais
  useEffect(() => {
    if (alcoholStatus === 'bebe-atualmente' && drinkingFrequency && dosesPerOccasion && sex) {
      const weeklyConsumption = (drinkingFrequency * dosesPerOccasion * 14) / 7;
      const threshold = sex === 'feminino' ? 20 : 40;
      const consumption = weeklyConsumption > threshold ? 'nocivo' : 'ocasional';
      form.setValue('alcoholConsumption', consumption);
    } else if (alcoholStatus === 'nao-bebe-mais' && formerDrinkingFrequency && formerDosesPerOccasion && sex) {
      const weeklyConsumption = (formerDrinkingFrequency * formerDosesPerOccasion * 14) / 7;
      const threshold = sex === 'feminino' ? 20 : 40;
      const consumption = weeklyConsumption > threshold ? 'nocivo' : 'ocasional';
      form.setValue('alcoholConsumption', consumption);
    } else if (alcoholStatus === 'nunca') {
      form.setValue('alcoholConsumption', 'nunca');
      // Limpar campos relacionados
      form.setValue('drinkingFrequency', undefined);
      form.setValue('dosesPerOccasion', undefined);
      form.setValue('formerDrinkingFrequency', undefined);
      form.setValue('formerDosesPerOccasion', undefined);
      form.setValue('startDrinkingAge', undefined);
      form.setValue('stopDrinkingAge', undefined);
    }
  }, [alcoholStatus, drinkingFrequency, dosesPerOccasion, formerDrinkingFrequency, formerDosesPerOccasion, sex, form]);

  // Helper function to get color class for alcohol consumption
  const getAlcoholConsumptionColorClass = (consumption: string) => {
    if (consumption === 'ocasional') {
      return 'text-yellow-700 bg-yellow-50 border-yellow-200';
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
                        value={field.value ?? ''}
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
                        value={field.value ?? ''}
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
                        value={field.value ?? ''}
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
                        value={field.value ?? ''}
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
                        value={field.value ?? ''}
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
            name="alcoholStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Consumo de álcool</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nunca" id="nunca-bebeu" />
                      <label htmlFor="nunca-bebeu" className="text-sm font-medium">
                        Nunca bebeu
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao-bebe-mais" id="nao-bebe-mais" />
                      <label htmlFor="nao-bebe-mais" className="text-sm font-medium">
                        Não bebe mais
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bebe-atualmente" id="bebe-atualmente" />
                      <label htmlFor="bebe-atualmente" className="text-sm font-medium">
                        Bebe atualmente
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campos para bebedor atual */}
          {alcoholStatus === 'bebe-atualmente' && (
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
                        value={field.value ?? ''}
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
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Campos para ex-bebedor */}
          {alcoholStatus === 'nao-bebe-mais' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDrinkingAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Que idade começou a beber?</FormLabel>
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
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stopDrinkingAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Que idade parou de beber?</FormLabel>
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
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="formerDrinkingFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantas vezes por semana bebia?</FormLabel>
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
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="formerDosesPerOccasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quando bebia, quantas doses costumava tomar?</FormLabel>
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
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Campo de resultado automático - aparece para bebedores atuais e ex-bebedores */}
          {(alcoholStatus === 'bebe-atualmente' || alcoholStatus === 'nao-bebe-mais') && (
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
          )}
        </div>
      </div>
    </FormSection>
  );
};
