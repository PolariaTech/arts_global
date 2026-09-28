import type {
  ReportCardData,
  ReportChatMode,
  ReportKpi,
  ReportSpec,
  ReportTableColumn,
  ResolvedAgentMessage,
} from '@/types/reports/chat';

function tableCard(
  title: string,
  scope: string,
  columnLabels: string[],
  rows: string[][],
  footnote: string,
  columnTemplate: string,
): ReportCardData {
  const columns: ReportTableColumn[] = columnLabels.map((label, i) => ({
    label,
    align: i === 0 ? 'left' : 'right',
  }));
  return { title, scope, footnote, columns, rows, columnTemplate };
}

function chartCard(
  title: string,
  scope: string,
  bars: [string, number, number][],
  footnote: string,
): ReportCardData {
  return {
    title,
    scope,
    footnote,
    bars: bars.map(([label, valueK, maxK]) => ({ label, valueK, maxK })),
  };
}

const ADMIN_REPORTS: ReportSpec[] = [
  {
    key: 'cartera',
    keys: [
      'colombia',
      'cartera',
      'país',
      'pais',
      'trimestre',
      'panamá',
      'panama',
      'perú',
      'peru',
      'ecuador',
      'chile',
      'guatemala',
    ],
    answer:
      'Panamá lidera la cartera con US$ 1,665,169 de prima sobre 172 pólizas, el 46% del portafolio total. Le sigue Ecuador con US$ 661,037 (79 pólizas) y República Dominicana con US$ 488,444 (44 pólizas). Colombia, aunque activa desde el inicio, pesa menos en prima porque su flota es de aeronaves más pequeñas.',
    report: tableCard(
      'Cartera por país',
      'Los 5 países con mayor prima · cartera completa',
      ['País', 'Pólizas', 'Prima US$'],
      [
        ['Panamá', '172', '1,665,169'],
        ['Ecuador', '79', '661,037'],
        ['República Dominicana', '44', '488,444'],
        ['Chile', '17', '306,011'],
        ['Colombia', '21', '163,544'],
      ],
      'Fuente: registro de pólizas, 369 registros en 13 países. Incluye vinculadas, renovadas y endosadas.',
      'minmax(0,1fr) 78px 116px',
    ),
    followUps: ['Compárame Panamá con Ecuador', 'Muéstrame las próximas renovaciones'],
  },
  {
    key: 'produccion',
    keys: ['producción', 'produccion', 'mes', 'este mes', 'cómo va', 'como va', 'tendencia'],
    answer:
      'Septiembre lleva 9 pólizas por US$ 34.705, todavía a mitad de mes. Agosto cerró con 24 pólizas y US$ 314.486, algo por debajo de junio (45 pólizas, US$ 382,486), el mes más fuerte del semestre. Ecuador y Panamá concentran la mayor parte del volumen reciente.',
    report: chartCard(
      'Tendencia de prima emitida',
      'Todos los países · abr–sep 2026 · US$',
      [
        ['abr', 320, 421],
        ['may', 421, 421],
        ['jun', 382, 421],
        ['jul', 247, 421],
        ['ago', 314, 421],
        ['sep', 35, 421],
      ],
      'Septiembre parcial (datos al 13 sep 2026). Fuente: fecha de vinculación por póliza.',
    ),
    followUps: ['Desglósalo por producer', 'Muéstrame el bordereau de agosto'],
  },
  {
    key: 'bordereau',
    keys: ['bordereau', 'agosto', 'cierre', 'mensual'],
    adminOnly: true,
    answer:
      'El bordereau de agosto cerró con 24 pólizas y US$ 314,486 de prima emitida. Ecuador aportó el 48% del mes (9 pólizas, US$ 152,018), seguido de Panamá con 5 pólizas por US$ 62.852. El resto se repartió entre Colombia, Guatemala, República Dominicana, El Salvador y Perú.',
    report: tableCard(
      'Bordereau mensual',
      'Agosto 2026 · consolidado por país',
      ['País', 'Pólizas', 'Prima US$'],
      [
        ['Ecuador', '9', '152,018'],
        ['Panamá', '5', '62,852'],
        ['Colombia', '3', '40,331'],
        ['Guatemala', '2', '29,375'],
        ['Rep. Dominicana', '3', '13,755'],
      ],
      'Cerrado con datos al 13 sep 2026. Descarga incluye detalle por póliza.',
      'minmax(0,1fr) 88px 116px',
    ),
    followUps: ['Compáralo con julio', 'Ver pólizas de Ecuador'],
  },
  {
    key: 'producer',
    keys: ['producer', 'quién', 'quien', 'top producer', 'ranking'],
    adminOnly: true,
    answer:
      'J. Salgado lidera la producción del año con 67 pólizas por US$ 603.638, seguido muy de cerca por L. Cedeño con 51 pólizas y US$ 597,020 — ambos en Panamá, el país con mayor volumen. D. Franco, también en Panamá, aporta US$ 464,511 en 54 pólizas.',
    report: tableCard(
      'Producción por producer',
      'Todos los países · cartera completa, por prima emitida',
      ['Producer', 'Pólizas', 'Prima US$'],
      [
        ['J. Salgado · Panamá', '67', '603,638'],
        ['L. Cedeño · Panamá', '51', '597,020'],
        ['D. Franco · Panamá', '54', '464,511'],
        ['M. Herrera · Colombia/Chile', '25', '397,737'],
      ],
      'Ordenado por prima emitida. Fuente: registro de pólizas, producer asignado por país.',
      'minmax(0,1fr) 78px 116px',
    ),
    followUps: ['Ver el resto del ranking', 'Desglosa a J. Salgado por país'],
  },
  {
    key: 'renovaciones',
    keys: ['renovación', 'renovacion', 'renovaciones', 'vencen', 'próximas'],
    answer:
      'Hay 38 pólizas en ventana de renovación en los próximos 45 días, con US$ 423,006 de prima en riesgo. La más urgente vence hoy: Aeroservicios Austral SpA en Chile. Le siguen Aviación Petén S.A. en Guatemala (1 día) y Helicópteros Patagonia SpA en Chile (2 días).',
    report: tableCard(
      'Próximas renovaciones',
      'Todos los producers · próximos 45 días',
      ['Póliza / asegurado', 'Vence en', 'Prima US$'],
      [
        ['2373 · Aeroservicios Austral SpA', 'hoy', '7,726'],
        ['2380 · Aviación Petén S.A.', '1 día', '12,653'],
        ['2399 · Helicópteros Patagonia SpA', '2 días', '12,209'],
        ['2396 · Aeroservicios del Istmo S.A.', '4 días', '1,721'],
      ],
      'Se muestran las 4 más próximas de 38. Vencimiento estimado en fecha de vinculación + 1 año.',
      'minmax(0,1fr) 82px 108px',
    ),
    followUps: ['Avisar a los producers', 'Ver las 38 completas'],
  },
  {
    key: 'estado',
    keys: ['estado', 'pólizas por estado', 'canceladas', 'vencidas', 'activas'],
    answer:
      'De las 369 pólizas de la cartera, 226 están renovadas, 94 vinculadas y 31 endosadas — 351 activas en total. 17 se cancelaron (US$ 136,437 en devoluciones netas) y solo 1 venció sin renovar. La tasa de cancelación es del 4.6%.',
    report: tableCard(
      'Pólizas por estado',
      'Todos los países · cartera completa',
      ['Estado', 'Pólizas', 'Prima US$'],
      [
        ['Renovada', '226', '2,380,443'],
        ['Vinculada', '94', '838,583'],
        ['Endosada', '31', '236,498'],
        ['Cancelada', '17', '-136,437'],
        ['Vencida', '1', '910'],
      ],
      'Prima de canceladas mostrada como devolución neta. Fuente: registro de pólizas.',
      'minmax(0,1fr) 78px 124px',
    ),
    followUps: ['¿Por qué se cancelaron las 17?', 'Ver solo las endosadas'],
  },
  {
    key: 'uso',
    keys: [
      'tipo de uso',
      'aeronave',
      'chárter',
      'charter',
      'privado',
      'instrucción',
      'comercial',
      'ayuda industrial',
    ],
    adminOnly: true,
    answer:
      'Uso privado concentra el 44% de la prima de la cartera con US$ 1.60 M sobre 196 pólizas, seguido de ayuda industrial con US$ 1.28 M (121 pólizas) — principalmente helicópteros y aeronaves utilitarias. Chárter, aunque son solo 38 pólizas, tiene el ticket promedio más alto: US$ 16,500 por póliza.',
    report: tableCard(
      'Prima por tipo de uso',
      'Todos los países · cartera completa',
      ['Tipo de uso', 'Pólizas', 'Prima US$'],
      [
        ['Privado', '196', '1,598,856'],
        ['Ayuda industrial', '121', '1,275,623'],
        ['Chárter', '38', '627,570'],
        ['Comercial', '7', '82,540'],
        ['Instrucción', '7', '8,282'],
      ],
      'Clasificación estimada a partir del modelo de aeronave declarado en la póliza.',
      'minmax(0,1fr) 78px 124px',
    ),
    followUps: ['Desglosa privado por país', '¿Y por fabricante?'],
  },
  {
    key: 'umbrales',
    keys: ['umbral', 'umbrales', 'excedieron', 'excede', 'autoridad'],
    answer:
      'Los valores de umbral de suscripción todavía no están definidos formalmente (pendiente en Doc 12, ítem F6), así que este reporte no puede calcularse sobre datos reales todavía. En cuanto el equipo defina los límites por sección de cobertura, este reporte se activa automáticamente sobre la cartera de 369 pólizas.',
    report: null,
    followUps: [
      '¿Qué se necesita para definir los umbrales?',
      'Muéstrame pólizas por estado en su lugar',
    ],
  },
  {
    key: 'auditoria',
    keys: ['auditoría', 'auditoria', 'historial', 'usuario', 'quién hizo', 'acciones'],
    adminOnly: true,
    answer:
      'Las 10 acciones más recientes están concentradas en Ecuador y Panamá, con D. Vaca y S. Andrade como los usuarios más activos de la última semana. La más reciente es la renovación de la póliza de Aviación Cuscatlán S.A. en El Salvador, el 13 de septiembre.',
    report: tableCard(
      'Historial de auditoría reciente',
      'Últimos movimientos · todas las acciones',
      ['Usuario', 'Acción', 'Póliza'],
      [
        ['C. Reyes', 'Renovación · 13 sep', '2770 · Aviación Cuscatlán'],
        ['S. Andrade', 'Renovación · 11 sep', '2764 · Vuelos Pichincha'],
        ['D. Vaca', 'Vinculación · 9 sep', '2767 · Serv. Aéreos Esmeraldas'],
        ['J. Salgado', 'Renovación · 8 sep', '2753 · Transportes Aéreos Darién'],
      ],
      'Derivado del registro de pólizas por fecha de último movimiento. Registro inmutable.',
      'minmax(0,1fr) 128px 1fr',
    ),
    followUps: ['Ver historial completo de D. Vaca', 'Exportar para auditoría externa'],
  },
];

