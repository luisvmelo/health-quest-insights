import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';

interface HealthConditionsSectionProps {
  form: UseFormReturn<HealthFormData>;
}

const chronicDiseaseOptions = [
  { value: 'DM', label: 'DM' },
  { value: 'HAS', label: 'HAS' },
  { value: 'Dislipidemia', label: 'Dislipidemia' },
  { value: 'DRC', label: 'DRC' },
  { value: 'DHC', label: 'DHC' },
  { value: 'Hipotireoidismo', label: 'Hipotireoidismo' },
];

export const HealthConditionsSection = ({ form }: HealthConditionsSectionProps) => {
  const chronicDiseases = form.watch('chronicDiseases') || [];
  
  const { fields: medicationFields, append: appendMedication, remove: removeMedication } = useFieldArray({
    control: form.control,
    name: "medications"
  });

  const handleDiseaseChange = (disease: string, checked: boolean) => {
    const currentDiseases = form.getValues('chronicDiseases') || [];
    if (checked) {
      form.setValue('chronicDiseases', [...currentDiseases, disease]);
    } else {
      form.setValue('chronicDiseases', currentDiseases.filter(d => d !== disease));
    }
  };

  const handleNoChronicDiseasesChange = (checked: boolean) => {
    form.setValue('noChronicDiseases', checked);
    if (checked) {
      // Limpar todas as doenças crônicas quando "não possui" é marcado
      form.setValue('chronicDiseases', []);
      form.setValue('otherChronicDiseases', '');
    }
  };

  const handleNoMedicationsChange = (checked: boolean) => {
    form.setValue('noMedications', checked);
    if (checked) {
      // Limpar todos os medicamentos quando "não tem" é marcado
      form.setValue('medications', []);
    }
  };

  const addMedication = () => {
    appendMedication({ name: '', dosage: '', frequency: '' });
  };

  const noMedications = form.watch('noMedications');
  const noChronicDiseases = form.watch('noChronicDiseases');

  return (
    <FormSection title="Condições de Saúde">
      <div className="space-y-6">
        {/* Doenças Crônicas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-medium">Doenças Crônicas</FormLabel>
            <FormField
              control={form.control}
              name="noChronicDiseases"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={handleNoChronicDiseasesChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Não possui doenças crônicas
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          {!noChronicDiseases && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chronicDiseaseOptions.map((disease) => (
                  <FormField
                    key={disease.value}
                    control={form.control}
                    name="chronicDiseases"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={chronicDiseases.includes(disease.value)}
                            onCheckedChange={(checked) => 
                              handleDiseaseChange(disease.value, checked as boolean)
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {disease.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              
              {/* Campo de texto para outras doenças crônicas */}
              <FormField
                control={form.control}
                name="otherChronicDiseases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outras doenças crônicas</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Caso possua outras doenças crônicas não listadas acima, descreva-as aqui..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Medicamentos em Uso */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-medium">Medicamentos em Uso</FormLabel>
            <FormField
              control={form.control}
              name="noMedications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={handleNoMedicationsChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Não faz uso de medicamentos
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          {!noMedications && (
            <div className="space-y-4">
              {medicationFields.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Nenhum medicamento adicionado ainda
                  </p>
                  <Button type="button" onClick={addMedication} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar primeiro medicamento
                  </Button>
                </div>
              )}

              {medicationFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Medicamento {index + 1}</h4>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMedication(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`medications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do medicamento</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Losartana" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`medications.${index}.dosage`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dosagem</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 50mg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`medications.${index}.frequency`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequência</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 1x ao dia" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              {medicationFields.length > 0 && (
                <Button type="button" onClick={addMedication} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar outro medicamento
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </FormSection>
  );
};