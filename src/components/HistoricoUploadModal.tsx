'use client';

import React, { useState, useCallback } from 'react';
import {
  DocumentArrowUpIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface HistoricoUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

interface UploadResult {
  message: string;
  importadas?: number;
  naoEncontradas?: string[];
  totalNaoEncontradas?: number;
  erros?: string[];
}

export default function HistoricoUploadModal({
  open,
  onClose,
  onSuccess,
}: HistoricoUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [state, setState] = useState<UploadState>('idle');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<UploadResult | null>(null);

  const reset = useCallback(() => {
    setFile(null);
    setState('idle');
    setError('');
    setResult(null);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') {
      setFile(f);
      setError('');
    } else if (f) {
      setError('Apenas arquivos PDF são aceitos.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      if (f.type === 'application/pdf') {
        setFile(f);
        setError('');
      } else {
        setError('Apenas arquivos PDF são aceitos.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setState('uploading');
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/historico/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data.error || 'Erro ao processar o histórico.';
        setError(errMsg);
        setState('error');
        toast.error(errMsg);
        return;
      }

      setResult(data);
      onSuccess?.();

      const msg =
        (data.importadas ?? 0) > 0
          ? `${data.importadas} disciplina(s) marcada(s) como concluída(s)!`
          : (data.message ?? 'Histórico processado.');
      toast.success(msg, { duration: 4000 });
      handleClose();
    } catch (err) {
      const errMsg = 'Erro de conexão. Tente novamente.';
      setError(errMsg);
      setState('error');
      toast.error(errMsg);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleClose}
      />
      <div className="relative bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-6 z-10 border border-slate-700">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          onClick={handleClose}
          aria-label="Fechar"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-xl">
            <DocumentArrowUpIcon className="h-8 w-8 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Importar Histórico Escolar
            </h2>
            <p className="text-sm text-slate-400">
              Faça upload do PDF do seu histórico (SIGAA/UFC) para marcar
              automaticamente as matérias concluídas
            </p>
          </div>
        </div>

        {state === 'idle' || state === 'uploading' ? (
          <>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-colors
                ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }
              `}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="historico-upload"
              />
              <label
                htmlFor="historico-upload"
                className="cursor-pointer block"
              >
                {file ? (
                  <div className="space-y-1">
                    <DocumentArrowUpIcon className="h-12 w-12 text-indigo-400 mx-auto" />
                    <p className="font-medium text-white">{file.name}</p>
                    <p className="text-sm text-slate-400">
                      {(file.size / 1024).toFixed(1)} KB • Clique para trocar
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <DocumentArrowUpIcon className="h-12 w-12 text-slate-500 mx-auto" />
                    <p className="font-medium text-slate-300">
                      Arraste o PDF ou clique para selecionar
                    </p>
                    <p className="text-sm text-slate-500">
                      Histórico Escolar emitido pelo SIGAA
                    </p>
                  </div>
                )}
              </label>
            </div>

            {error && (
              <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!file || state === 'uploading'}
                className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                {state === 'uploading' ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Analisando...
                  </>
                ) : (
                  'Importar'
                )}
              </button>
            </div>
          </>
        ) : state === 'success' && result ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <CheckCircleIcon className="h-8 w-8 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-400">{result.message}</p>
                {result.importadas !== undefined && result.importadas > 0 && (
                  <p className="text-sm text-slate-300 mt-1">
                    {result.importadas} disciplina(s) marcada(s) como concluída(s)
                  </p>
                )}
              </div>
            </div>

            {result.naoEncontradas && result.naoEncontradas.length > 0 && (
              <div className="text-sm">
                <p className="text-slate-400 font-medium mb-1">
                  Disciplinas do histórico que não constam no seu currículo (
                  {result.totalNaoEncontradas ?? result.naoEncontradas.length}):
                </p>
                <ul className="max-h-32 overflow-y-auto text-slate-500 space-y-0.5">
                  {result.naoEncontradas.slice(0, 10).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                  {(result.totalNaoEncontradas ?? 0) > 10 && (
                    <li>... e mais {(result.totalNaoEncontradas ?? 0) - 10}</li>
                  )}
                </ul>
              </div>
            )}

            <button
              onClick={handleClose}
              className="w-full px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-400">
                  {error || 'Erro ao processar o histórico'}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Verifique se o PDF é um histórico escolar do SIGAA e tente
                  novamente.
                </p>
              </div>
            </div>
            <button
              onClick={() => setState('idle')}
              className="w-full px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
