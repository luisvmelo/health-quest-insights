import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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

  const handleDiseaseChange = (disease: string, checked: boolean) => {
    const currentDiseases = form.getValues('chronicDiseases') || [];
    if (checked) {
      form.setValue('chronicDiseases', [...currentDiseases, disease]);
    } else {
      form.setValue('chronicDiseases', currentDiseases.filter(d => d !== disease));
    }
  };

  return (
    <FormSection title="Condições de Saúde">
      <div className="space-y-6">
        {/* Doenças Crônicas */}
        <div>
          <FormLabel className="text-base font-medium mb-4 block">
            Doenças Crônicas (selecione todas que se aplicam)
          </FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {commonDiseases.map((disease) => (
              <div key={disease} className="flex items-center space-x-2">
                <Checkbox
                  id={disease}
                  checked={chronicDiseases.includes(disease)}
                  onCheckedChange={(checked) => handleDiseaseChange(disease, checked as boolean)}
                />
                <label
                  htmlFor={disease}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {disease}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Medicamentos em Uso */}
        <FormField
          control={form.control}
          name="medications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medicamentos em Uso</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Liste todos os medicamentos que você usa atualmente, incluindo dosagem e frequência..."
                  className="min-h-[100px]"
                  {...field}
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