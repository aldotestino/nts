import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hookFormProps: UseFormRegisterReturn,
  error?: FieldError
}

function Input ({ label, type, placeholder, hookFormProps, error }: InputProps) {

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input 
        type={type}
        placeholder={placeholder}
        className="input input-bordered  input-primary"
        {...hookFormProps}
      />
      {error && <label className="label">
        <span className="label-text-alt text-red-500">{error?.message}</span>
      </label>}
    </div>
  );
}

export default Input;