import React from 'react'
import { LabelError } from './LabelError'

export function TextForm({
  register,
  errors,
  name,
  label,
  value,
  required = false,
  disabled = false,
  placeholder = ' ',
}: {
  register: any
  errors: any
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  value?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="text-white/80 text-sm">
        {label + ' ' + (required ? '*' : '')}
      </label>
      <input
        type="text"
        id={name}
        value={value}
        placeholder={placeholder}
        style={errors[name] && { border: '1px solid red' }}
        {...register(name, {
          required: { message: 'Campo obrigatório', value: required },
        })}
        className="input-text"
        disabled={disabled}
      />
      <LabelError
        msg={errors[name]?.message as string}
        hasError={errors[name] as any}
      />
    </div>
  )
}

