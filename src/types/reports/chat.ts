export type ReportChatMode = 'admin' | 'producer';

export type ReportKpi = {
  value: string;
  label: string;
  note: string;
  accent: string;
};

export type ReportTableColumn = {
  label: string;
  align?: 'left' | 'right';
};

export type ReportTableRow = string[];

export type ReportBar = {
  label: string;
  /** Valor numérico en miles (para altura de barra). */
  valueK: number;
  /** Techo del eje (mismo para todas las barras del chart). */
  maxK: number;
};

export type ReportCardData = {
  title: string;
  scope: string;
  footnote: string;
  columns?: ReportTableColumn[];
  rows?: ReportTableRow[];
  /** Plantilla grid CSS de columnas (ej. `minmax(0,1fr) 78px 116px`). */
  columnTemplate?: string;
  bars?: ReportBar[];
};

export type ReportSpec = {
  key: string;
  keys: string[];
  answer: string;
  report: ReportCardData | null;
  followUps: string[];
  adminOnly?: boolean;
};

export type ChatMessage =
  | { id: number; role: 'user'; text: string }
  | {
      id: number;
      role: 'agent';
      reportKey: string | null;
      thinking: boolean;
      /** Texto del usuario que disparó esta respuesta (para restricciones). */
      query?: string;
    };

export type ResolvedAgentMessage = {
  text: string;
  thinking: boolean;
  report: ReportCardData | null;
  followUps: string[];
};
