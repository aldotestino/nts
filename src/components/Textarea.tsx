import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hookFormProps: UseFormRegisterReturn,
  error?: FieldError
}

function Input ({ label, placeholder, hookFormProps, error }: InputProps) {

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        placeholder={placeholder}
        className="textarea textarea-bordered textarea-primary"
        {...hookFormProps}
      />
      {error && <label className="label">
        <span className="label-text-alt text-red-500">{error?.message}</span>
      </label>}
    </div>
  );
}

export default Input;