const PRODUCER_REPORTS: ReportSpec[] = [
  {
    key: 'cartera',
    keys: [
      'cartera',
      'tipo de aeronave',
      'helicóptero',
      'helicoptero',
      'ala fija',
      'asegurado',
      'asegurados',
    ],
    answer:
      'Tu cartera de 67 pólizas se reparte en ala fija (46 pólizas, US$ 360.995, 60%) y helicóptero (21 pólizas, US$ 242,643). Tu asegurado más grande es Grupo Aéreo Balboa S.A. con 6 pólizas por US$ 98.103, seguido de Aerocharter Metropolitano S.A. (8 pólizas, US$ 75,717).',
    report: tableCard(
      'Tu cartera por tipo de aeronave',
      'Panamá · tus 67 pólizas',
      ['Tipo', 'Pólizas', 'Prima US$'],
      [
        ['Ala fija', '46', '360,995'],
        ['Helicóptero', '21', '242,643'],
      ],
      'Clasificación estimada a partir del modelo de aeronave declarado. Fuente: tus 67 pólizas como producer.',
      'minmax(0,1fr) 78px 116px',
    ),
    followUps: [
      '¿Cómo va mi producción de este mes?',
      '¿Cuáles son mis próximas renovaciones?',
    ],
  },
  {
    key: 'produccion',
    keys: ['producción', 'produccion', 'mes', 'este mes', 'cómo va', 'como va', 'tendencia'],
    answer:
      'Junio fue tu mes más fuerte con 19 pólizas por US$ 148.922. Mayo cerró con 6 pólizas (US$ 130,089) y julio con 7 (US$ 86,103). Agosto no tuvo producción nueva, y septiembre lleva solo 1 póliza por US$ 2,812 hasta ahora, a mitad de mes.',
    report: chartCard(
      'Tu tendencia de prima emitida',
      'Panamá · abr–sep 2026 · US$',
      [
        ['abr', 72, 149],
        ['may', 130, 149],
        ['jun', 149, 149],
        ['jul', 86, 149],
        ['ago', 0, 149],
        ['sep', 3, 149],
      ],
      'Septiembre parcial (datos al 20 sep 2026). Fuente: fecha de vinculación/renovación de tus pólizas.',
    ),
    followUps: [
      '¿Cuál es mi cartera por tipo de aeronave?',
      '¿Cuáles son mis próximas renovaciones?',
    ],
  },
  {
    key: 'renovaciones',
    keys: ['renovación', 'renovacion', 'renovaciones', 'vencen', 'próximas'],
    answer:
      'Tienes 2 pólizas en ventana de renovación en los próximos 45 días, con US$ 11,767 de prima en riesgo: Aeroservicios del Istmo S.A. vence en 4 días y Vuelos del Canal S.A. en 39 días.',
    report: tableCard(
      'Tus próximas renovaciones',
      'Panamá · próximos 45 días',
      ['Póliza / asegurado', 'Vence en', 'Prima US$'],
      [
        ['2396 · Aeroservicios del Istmo S.A.', '4 días', '1,721'],
        ['2432 · Vuelos del Canal S.A.', '39 días', '10,046'],
      ],
      'Vencimiento estimado en fecha de vinculación + 1 año. Filtrado a tus 67 pólizas.',
      'minmax(0,1fr) 82px 108px',
    ),
    followUps: ['Ver mi panel', '¿Cuál es mi cartera por tipo de aeronave?'],
  },
  {
    key: 'estado',
    keys: ['estado', 'pólizas por estado', 'canceladas', 'vencidas', 'activas'],
    answer:
      'De tus 67 pólizas, 51 están renovadas (US$ 476,213), 8 vinculadas (US$ 90,125) y 7 endosadas (US$ 28,201) — 66 activas en total. 1 se canceló (US$ 9,099), para una tasa de cancelación del 1.5%.',
    report: tableCard(
      'Tus pólizas por estado',
      'Panamá',
      ['Estado', 'Pólizas', 'Prima US$'],
      [
        ['Renovada', '51', '476,213'],
        ['Vinculada', '8', '90,125'],
        ['Endosada', '7', '28,201'],
        ['Cancelada', '1', '-9,099'],
      ],
      'Prima de canceladas mostrada como devolución neta. Filtrado a tus 67 pólizas como producer.',
      'minmax(0,1fr) 78px 124px',
    ),
    followUps: ['¿Por qué se canceló?', '¿Cuál es mi cartera por tipo de aeronave?'],
  },
];

