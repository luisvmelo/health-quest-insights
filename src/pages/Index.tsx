import { useState } from 'react';
import { HealthForm } from '@/components/health-form/HealthForm';
import { StatisticsView } from '@/components/health-form/StatisticsView';
import { HealthFormData } from '@/types/health-form';

const Index = () => {
  const [showStatistics, setShowStatistics] = useState(false);
  const [formsData, setFormsData] = useState<HealthFormData[]>([]);

  const handleFormSubmit = (data: HealthFormData) => {
    setFormsData(prev => [...prev, data]);
  };

  const handleShowStatistics = () => {
    setShowStatistics(true);
  };

  const handleBackToForm = () => {
    setShowStatistics(false);
  };

  if (showStatistics) {
    return (
      <StatisticsView 
        data={formsData} 
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HealthForm 
        onFormSubmit={handleFormSubmit}
        onShowStatistics={handleShowStatistics}
        totalForms={formsData.length}
      />
    </div>
  );
};

export default Index;
