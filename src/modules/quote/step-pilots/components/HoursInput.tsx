'use client';

import { QuoteInput } from '@/modules/quote/shared/components/QuoteField';

type HoursInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  emphasized?: boolean;
};

export function HoursInput({ id, value, onChange, emphasized }: HoursInputProps) {
  return (
    <div className="relative">
      <QuoteInput
        id={id}
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        fieldExtra={
          emphasized
            ? {
                height: 52,
                padding: '0 16px',
                paddingRight: 48,
                fontSize: 17,
                fontWeight: 600,
                color: '#0F1E33',
                fontVariantNumeric: 'tabular-nums',
                border: '2px solid #D8BE7E',
              }
            : {
                paddingRight: 44,
                fontVariantNumeric: 'tabular-nums',
              }
        }
      />
      <span
        className="pointer-events-none absolute text-xs"
        style={{
          right: emphasized ? 16 : 14,
          top: emphasized ? 17 : 15,
          color: emphasized ? '#8A6E22' : '#9AA3AE',
        }}
      >
        hrs
      </span>
    </div>
  );
}