const FALLBACK_ADMIN: Omit<ReportSpec, 'key' | 'keys'> = {
  answer:
    'Puedo responder con cualquiera de los reportes del portafolio: cartera por país, producción por producer, bordereau mensual, próximas renovaciones, pólizas por estado, prima por tipo de uso, tendencia de prima emitida e historial de auditoría — todos calculados sobre las 369 pólizas reales de la cartera. ¿Cuál de esos temas le interesa?',
  report: null,
  followUps: ['¿Cómo va la producción de este mes?', 'Muéstrame el bordereau de agosto'],
};

const FALLBACK_PRODUCER: Omit<ReportSpec, 'key' | 'keys'> = {
  answer:
    'Puedo responder sobre tu propia cartera: tu cartera por tipo de aeronave, cómo va tu producción del mes, tus próximas renovaciones y tus pólizas por estado — todo calculado sobre tus 67 pólizas en Panamá. Los reportes agregados de todo el portafolio (bordereau, ranking de producers, auditoría) son visibles solo para el rol Administrator. ¿Cuál de tus reportes te interesa?',
  report: null,
  followUps: [
    '¿Cómo va mi producción de este mes?',
    '¿Cuáles son mis próximas renovaciones?',
  ],
};

const RESTRICTED: Omit<ReportSpec, 'key' | 'keys'> = {
  answer:
    'Ese reporte agrega datos de todo el portafolio y de otros producers, así que es visible solo para el rol Administrator. Puedo mostrarte el mismo tipo de información limitada a tu propia cartera en Panamá.',
  report: null,
  followUps: [
    '¿Cuál es mi cartera por tipo de aeronave?',
    '¿Cuáles son mis próximas renovaciones?',
  ],
};

