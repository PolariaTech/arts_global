'use client';

import { useState } from 'react';
import { exportReportCsv } from '@/services/mock/reports';
import type { ReportCardData } from '@/types/reports/chat';

type ReportCardProps = {
  report: ReportCardData;
  onToast: (msg: string) => void;
};

export function ReportCard({ report, onToast }: ReportCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChart = (report.bars?.length ?? 0) > 0;
  const hasTable = (report.rows?.length ?? 0) > 0;
  const peak = hasChart
    ? Math.max(...(report.bars ?? []).map((b) => b.valueK))
    : 0;
  const maxK = report.bars?.[0]?.maxK ?? 1;
  const visibleRows = expanded
    ? (report.rows ?? [])
    : (report.rows ?? []).slice(0, 6);

  function onDownload() {
    const slug = report.title
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñ]+/gi, '-')
      .replace(/^-|-$/g, '');
    exportReportCsv(report, `${slug || 'reporte'}.csv`);
    onToast(`Descarga lista · ${report.title}`);
  }

  return (
    <div className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#F0F2F6] px-[18px] pt-[15px] pb-3.5">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-[9px]">
            <span className="rounded-[2px] border border-[#E8CE84] bg-[#FBF6EA] px-[7px] py-[3px] text-[10.5px] font-semibold tracking-[0.09em] text-[#8A6E22] uppercase">
              Reporte
            </span>
            <span className="text-[14.5px] font-semibold text-[#0F1E33]">
              {report.title}
            </span>
          </div>
          <span className="text-[12.5px] text-[#8A93A1]">{report.scope}</span>
        </div>
        <div className="flex flex-none items-center gap-3">
          {hasTable && (report.rows?.length ?? 0) > 4 ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="cursor-pointer border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[12.5px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
            >
              {expanded ? 'Contraer' : 'Expandir'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onToast(`Vista expandida · ${report.title}`)}
              className="cursor-pointer border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[12.5px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
            >
              Expandir
            </button>
          )}
          <button
            type="button"
            onClick={onDownload}
            className="cursor-pointer border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[12.5px] font-medium whitespace-nowrap text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
          >
            Descargar .xlsx
          </button>
        </div>
      </div>

      {hasChart ? (
        <div className="px-[18px] pt-[18px] pb-3.5">
          <div className="flex h-[104px] items-end gap-3 border-b border-[#E4E8EE] pb-0.5">
            {(report.bars ?? []).map((b) => {
              const h = Math.max(2, Math.round((b.valueK / maxK) * 76));
              const gold = b.valueK === peak && b.valueK > 0;
              return (
                <div
                  key={b.label}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-[7px]"
                >
                  <span className="text-[11.5px] font-semibold whitespace-nowrap text-[#5C6675] tabular-nums">
                    ${b.valueK}K
                  </span>
                  <span
                    className="block w-full max-w-12 rounded-t-[2px]"
                    style={{
                      height: `${h}px`,
                      background: gold ? '#C9A24A' : '#1B3252',
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 pt-2">
            {(report.bars ?? []).map((b) => (
              <span
                key={`lbl-${b.label}`}
                className="min-w-0 flex-1 text-center text-[11.5px] text-[#8A93A1]"
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {hasTable ? (
        <div className="pt-1">
          <div
            className="grid gap-x-3.5 gap-y-2.5 border-b border-[#E4E8EE] bg-[#FAFBFC] px-[18px] py-2.5"
            style={{
              gridTemplateColumns: report.columnTemplate ?? 'minmax(0,1fr)',
            }}
          >
            {(report.columns ?? []).map((col) => (
              <span
                key={col.label}
                className={`text-[10.5px] font-semibold tracking-[0.08em] text-[#8A93A1] uppercase ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {col.label}
              </span>
            ))}
          </div>
          {visibleRows.map((row, ri) => (
            <div
              key={`${row[0]}-${ri}`}
              className={`grid gap-x-3.5 gap-y-2.5 px-[18px] py-[11px] ${
                ri === visibleRows.length - 1 ? '' : 'border-b border-[#F0F2F6]'
              }`}
              style={{
                gridTemplateColumns: report.columnTemplate ?? 'minmax(0,1fr)',
              }}
            >
              {row.map((cell, ci) => (
                <span
                  key={`${ri}-${ci}`}
                  className={`text-[13.5px] tabular-nums ${
                    ci === 0
                      ? 'font-medium text-[#14181F]'
                      : 'text-right font-semibold whitespace-nowrap text-[#3B4553]'
                  }`}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      <div className="border-t border-[#F0F2F6] bg-[#FAFBFC] px-[18px] py-3">
        <span className="text-xs leading-normal text-[#8A93A1] text-pretty">
          {report.footnote}
        </span>
      </div>
    </div>
  );
}
