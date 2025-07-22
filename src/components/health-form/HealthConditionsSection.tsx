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

const commonDiseases = [
  'Diabetes',
  'Hipertensão Arterial',
  'Doenças Cardiovasculares',
  'Osteoporose',
  'Artrite/Artrose',
  'Depressão/Ansiedade',
  'Doença Renal Crônica',
  'DPOC (Doença Pulmonar Obstrutiva Crônica)',
  'Câncer',
  'Outras'
];

export const HealthConditionsSection = ({ form }: HealthConditionsSectionProps) => {
  const chronicDiseases = form.watch('chronicDiseases') || [];
  
  const { fields, append, remove } = useFieldArray({
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

  const handleNoMedicationsChange = (checked: boolean) => {
    form.setValue('noMedications', checked);
    if (checked) {
      // Clear all medications when "não tem" is checked
      form.setValue('medications', []);
    }
  };

  const addMedication = () => {
    append({ name: '', dosage: '', frequency: '' });
  };

  const noMedications = form.watch('noMedications');

  return (
    <FormSection title="Condições de Saúde">
      <div className="space-y-6">
        {/* Doenças Crônicas */}
        <FormField
          control={form.control}
          name="chronicDiseases"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doenças Crônicas</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite as doenças crônicas que você possui..."
                  className="min-h-[100px]"
                  {...field}
                  value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              {fields.length === 0 && (
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

              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Medicamento {index + 1}</h4>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
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

              {fields.length > 0 && (
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