'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ArtsRole } from '@/constants/roles';
import {
  BLANK_USER_FORM,
  filterUsers,
  formFromUser,
  formatUserCountries,
  listAssignableCountries,
  listUsers,
  ROLE_BADGE,
  saveUser,
  toggleUserActive,
  userInitials,
  USER_ROLE_TABS,
  usersSummary,
  type UserFormState,
} from '@/services/mock/users';
import { UserFormPanel } from './UserFormPanel';

const GRID =
  'minmax(190px,1.2fr) minmax(215px,1.4fr) minmax(138px,.8fr) minmax(195px,1.2fr) minmax(98px,.58fr) minmax(140px,.85fr)';

export function UsersListPage() {
  const [tick, setTick] = useState(0);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<ArtsRole | 'Todos'>('Todos');
  const [focus, setFocus] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState<UserFormState>(BLANK_USER_FORM);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  const allUsers = useMemo(() => listUsers(), [tick]);
  const rows = useMemo(
    () => filterUsers(query, roleFilter),
    [query, roleFilter, tick],
  );
  const summary = useMemo(() => usersSummary(allUsers), [allUsers]);
  const countryCatalog = listAssignableCountries();

  function openNew() {
    setForm({ ...BLANK_USER_FORM, countries: [] });
    setPanelOpen(true);
  }

  function openEdit(id: number) {
    const u = allUsers.find((x) => x.id === id);
    if (!u) return;
    setForm(formFromUser(u));
    setPanelOpen(true);
  }

  function onSave() {
    if (!form.name.trim()) {
      setPanelOpen(false);
      return;
    }
    saveUser(form);
    setPanelOpen(false);
    refresh();
  }

  function onToggleCountry(country: string) {
    setForm((f) => {
      const has = f.countries.includes(country);
      return {
        ...f,
        countries: has
          ? f.countries.filter((c) => c !== country)
          : [...f.countries, country],
      };
    });
  }

  function onToggleAllCountries() {
    setForm((f) => ({
      ...f,
      countries:
        f.countries.length === countryCatalog.length ? [] : [...countryCatalog],
    }));
  }

  return (
    <>
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-6">
        <div
          className="mx-auto flex flex-wrap items-end justify-between gap-5"
          style={{ maxWidth: 'min(1680px, 94vw)' }}
        >
          <div>
            <h1 className="m-0 mb-[5px] text-[22px] font-semibold tracking-tight text-[#0F1E33]">
              Gestión de usuarios
            </h1>
            <p className="m-0 text-[13.5px] text-[#6B7483]">{summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="pointer-events-none absolute top-[13px] left-[13px]"
              >
                <circle
                  cx="6.6"
                  cy="6.6"
                  r="4.8"
                  fill="none"
                  stroke="#8A93A1"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.4 10.4 L14.2 14.2"
                  stroke="#8A93A1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocus('query')}
                onBlur={() => setFocus(null)}
                placeholder="Buscar usuario…"
                className={`h-10 w-[232px] rounded-[3px] border bg-white pr-3 pl-[38px] text-[13.5px] text-[#14181F] outline-none ${
                  focus === 'query'
                    ? 'border-[#C9A24A] shadow-[0_0_0_3px_rgba(201,162,74,.18)]'
                    : 'border-[#C8CFD9]'
                }`}
              />
            </div>
            <button
              type="button"
              onClick={openNew}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[3px] border-0 bg-[#C9A24A] px-[18px] text-sm font-semibold tracking-wide text-[#0F1E33] shadow-[0_1px_2px_rgba(15,30,51,.16)] hover:bg-[#B98F35]"
            >
              <span className="text-lg leading-none">+</span>
              Nuevo usuario
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-[#F7F8FA] px-6 pt-5 pb-[100px]">
        <div
          className="mx-auto flex flex-col gap-3.5"
          style={{ maxWidth: 'min(1680px, 94vw)' }}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            {USER_ROLE_TABS.map((t) => {
              const on = roleFilter === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setRoleFilter(t)}
                  className="inline-flex h-[34px] cursor-pointer items-center rounded-[3px] border px-3.5 text-[13px] transition-colors"
                  style={{
                    fontWeight: on ? 600 : 500,
                    background: on ? '#0F1E33' : '#FFFFFF',
                    color: on ? '#FFFFFF' : '#5C6675',
                    borderColor: on ? '#0F1E33' : '#D8DDE5',
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
            <div className="overflow-x-auto">
              <div
                className="grid min-w-[1060px] gap-x-4 gap-y-3 border-b border-[#E4E8EE] bg-[#FAFBFC] px-[22px] py-3"
                style={{ gridTemplateColumns: GRID }}
              >
                {['Nombre', 'Email', 'Rol', 'Países asignados', 'Estado', 'Acciones'].map(
                  (h) => (
                    <span
                      key={h}
                      className={`text-[11px] font-semibold tracking-wider text-[#8A93A1] uppercase ${
                        h === 'Acciones' ? 'text-right' : ''
                      }`}
                    >
                      {h}
                    </span>
                  ),
                )}
              </div>

              {rows.map((u, i) => {
                const role = ROLE_BADGE[u.role];
                return (
                  <div
                    key={u.id}
                    className="grid min-w-[1060px] gap-x-4 gap-y-3 px-[22px] py-[13px] transition-colors hover:bg-[#FAFBFC]"
                    style={{
                      gridTemplateColumns: GRID,
                      borderBottom: i === rows.length - 1 ? 'none' : '1px solid #F0F2F6',
                      opacity: u.active ? 1 : 0.72,
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-[11px]">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11.5px] font-semibold tracking-wide"
                        style={{
                          background: u.active ? '#0F1E33' : '#E4E8EE',
                          color: u.active ? '#C9A24A' : '#8A93A1',
                        }}
                      >
                        {userInitials(u.name)}
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-sm font-medium leading-snug text-[#14181F]">
                          {u.name}
                        </span>
                        <span className="text-xs text-[#9AA3AE]">{u.lastActive}</span>
                      </div>
                    </div>
                    <span className="self-center overflow-hidden text-[13.5px] text-ellipsis whitespace-nowrap text-[#3B4553]">
                      {u.email}
                    </span>
                    <span
                      className="inline-flex items-center gap-[7px] self-center justify-self-start rounded-[3px] border px-2.5 py-[5px] text-[11.5px] font-semibold tracking-wide whitespace-nowrap"
                      style={{
                        background: role.bg,
                        color: role.color,
                        borderColor: role.border,
                      }}
                    >
                      {u.role}
                    </span>
                    <span className="self-center text-[13.5px] leading-snug text-[#3B4553] text-pretty">
                      {formatUserCountries(u.countries)}
                    </span>
                    <span
                      className="inline-flex items-center gap-[7px] self-center justify-self-start rounded-[3px] border px-2.5 py-[5px] text-[11.5px] font-semibold tracking-wide whitespace-nowrap"
                      style={
                        u.active
                          ? {
                              background: '#EDF6EF',
                              color: '#245F35',
                              borderColor: '#B5D8BF',
                            }
                          : {
                              background: '#F0F2F6',
                              color: '#5C6675',
                              borderColor: '#E0E4EA',
                            }
                      }
                    >
                      {u.active ? 'Activo' : 'Inactivo'}
                    </span>
                    <div className="flex items-center justify-end gap-3.5 self-center">
                      <button
                        type="button"
                        onClick={() => openEdit(u.id)}
                        className="cursor-pointer border-0 border-b border-[#C9A24A] bg-transparent p-0 text-[13px] font-medium text-[#0F1E33] hover:border-[#8A6E22] hover:text-[#8A6E22]"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          toggleUserActive(u.id);
                          refresh();
                        }}
                        className="cursor-pointer border-0 border-b bg-transparent p-0 text-[13px] font-medium"
                        style={{
                          color: u.active ? '#8E2B29' : '#245F35',
                          borderBottomColor: u.active ? '#E9BDBC' : '#B5D8BF',
                        }}
                      >
                        {u.active ? 'Desactivar' : 'Reactivar'}
                      </button>
                    </div>
                  </div>
                );
              })}

              {rows.length === 0 ? (
                <div className="min-w-[1060px] px-6 py-[52px] text-center">
                  <p className="m-0 mb-1 text-[14.5px] font-medium text-[#3B4553]">
                    Sin usuarios
                  </p>
                  <p className="m-0 text-[13px] text-[#8A93A1]">
                    Ajuste la búsqueda o el filtro de rol.
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          <p className="m-0 text-[12.5px] leading-relaxed text-[#8A93A1]">
            Los usuarios no se eliminan. Al desactivar, se conserva el historial completo de pólizas
            y cotizaciones asociadas para auditoría.
          </p>
        </div>
      </main>

      {panelOpen ? (
        <UserFormPanel
          form={form}
          focus={focus}
          onChange={(key, value) => setForm((f) => ({ ...f, [key]: value }))}
          onToggleCountry={onToggleCountry}
          onToggleAllCountries={onToggleAllCountries}
          onFocus={setFocus}
          onBlur={() => setFocus(null)}
          onClose={() => setPanelOpen(false)}
          onSave={onSave}
        />
      ) : null}
    </>
  );
}
