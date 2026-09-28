'use client';

type FormState = {
  name: string;
  code: string;
  currency: string;
  contact: string;
};

type NewCountryPanelProps = {
  form: FormState;
  focus: string | null;
  onChange: (key: keyof FormState, value: string) => void;
  onFocus: (key: string) => void;
  onBlur: () => void;
  onClose: () => void;
  onSave: () => void;
};

function fieldClass(on: boolean, extra = '') {
  return [
    'h-[46px] w-full rounded-[3px] border bg-white px-3.5 text-[14.5px] text-[#14181F] outline-none transition-[border-color,box-shadow] duration-100',
    on
      ? 'border-[#C9A24A] shadow-[0_0_0_3px_rgba(201,162,74,.18)]'
      : 'border-[#C8CFD9]',
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}

export function NewCountryPanel({
  form,
  focus,
  onChange,
  onFocus,
  onBlur,
  onClose,
  onSave,
}: NewCountryPanelProps) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        aria-label="Cerrar panel"
        className="absolute inset-0 cursor-pointer border-0 bg-[rgba(15,30,51,.42)]"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-[480px] flex-col bg-white shadow-[-12px_0_40px_rgba(15,30,51,.18)]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b-2 border-[#C9A24A] bg-[#0F1E33] px-6 py-5">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A24A] uppercase">
              Nuevo país
            </span>
            <span className="text-[17px] font-semibold text-white">Iniciar configuración</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border border-[#2A3B54] bg-transparent text-[15px] leading-none text-[#B9C3D1] hover:bg-[#1B3252] hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          <label className="flex flex-col gap-[7px]">
            <span className="text-[11.5px] font-semibold tracking-wide text-[#3B4553] uppercase">
              Nombre del país
            </span>
            <input
              value={form.name}
              onChange={(e) => onChange('name', e.target.value)}
              onFocus={() => onFocus('name')}
              onBlur={onBlur}
              placeholder="Ej. Ecuador"
              className={fieldClass(focus === 'name')}
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-[7px]">
              <span className="text-[11.5px] font-semibold tracking-wide text-[#3B4553] uppercase">
                Código
              </span>
              <input
                value={form.code}
                onChange={(e) => onChange('code', e.target.value.toUpperCase())}
                onFocus={() => onFocus('code')}
                onBlur={onBlur}
                placeholder="EC"
                className={fieldClass(focus === 'code', 'tracking-wide uppercase')}
              />
            </label>
            <label className="flex flex-col gap-[7px]">
              <span className="text-[11.5px] font-semibold tracking-wide text-[#3B4553] uppercase">
                Moneda
              </span>
              <input
                value={form.currency}
                onChange={(e) => onChange('currency', e.target.value.toUpperCase())}
                onFocus={() => onFocus('currency')}
                onBlur={onBlur}
                placeholder="USD"
                className={fieldClass(focus === 'currency', 'tracking-wide uppercase')}
              />
            </label>
          </div>

          <label className="flex flex-col gap-[7px]">
            <span className="text-[11.5px] font-semibold tracking-wide text-[#3B4553] uppercase">
              Contacto del país
            </span>
            <input
              value={form.contact}
              onChange={(e) => onChange('contact', e.target.value)}
              onFocus={() => onFocus('contact')}
              onBlur={onBlur}
              placeholder="Responsable operativo local"
              className={fieldClass(focus === 'contact')}
            />
          </label>

          <div className="flex flex-col gap-2 rounded border border-[#E0E4EA] bg-[#FAFBFC] px-[18px] py-4">
            <span className="text-[13.5px] font-semibold text-[#14181F]">
              Se creará con 16 elementos por validar
            </span>
            <span className="text-[12.5px] leading-relaxed text-[#6B7483] text-pretty">
              8 archivos de datos estructurados, 5 documentos y 3 metadatos. El país queda «No
              iniciado» hasta que se cargue el primer archivo, y no permite emitir pólizas hasta
              estar activo.
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E8EE] px-6 py-[18px]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 cursor-pointer items-center rounded-[3px] border border-[#C2C9D3] bg-white px-5 text-[14.5px] font-medium text-[#0F1E33] hover:border-[#0F1E33] hover:bg-[#F7F8FA]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-11 cursor-pointer items-center rounded-[3px] border-0 bg-[#C9A24A] px-6 text-[14.5px] font-semibold text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
          >
            Crear país
          </button>
        </div>
      </div>
    </div>
  );
}
