import React from 'react';

export interface DisciplinaBadgeProps {
  nome: string;
  status: 'CONCLUIDA' | 'EM_ANDAMENTO' | 'PENDENTE' | 'REPROVADA';
}

const statusStyles = {
  CONCLUIDA: 'bg-green-700 text-green-200',
  EM_ANDAMENTO: 'bg-blue-700 text-blue-200',
  PENDENTE: 'bg-yellow-700 text-yellow-200',
  REPROVADA: 'bg-red-700 text-red-200',
};

const DisciplinaBadge: React.FC<DisciplinaBadgeProps> = ({ nome, status }) => {
  const style = statusStyles[status] || 'bg-gray-700 text-gray-200';
  return (
    <div className={`${style} px-3 py-1 rounded-lg text-sm font-medium shadow-inner`}>
      {nome}
    </div>
  );
};

export default DisciplinaBadge;
