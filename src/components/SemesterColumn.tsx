import React from 'react';
import DisciplinaBadge, { DisciplinaBadgeProps } from './DisciplinaBadge';

export interface Disciplina {
  nome: string;
  status?: 'CONCLUIDA' | 'EM_ANDAMENTO' | 'PENDENTE' | 'REPROVADA';
}

export interface SemesterColumnProps {
  numero: string;
  disciplinas: Disciplina[];
}

const statusOrder = ['CONCLUIDA', 'EM_ANDAMENTO', 'PENDENTE', 'REPROVADA'];

const SemesterColumn: React.FC<SemesterColumnProps> = ({ numero, disciplinas }) => {
  // Agrupa as disciplinas por status
  const grouped: Record<string, Disciplina[]> = {};
  for (const d of disciplinas) {
    const st = d.status || 'PENDENTE';
    if (!grouped[st]) grouped[st] = [];
    grouped[st].push(d);
  }

  return (
    <div className="flex flex-col bg-slate-800 rounded-2xl shadow-md min-w-[200px] mx-2">
      {/* Cabeçalho do semestre */}
      <div className="bg-indigo-600 text-white text-center py-2 rounded-t-2xl font-semibold">
        {numero}º Semestre
      </div>
      {/* Lista de disciplinas */}
      <div className="p-4 flex-1 flex flex-col space-y-2">
        {statusOrder.map(status =>
          (grouped[status] || []).map(d => (
            <DisciplinaBadge key={d.nome} nome={d.nome} status={status as DisciplinaBadgeProps['status']} />
          ))
        )}
      </div>
    </div>
  );
};

export default SemesterColumn;
