import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, Activity, Heart, TrendingUp } from 'lucide-react';
import { HealthFormData, StatisticsData } from '@/types/health-form';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface StatisticsViewProps {
  data: HealthFormData[];
  onBack: () => void;
}

export const StatisticsView = ({ data, onBack }: StatisticsViewProps) => {
  const [supabaseData, setSupabaseData] = useState<HealthFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const { data: assessments, error } = await (supabase as any)
          .from('sarcopeniaAssessments')
          .select('*');

        if (error) {
          console.error('Erro ao buscar dados do Supabase:', error);
          setSupabaseData([]);
        } else {
          // Para agora, apenas log dos dados - implementação completa virá depois
          console.log('Dados do Supabase:', assessments);
          setSupabaseData([]);
        }
      } catch (error) {
        console.error('Erro inesperado ao buscar dados:', error);
        setSupabaseData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupabaseData();
  }, []);

  // Combinar dados locais e do Supabase
  const allData = [...data, ...supabaseData];

  const calculateStatistics = (): StatisticsData => {
    if (allData.length === 0) {
      return {
        totalForms: 0,
        ageDistribution: {},
        sexDistribution: {},
        raceDistribution: {},
        sarcopeniaDistribution: {},
        sarcFDistribution: {},
        averageBMI: 0,
        averageWaistHipRatio: 0,
        physicalActivityPercentage: 0,
        smokingDistribution: {},
      };
    }

    const stats: StatisticsData = {
      totalForms: allData.length,
      ageDistribution: {},
      sexDistribution: {},
      raceDistribution: {},
      sarcopeniaDistribution: {},
      sarcFDistribution: {},
      averageBMI: 0,
      averageWaistHipRatio: 0,
      physicalActivityPercentage: 0,
      smokingDistribution: {},
    };

    // Distribuição por idade (faixas etárias)
    allData.forEach(form => {
      const ageGroup = form.age < 30 ? '18-29' : 
                      form.age < 40 ? '30-39' :
                      form.age < 50 ? '40-49' :
                      form.age < 60 ? '50-59' :
                      form.age < 70 ? '60-69' : '70+';
      stats.ageDistribution[ageGroup] = (stats.ageDistribution[ageGroup] || 0) + 1;
    });

    // Distribuição por sexo
    allData.forEach(form => {
      stats.sexDistribution[form.sex] = (stats.sexDistribution[form.sex] || 0) + 1;
    });

    // Distribuição por raça
    allData.forEach(form => {
      stats.raceDistribution[form.race] = (stats.raceDistribution[form.race] || 0) + 1;
    });

    // Distribuição por sarcopenia (removido - agora é calculado automaticamente)

    // Distribuição SARC-F
    allData.forEach(form => {
      const total = form.sarcF.total || 0;
      const category = total <= 5 ? 'Sem sinais (0-5)' : 'Sugestivo (6-10)';
      stats.sarcFDistribution[category] = (stats.sarcFDistribution[category] || 0) + 1;
    });

    // Distribuição por tabagismo
    allData.forEach(form => {
      stats.smokingDistribution[form.smokingStatus] = (stats.smokingDistribution[form.smokingStatus] || 0) + 1;
    });

    // Médias
    stats.averageBMI = allData.reduce((sum, form) => sum + (form.bmi || 0), 0) / allData.length;
    stats.averageWaistHipRatio = allData.reduce((sum, form) => sum + (form.waistHipRatio || 0), 0) / allData.length;
    stats.physicalActivityPercentage = (allData.filter(form => form.physicalActivity).length / allData.length) * 100;

    return stats;
  };

  const stats = calculateStatistics();

  const renderDistributionCard = (title: string, distribution: Record<string, number>, icon: React.ReactNode) => (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(distribution).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm capitalize">{key}</span>
              <div className="flex items-center gap-2">
                <Progress 
                  value={(value / stats.totalForms) * 100} 
                  className="w-20 h-2"
                />
                <Badge variant="secondary" className="text-xs">
                  {value} ({Math.round((value / stats.totalForms) * 100)}%)
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-primary">Carregando...</h1>
        </div>
      </div>
    );
  }

  if (allData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-primary">Estatísticas</h1>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum dado disponível</h3>
            <p className="text-muted-foreground text-center">
              Preencha alguns formulários para ver as estatísticas e insights dos dados.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-primary">Estatísticas e Insights</h1>
        <Badge variant="secondary" className="ml-auto">
          {stats.totalForms} formulários analisados
        </Badge>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IMC Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageBMI.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.averageBMI < 18.5 ? 'Abaixo do peso' :
               stats.averageBMI < 25 ? 'Peso normal' :
               stats.averageBMI < 30 ? 'Sobrepeso' : 'Obesidade'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relação Cintura-Quadril</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageWaistHipRatio.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Média geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividade Física</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.physicalActivityPercentage.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Praticam exercícios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sarcopenia Sugestiva</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(((stats.sarcFDistribution['Sugestivo (6-10)'] || 0) / stats.totalForms) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">SARC-F ≥ 6 pontos</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuições */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderDistributionCard(
          'Distribuição por Idade',
          stats.ageDistribution,
          <Users className="h-4 w-4" />
        )}

        {renderDistributionCard(
          'Distribuição por Sexo',
          stats.sexDistribution,
          <Users className="h-4 w-4" />
        )}

        {renderDistributionCard(
          'Distribuição por Raça',
          stats.raceDistribution,
          <Users className="h-4 w-4" />
        )}


        {renderDistributionCard(
          'SARC-F Score',
          stats.sarcFDistribution,
          <TrendingUp className="h-4 w-4" />
        )}

        {renderDistributionCard(
          'Status de Tabagismo',
          stats.smokingDistribution,
          <Heart className="h-4 w-4" />
        )}
      </div>

      {/* Insights */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Insights e Observações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-medium text-primary mb-2">Perfil Populacional</h4>
              <p className="text-sm text-muted-foreground">
                A amostra é composta por {stats.totalForms} indivíduos, com IMC médio de {stats.averageBMI.toFixed(1)} kg/m².
                {stats.physicalActivityPercentage > 50 
                  ? ' A maioria da população pratica atividade física regularmente.'
                  : ' Há uma baixa adesão à atividade física na população estudada.'}
              </p>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg">
              <h4 className="font-medium text-accent mb-2">Risco de Sarcopenia</h4>
              <p className="text-sm text-muted-foreground">
                {((stats.sarcFDistribution['Sugestivo (6-10)'] || 0) / stats.totalForms) * 100 > 30
                  ? 'Alta prevalência de risco para sarcopenia na população (>30%). Recomenda-se investigação mais detalhada.'
                  : 'Baixa a moderada prevalência de risco para sarcopenia. Manter monitoramento preventivo.'}
              </p>
            </div>

            {stats.averageBMI > 25 && (
              <div className="p-4 bg-warning/10 rounded-lg">
                <h4 className="font-medium text-warning mb-2">Alerta Nutricional</h4>
                <p className="text-sm text-muted-foreground">
                  IMC médio indica sobrepeso na população. Considerar intervenções nutricionais e aumento da atividade física.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};