const ADMIN_ONLY_HINTS = [
  'bordereau',
  'ranking',
  'top producer',
  'quién tiene',
  'quien tiene',
  'tipo de uso',
  'auditoría',
  'auditoria',
  'historial',
];

export const REPORT_KPIS: Record<ReportChatMode, ReportKpi[]> = {
  admin: [
    {
      value: 'US$ 3.59 M',
      label: 'Prima total de cartera',
      note: '369 pólizas · 13 países',
      accent: '#C9A24A',
    },
    {
      value: '351',
      label: 'Pólizas activas',
      note: 'Vinculadas, renovadas y endosadas',
      accent: '#0F1E33',
    },
    {
      value: '38',
      label: 'Renovaciones próximas',
      note: 'Próximos 45 días · US$ 423,006 en riesgo',
      accent: '#C9A24A',
    },
    {
      value: '13',
      label: 'Países activos',
      note: 'Sin países inactivos',
      accent: '#C2C9D3',
    },
  ],
  producer: [
    {
      value: 'US$ 603,638',
      label: 'Prima total de tu cartera',
      note: '67 pólizas · Panamá',
      accent: '#C9A24A',
    },
    {
      value: '66',
      label: 'Tus pólizas activas',
      note: 'Vinculadas, renovadas y endosadas',
      accent: '#0F1E33',
    },
    {
      value: '2',
      label: 'Tus renovaciones próximas',
      note: 'Próximos 45 días · US$ 11,767 en riesgo',
      accent: '#C9A24A',
    },
    {
      value: '1',
      label: 'País asignado',
      note: 'Panamá',
      accent: '#C2C9D3',
    },
  ],
};

