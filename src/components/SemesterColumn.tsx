import React from 'react';
import DisciplinaBadge, { DisciplinaBadgeProps } from './DisciplinaBadge';

export interface Disciplina {
  nome: string;
  status?: 'CONCLUIDA' | 'EM_ANDAMENTO' | 'PENDENTE' | 'REPROVADA';
  codigo?: string;
  cargaHoraria?: number;
  obrigatoria?: boolean;
}

export interface SemesterColumnProps {
  numero: string;
  obrigatorias: number;
  disciplinas: Disciplina[];
  onDisciplinaClick?: (disciplina: Disciplina) => void;
}

const statusOrder = ['CONCLUIDA', 'EM_ANDAMENTO', 'PENDENTE', 'REPROVADA'];

const SemesterColumn: React.FC<SemesterColumnProps> = ({ numero, obrigatorias, disciplinas, onDisciplinaClick }) => {
  // Conta obrigatórias e optativas
  const obrigatoriasCount = disciplinas.filter(d => d.obrigatoria !== false).length;
  const optativasCount = disciplinas.filter(d => d.obrigatoria === false).length;

  return (
    <div className="relative flex flex-row min-w-[260px] mx-2 items-stretch">
      {/* Card do semestre */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-5 min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden mr-4">
        {/* Faixa inclinada no topo direito */}
        <div className="absolute right-0 top-0 w-[60%] h-8 bg-slate-100" style={{transform: 'skew(-15deg)', zIndex: 1}} />
        <div className="relative z-10 px-6 pt-5 pb-2">
          <div className="text-2xl font-extrabold text-slate-700">{numero}º SEMESTRE</div>
          <div className="text-sm font-semibold text-slate-500 mt-1">
            ({obrigatoriasCount.toString().padStart(2, '0')} OBRIGATÓRIAS, {optativasCount.toString().padStart(2, '0')} OPTATIVAS)
          </div>
        </div>
      </div>
      {/* Lista de disciplinas */}
      <div className="p-4 flex flex-row flex-wrap gap-4 justify-start items-center flex-1">
        {disciplinas.map(d => (
          <DisciplinaBadge
            key={d.nome}
            nome={d.nome}
            status={d.status as DisciplinaBadgeProps['status']}
            codigo={(d as any).codigo || ''}
            cargaHoraria={(d as any).cargaHoraria || 0}
            obrigatoria={d.obrigatoria}
            onClick={() => onDisciplinaClick?.(d)}
          />
        ))}
      </div>
    </div>
  );
};

export default SemesterColumn;
