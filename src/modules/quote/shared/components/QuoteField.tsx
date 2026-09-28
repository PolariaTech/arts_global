'use client';

import { useState, type CSSProperties, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

const baseField = (on: boolean, extra?: CSSProperties): CSSProperties => ({
  height: 46,
  padding: '0 14px',
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 14.5,
  color: '#14181F',
  background: '#FFFFFF',
  borderRadius: 3,
  outline: 'none',
  border: on ? '1px solid #C9A24A' : '1px solid #C8CFD9',
  boxShadow: on ? '0 0 0 3px rgba(201,162,74,.18)' : 'none',
  transition: 'border-color .12s, box-shadow .12s',
  ...extra,
});

type FieldShellProps = {
  label: string;
  htmlFor?: string;
  full?: boolean;
  children: React.ReactNode;
};

export function FieldShell({ label, htmlFor, full, children }: FieldShellProps) {
  return (
    <div
      className="flex flex-col gap-[7px]"
      style={full ? { gridColumn: '1 / -1' } : undefined}
    >
      <label
        htmlFor={htmlFor}
        className="text-[11.5px] font-semibold tracking-[0.06em] text-[#3B4553] uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

type QuoteInputProps = InputHTMLAttributes<HTMLInputElement> & {
  fieldExtra?: CSSProperties;
};

export function QuoteInput({ fieldExtra, onFocus, onBlur, style, ...rest }: QuoteInputProps) {
  const [on, setOn] = useState(false);
  const emphasized = fieldExtra?.border?.toString().includes('2px solid');
  const focusExtra: CSSProperties =
    emphasized && on
      ? { border: '2px solid #C9A24A', boxShadow: '0 0 0 3px rgba(201,162,74,.22)' }
      : {};
  return (
    <input
      {...rest}
      style={{ ...baseField(on && !emphasized, fieldExtra), ...focusExtra, ...style }}
      onFocus={(e) => {
        setOn(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setOn(false);
        onBlur?.(e);
      }}
    />
  );
}

type QuoteSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function QuoteSelect({ onFocus, onBlur, style, children, ...rest }: QuoteSelectProps) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative">
      <select
        {...rest}
        style={{
          ...baseField(on, { paddingRight: 34, cursor: 'pointer', appearance: 'none' }),
          ...style,
        }}
        onFocus={(e) => {
          setOn(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setOn(false);
          onBlur?.(e);
        }}
      >
        {children}
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
  );
}

type QuoteTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function QuoteTextarea({ onFocus, onBlur, style, ...rest }: QuoteTextareaProps) {
  const [on, setOn] = useState(false);
  return (
    <textarea
      {...rest}
      style={{
        ...baseField(on, {
          height: 'auto',
          padding: '12px 14px',
          lineHeight: 1.5,
          resize: 'vertical',
        }),
        ...style,
      }}
      onFocus={(e) => {
        setOn(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setOn(false);
        onBlur?.(e);
      }}
    />
  );
}