export const REPORT_SUGGESTIONS: Record<ReportChatMode, string[]> = {
  admin: [
    '¿Cómo va la producción de este mes?',
    'Muéstrame el bordereau de agosto',
    '¿Qué producer tiene mayor producción?',
    'Pólizas por estado',
  ],
  producer: [
    '¿Cómo va mi producción de este mes?',
    '¿Cuáles son mis próximas renovaciones?',
    '¿Cuál es mi cartera por tipo de aeronave?',
    'Mis pólizas por estado',
  ],
};

export const REPORT_SEED: Record<
  ReportChatMode,
  { userText: string; reportKey: string }
> = {
  admin: { userText: '¿Cuál es la cartera por país?', reportKey: 'cartera' },
  producer: {
    userText: '¿Cuál es mi cartera por tipo de aeronave?',
    reportKey: 'cartera',
  },
};

function catalog(mode: ReportChatMode): ReportSpec[] {
  return mode === 'admin' ? ADMIN_REPORTS : PRODUCER_REPORTS;
}

export function reportCatalogCount(mode: ReportChatMode): number {
  return catalog(mode).length;
}

export function reportCountNote(mode: ReportChatMode): string {
  const n = reportCatalogCount(mode);
  return mode === 'admin'
    ? `${n} reportes disponibles · el agente selecciona el que responde su pregunta.`
    : `${n} reportes disponibles sobre tu cartera · el agente selecciona el que responde su pregunta.`;
}

export function matchReportKey(mode: ReportChatMode, text: string): string | null {
  const t = text.toLowerCase();
  let best: string | null = null;
  let score = 0;
  for (const spec of catalog(mode)) {
    const hits = spec.keys.filter((w) => t.includes(w)).length;
    if (hits > score) {
      score = hits;
      best = spec.key;
    }
  }
  return score > 0 ? best : null;
}

function isRestrictedProducerQuery(text: string): boolean {
  const t = text.toLowerCase();
  return ADMIN_ONLY_HINTS.some((w) => t.includes(w));
}

export function resolveReportSpec(
  mode: ReportChatMode,
  reportKey: string | null,
  userText?: string,
): Omit<ReportSpec, 'key' | 'keys'> {
  if (mode === 'producer' && userText && isRestrictedProducerQuery(userText)) {
    const local = matchReportKey('producer', userText);
    if (!local) return RESTRICTED;
  }

  if (!reportKey) {
    if (mode === 'producer' && userText && isRestrictedProducerQuery(userText)) {
      return RESTRICTED;
    }
    return mode === 'admin' ? FALLBACK_ADMIN : FALLBACK_PRODUCER;
  }

  const found = catalog(mode).find((r) => r.key === reportKey);
  if (!found) {
    return mode === 'admin' ? FALLBACK_ADMIN : RESTRICTED;
  }
  return found;
}

export function resolveAgentMessage(
  mode: ReportChatMode,
  reportKey: string | null,
  thinking: boolean,
  userText?: string,
): ResolvedAgentMessage {
  if (thinking) {
    return {
      text:
        mode === 'admin'
          ? 'Consultando el reporte adecuado…'
          : 'Consultando tu reporte…',
      thinking: true,
      report: null,
      followUps: [],
    };
  }
  const spec = resolveReportSpec(mode, reportKey, userText);
  return {
    text: spec.answer,
    thinking: false,
    report: spec.report,
    followUps: spec.followUps,
  };
}

export function exportReportCsv(report: ReportCardData, filename: string): void {
  const cols = report.columns?.map((c) => c.label) ?? [];
  const lines = [
    cols.join(','),
    ...(report.rows ?? []).map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','),
    ),
  ];
  if (report.bars?.length) {
    lines.length = 0;
    lines.push('Mes,Prima US$ K');
    for (const b of report.bars) {
      lines.push(`${b.label},${b.valueK}`);
    }
  }
  const blob = new Blob([lines.join('\n')], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
