import { Label } from './Label'
import { LabelError } from './LabelError'

interface SelectInputProps {
  register: any
  errors: any
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  options: any[]
  value?: string
  key?: string
  placeholder?: string
}

export default function SelectInput(props: SelectInputProps) {
  return (
    <div>
      <label htmlFor={props.name} className="text-white">
        {props.label}
      </label>

      <select
        className="input-text"
        id={props.name}
        value={props.register.state}
        disabled={props.disabled}
        {...props.register(props.name, { required: props.required })}
      >
        <option value="" disabled={true}>
          {props.placeholder}
        </option>
        {props.options?.map((option, index) => (
          <option key={index} value={option[props.value]}>
            {option.nome}
          </option>
        ))}
      </select>
      <LabelError
        msg={props.errors[props.name]?.message as string}
        hasError={props.errors[props.name] as any}
      />
    </div>
  )
}

// implements

{
  /* <SelectInput
register={register}
errors={errors}
label={'Gerência'}
name={'gerencia'}
options={[
  { value: '1', label: 'Gerência 1' },
  { value: '2', label: 'Gerência 2' },
  { value: '3', label: 'Gerência 3' },
]}
/> */
}

