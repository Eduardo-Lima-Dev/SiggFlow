import React from 'react';

export interface DisciplinaBadgeProps {
  nome: string;
  status: 'CONCLUIDA' | 'EM_ANDAMENTO' | 'PENDENTE' | 'REPROVADA';
  codigo: string;
  cargaHoraria: number;
  obrigatoria?: boolean;
  onClick?: () => void;
}

const statusStyles = {
  CONCLUIDA: 'bg-green-700 text-green-200',
  EM_ANDAMENTO: 'bg-[#f4b400] text-white',
  PENDENTE: 'bg-yellow-700 text-yellow-200',
  REPROVADA: 'bg-red-700 text-red-200',
};

const DisciplinaBadge: React.FC<DisciplinaBadgeProps> = ({ nome, status, codigo, cargaHoraria, obrigatoria, onClick }) => {
  const style = statusStyles[status] || 'bg-gray-700 text-gray-200';
  return (
    <div
      className={
        `${style} w-56 h-28 flex flex-col items-center justify-center rounded-lg text-base font-semibold shadow cursor-pointer text-center p-2 hover:shadow-md transition-shadow relative`
      }
      onClick={onClick}
    >
      {obrigatoria === false && (
        <div className="absolute top-1 right-1 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
          OPT
        </div>
      )}
      <div className="font-bold text-white text-base mb-1">{nome}</div>
      <div className="text-xs text-white font-normal mt-1">cód.: {codigo} | {cargaHoraria} c/h</div>
    </div>
  );
};

export default DisciplinaBadge;
