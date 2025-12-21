import { IFormField } from "@/app/types/interfaces";
import { Label } from "../ui/label";
import { ValidationErrors } from "@/validations/auth";
import { Textarea } from "../ui/textarea";

interface Props extends IFormField {
  error: ValidationErrors;
}

const TextArea = ({
  label,
  name,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize mb-2">
        {label}
      </Label>
      <Textarea
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        id={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
      {error && error[name] && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error[name] ? "text-destructive" : ""
          }`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
};

export default TextArea;
