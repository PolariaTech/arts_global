'use client';

import { ROLE_HINTS, ROLES, type ArtsRole } from '@/constants/roles';
import {
  listAssignableCountries,
  type UserFormState,
} from '@/services/mock/users';

type UserFormPanelProps = {
  form: UserFormState;
  focus: string | null;
  onChange: <K extends keyof UserFormState>(key: K, value: UserFormState[K]) => void;
  onToggleCountry: (country: string) => void;
  onToggleAllCountries: () => void;
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

export function UserFormPanel({
  form,
  focus,
  onChange,
  onToggleCountry,
  onToggleAllCountries,
  onFocus,
  onBlur,
  onClose,
  onSave,
}: UserFormPanelProps) {
  const countries = listAssignableCountries();
  const allSelected = form.countries.length === countries.length;
  const editing = form.id != null;

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
              {editing ? 'Editar usuario' : 'Nuevo usuario'}
            </span>
            <span className="text-[17px] font-semibold text-white">
              {editing ? form.name || 'Usuario' : 'Crear acceso a la plataforma'}
            </span>
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
              Nombre
            </span>
            <input
              value={form.name}
              onChange={(e) => onChange('name', e.target.value)}
              onFocus={() => onFocus('name')}
              onBlur={onBlur}
              placeholder="Nombre y apellido"
              className={fieldClass(focus === 'name')}
            />
          </label>

          <label className="flex flex-col gap-[7px]">
            <span className="text-[11.5px] font-semibold tracking-wide text-[#3B4553] uppercase">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
              onFocus={() => onFocus('email')}
              onBlur={onBlur}
              placeholder="nombre@arts-global.com"
              className={fieldClass(focus === 'email')}
            />
          </label>

          <label className="flex flex-col gap-[7px]">
            <span className="text-[11.5px] font-semibold tracking-wide text-[#3B4553] uppercase">
              Rol
            </span>
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) => onChange('role', e.target.value as ArtsRole)}
                onFocus={() => onFocus('role')}
                onBlur={onBlur}
                className={fieldClass(focus === 'role', 'cursor-pointer appearance-none pr-9')}
              >
                <option value={ROLES.producer}>Producer</option>
                <option value={ROLES.claimsViewer}>Claims Viewer</option>
                <option value={ROLES.administrator}>Administrator</option>
                <option value={ROLES.auditor}>Auditor</option>
              </select>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                aria-hidden="true"
                className="pointer-events-none absolute top-5 right-3.5"
              >
                <path
                  d="M1 1 L5 5 L9 1"
                  fill="none"
                  stroke="#5C6675"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xs leading-snug text-[#8A93A1]">{ROLE_HINTS[form.role]}</span>
          </label>

          <div className="flex flex-col gap-[9px]">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11.5px] font-semibold tracking-wide text-[#3B4553] uppercase">
                Países asignados
              </span>
              <button
                type="button"
                onClick={onToggleAllCountries}
                className="cursor-pointer border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[12.5px] font-medium text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
              >
                {allSelected ? 'Quitar todos' : 'Seleccionar todos'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => {
                const on = form.countries.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onToggleCountry(c)}
                    className="inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-[3px] border px-[13px] text-[13.5px] transition-[background,border-color]"
                    style={{
                      fontWeight: on ? 600 : 500,
                      background: on ? '#FBF6EA' : '#FFFFFF',
                      color: on ? '#0F1E33' : '#5C6675',
                      borderColor: on ? '#C9A24A' : '#D8DDE5',
                    }}
                  >
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border"
                      style={{
                        background: on ? '#C9A24A' : '#FFFFFF',
                        borderColor: on ? '#C9A24A' : '#C8CFD9',
                      }}
                    >
                      {on ? (
                        <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                          <path
                            d="M2 6.4 L4.6 9 L10 3.2"
                            fill="none"
                            stroke="#0F1E33"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : null}
                    </span>
                    {c}
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-[#8A93A1]">
              {form.countries.length === 0
                ? 'Sin países asignados · el usuario no verá cotizaciones.'
                : `${form.countries.length} de ${countries.length} países asignados`}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 rounded border border-[#E0E4EA] bg-[#FAFBFC] px-[18px] py-4">
            <div className="flex flex-col gap-[3px]">
              <span className="text-sm font-semibold text-[#14181F]">
                {form.active ? 'Usuario activo' : 'Usuario inactivo'}
              </span>
              <span className="text-[12.5px] leading-snug text-[#6B7483]">
                {form.active
                  ? 'Puede iniciar sesión y operar según su rol.'
                  : 'Se conserva todo su historial; no podrá iniciar sesión.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange('active', !form.active)}
              aria-label={form.active ? 'Desactivar usuario' : 'Activar usuario'}
              className="flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center rounded-full border-0 p-[3px] transition-colors"
              style={{
                background: form.active ? '#C9A24A' : '#C8CFD9',
                justifyContent: form.active ? 'flex-end' : 'flex-start',
              }}
            >
              <span className="block h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(15,30,51,.28)]" />
            </button>
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
            className="inline-flex h-11 min-w-[170px] cursor-pointer items-center justify-center rounded-[3px] border-0 bg-[#C9A24A] px-[26px] text-[14.5px] font-semibold tracking-wide text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
          >
            {editing ? 'Guardar cambios' : 'Crear usuario'}
          </button>
        </div>
      </div>
    </div>
  );
}
