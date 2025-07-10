import React from 'react';
import DisciplinaBadge, { DisciplinaBadgeProps } from './DisciplinaBadge';

export interface Disciplina {
  nome: string;
  status?: 'CONCLUIDA' | 'EM_ANDAMENTO' | 'PENDENTE' | 'REPROVADA' | 'ATRASADO';
  codigo?: string;
  cargaHoraria?: number;
  obrigatoria?: boolean;
}

export interface SemesterColumnProps {
  numero: string;
  obrigatorias: number;
  disciplinas: Disciplina[];
  onDisciplinaClick?: (disciplina: Disciplina) => void;
  onCardClick?: () => void;
}

const statusOrder = ['CONCLUIDA', 'EM_ANDAMENTO', 'PENDENTE', 'ATRASADO', 'REPROVADA'];

const SemesterColumn: React.FC<SemesterColumnProps> = ({ numero, obrigatorias, disciplinas, onDisciplinaClick, onCardClick }) => {
  const obrigatoriasCount = disciplinas.filter(d => d.obrigatoria !== false).length;
  const optativasCount = disciplinas.filter(d => d.obrigatoria === false).length;

  return (
    <div className="relative flex flex-col lg:flex-row min-w-full lg:min-w-[260px] mx-1 lg:mx-2 items-stretch">
      <div
        className="relative z-10 flex flex-col justify-center px-4 lg:px-6 py-3 lg:py-5 min-w-full lg:min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden mb-4 lg:mb-0 lg:mr-4 cursor-pointer hover:bg-slate-100 transition"
        onClick={onCardClick}
              >
          <div className="absolute right-0 top-0 w-[60%] h-6 lg:h-8 bg-slate-100" style={{transform: 'skew(-15deg)', zIndex: 1}} />
        <div className="relative z-10 px-4 lg:px-6 pt-3 lg:pt-5 pb-2">
          <div className="text-lg lg:text-2xl font-extrabold text-slate-700">{numero}º SEMESTRE</div>
          <div className="text-xs lg:text-sm font-semibold text-slate-500 mt-1">
            ({obrigatoriasCount} OBRIGATÓRIAS, {optativasCount} OPTATIVAS)
          </div>
                  </div>
        </div>
        <div className="p-2 lg:p-4 flex flex-row flex-wrap gap-2 lg:gap-4 justify-start items-center flex-1">
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
