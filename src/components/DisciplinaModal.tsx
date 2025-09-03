import React from 'react';
import { Dialog } from '@headlessui/react';
import { MdCalendarToday, MdBookmark, MdSchedule } from 'react-icons/md';

interface PreRequisito {
  codigo: string;
  nome: string;
  completa: boolean;
}

interface DisciplinaModalProps {
  open: boolean;
  onClose: () => void;
  disciplina: any;
  setDisciplina: (d: any) => void;
  preRequisitos?: PreRequisito[];
  dependentes?: PreRequisito[];
  onSalvar?: () => void;
  onRemover?: () => void;
  saving?: boolean;
  removing?: boolean;
}

const STATUS_LABELS: Record<string, string> = {
  CONCLUIDA: 'Completa',
  EM_ANDAMENTO: 'Em andamento',
  PENDENTE: 'Pendente',
  REPROVADA: 'Reprovada',
  ATRASADO: 'Atrasado',
};

const STATUS_COLORS: Record<string, string> = {
  CONCLUIDA: 'bg-blue-600 text-white',
  EM_ANDAMENTO: 'bg-yellow-500 text-white',
  PENDENTE: 'bg-gray-500 text-white',
  REPROVADA: 'bg-red-600 text-white',
  ATRASADO: 'bg-gray-600 text-white',
};

const DisciplinaModal: React.FC<DisciplinaModalProps> = ({ open, onClose, disciplina, setDisciplina, preRequisitos, dependentes, onSalvar, onRemover, saving, removing }) => {
  if (!disciplina) return null;
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">

      <div className="fixed inset-0 bg-slate-800/80 transition-opacity" aria-hidden="true" />
      <div className="flex items-center justify-center min-h-screen px-2 sm:px-4">
        <div className="relative bg-slate-900 rounded-2xl shadow-xl max-w-sm sm:max-w-xl w-full mx-auto p-4 sm:p-8 z-10">

          <button
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-slate-400 hover:text-white text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Fechar"
            type="button"
          >
            ×
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 pr-8">
            <Dialog.Title className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-0">
              {disciplina.codigo ? `${disciplina.codigo} - ` : ''}{disciplina.nome}
            </Dialog.Title>
            {disciplina.status && (
              <span className={`sm:ml-4 px-2 sm:px-3 py-1 rounded-lg text-xs font-bold uppercase ${STATUS_COLORS[disciplina.status] || 'bg-gray-600 text-white'}`}>
                {STATUS_LABELS[disciplina.status] || disciplina.status}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-slate-300 mb-4 text-sm">
            <span className="flex items-center gap-1">
              <MdCalendarToday className="inline-block mr-1" />
              {disciplina.semestre}º Semestre
            </span>
            {disciplina.obrigatoria !== undefined && (
              <span className="flex items-center gap-1">
                <MdBookmark className="inline-block mr-1" />
                {disciplina.obrigatoria ? 'Obrigatória' : 'Optativa'}
              </span>
            )}
            {disciplina.cargaHoraria && (
              <span className="flex items-center gap-1">
                <MdSchedule className="inline-block mr-1" />
                {disciplina.cargaHoraria}h
              </span>
            )}
          </div>
          <hr className="border-slate-700 mb-4" />

          <div className="mb-4">
            <label className="block text-slate-400 mb-1 font-medium">Status</label>
            <select
              className="w-full py-2 px-3 rounded bg-slate-800 text-white border border-gray-700 focus:outline-none"
              value={disciplina.status || 'PENDENTE'}
              onChange={e => setDisciplina((d: any) => ({ ...d, status: e.target.value }))}
            >
              <option value="CONCLUIDA">Completa</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="PENDENTE">Pendente</option>
              <option value="ATRASADO">Atrasado</option>
              <option value="REPROVADA">Reprovada</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 mb-1 font-medium">Pré-Requisitos</label>
            <div className="flex flex-col gap-2 mt-2">
              {preRequisitos && preRequisitos.length > 0 ? (
                preRequisitos.map(pr => (
                  <label key={pr.codigo} className="flex items-center gap-2">
                    <input type="checkbox" checked={pr.completa} readOnly />
                    <span className={`font-semibold text-sm sm:text-base ${pr.completa ? 'text-green-300' : ''}`}>{pr.nome}</span>
                  </label>
                ))
              ) : (
                <span className="text-slate-500">Nenhum pré-requisito</span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 mb-1 font-medium">Disciplinas que dependem desta</label>
            <div className="flex flex-col gap-2 mt-2">
              {dependentes && dependentes.length > 0 ? (
                dependentes.map(dep => (
                  <label key={dep.codigo} className="flex items-center gap-2">
                    <input type="checkbox" checked={dep.completa} readOnly />
                    <span className={`font-semibold text-sm sm:text-base ${dep.completa ? 'text-green-300' : ''}`}>{dep.nome}</span>
                  </label>
                ))
              ) : (
                <span className="text-slate-500">Nenhuma disciplina depende desta</span>
              )}
            </div>
          </div>
              
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-8">
            <button
              className="bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base"
              onClick={onClose}
              disabled={!!saving || !!removing}
            >
              Cancelar
            </button>
            {disciplina.obrigatoria === false && onRemover && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base"
                onClick={onRemover}
                disabled={!!saving || !!removing}
              >
                {removing ? 'Removendo...' : 'Remover Optativa'}
              </button>
            )}
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base"
              onClick={onSalvar}
              disabled={!!saving || !!removing}
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DisciplinaModal; 