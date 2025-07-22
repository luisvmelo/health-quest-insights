import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormSection } from './FormSection';
import { HealthFormData } from '@/types/health-form';
interface IPAQSectionProps {
  form: UseFormReturn<HealthFormData>;
}
export const IPAQSection = ({
  form
}: IPAQSectionProps) => {
  const physicalActivity = form.watch('physicalActivity');
  const moderatePerforms = form.watch('moderateActivity.performs');
  const vigorousPerforms = form.watch('vigorousActivity.performs');
  const lightWalkingPerforms = form.watch('lightWalking.performs');
  return <FormSection title="Nível de Atividade Física (IPAQ)">
      <FormField control={form.control} name="physicalActivity" render={({
      field
    }) => <FormItem className="space-y-3">
            <FormLabel>Realiza atividade física?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={value => field.onChange(value === 'sim')} value={field.value ? 'sim' : 'nao'} className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="atividade-sim" />
                  <label htmlFor="atividade-sim" className="text-sm font-medium">
                    Sim
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="atividade-nao" />
                  <label htmlFor="atividade-nao" className="text-sm font-medium">
                    Não
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>} />

      {physicalActivity && <div className="space-y-6 p-4 bg-secondary/30 rounded-lg">
          <p className="text-sm font-medium text-muted-foreground">
            Qual(is) tipo(s) de atividade física você pratica? (Pode selecionar mais de uma)
          </p>

          {/* Atividade Moderada */}
          <div className="space-y-3">
            <FormField control={form.control} name="moderateActivity.performs" render={({
          field
        }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium">
                      Atividade Moderada
                    </FormLabel>
                  </div>
                </FormItem>} />

            {moderatePerforms && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <FormField control={form.control} name="moderateActivity.frequency" render={({
            field
          }) => <FormItem>
                      <FormLabel>Quantas vezes na semana?</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3" {...field} onChange={e => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : parseInt(value));
              }} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="moderateActivity.duration" render={({
            field
          }) => <FormItem>
                      <FormLabel>Tempo em minutos por sessão</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 30" {...field} onChange={e => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : parseInt(value));
              }} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>}
          </div>

          {/* Atividade Vigorosa */}
          <div className="space-y-3">
            <FormField control={form.control} name="vigorousActivity.performs" render={({
          field
        }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium">
                      Atividade Vigorosa
                    </FormLabel>
                  </div>
                </FormItem>} />

            {vigorousPerforms && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <FormField control={form.control} name="vigorousActivity.frequency" render={({
            field
          }) => <FormItem>
                      <FormLabel>Quantas vezes na semana?</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 2" {...field} onChange={e => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : parseInt(value));
              }} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="vigorousActivity.duration" render={({
            field
          }) => <FormItem>
                      <FormLabel>Tempo em minutos por sessão</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 45" {...field} onChange={e => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : parseInt(value));
              }} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>}
          </div>

          {/* Caminhada Leve */}
          <div className="space-y-3">
            <FormField control={form.control} name="lightWalking.performs" render={({
          field
        }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium">
                      Caminhada Leve
                    </FormLabel>
                  </div>
                </FormItem>} />

            {lightWalkingPerforms && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <FormField control={form.control} name="lightWalking.frequency" render={({
            field
          }) => <FormItem>
                      <FormLabel>Quantas vezes na semana?</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 5" {...field} onChange={e => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : parseInt(value));
              }} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="lightWalking.duration" render={({
            field
          }) => <FormItem>
                      <FormLabel>Tempo em minutos por sessão</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 20" {...field} onChange={e => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : parseInt(value));
              }} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>}
          </div>
        </div>}

      {/* Tempo Sentado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="sittingTimeWeekdays" render={({
        field
      }) => <FormItem>
              <FormLabel>Tempo sentado durante a semana (horas/dia)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 480" {...field} onChange={e => {
            const value = e.target.value;
            field.onChange(value === '' ? undefined : parseInt(value));
          }} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

        <FormField control={form.control} name="sittingTimeWeekends" render={({
        field
      }) => <FormItem>
              <FormLabel>Tempo sentado durante o final de semana (horas/dia)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 300" {...field} onChange={e => {
            const value = e.target.value;
            field.onChange(value === '' ? undefined : parseInt(value));
          }} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
      </div>
    </FormSection>;
};