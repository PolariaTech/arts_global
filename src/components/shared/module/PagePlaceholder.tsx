type PagePlaceholderProps = {
  title: string;
  description?: string;
  modulePath: string;
};

/** Placeholder temporal hasta implementar la pantalla del mockup. */
export function PagePlaceholder({ title, description, modulePath }: PagePlaceholderProps) {
  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-[#E4E8EE] bg-white px-6 py-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#0F1E33]">{title}</h1>
        {description ? (
          <p className="mt-1.5 text-[13.5px] text-[#6B7483]">{description}</p>
        ) : null}
      </header>
      <div className="flex flex-1 flex-col gap-2 px-6 py-6">
        <p className="max-w-xl text-[13px] leading-relaxed text-[#8A93A1]">
          Pantalla en construcción. El shell (sidebar + marca) ya está activo; el contenido
          de negocio llega en los siguientes pasos.
        </p>
        <p className="font-mono text-[11px] text-[#A9B2BF]">Módulo: {modulePath}</p>
      </div>
    </main>
  );
}
