import { Label } from "../ui/label";
import { Checkbox as ShadcnCheckbox } from "../ui/checkbox";
import { IFormField } from "@/app/types/interfaces";

interface Props {
  onClick?: () => void;
  checked?: boolean;
  label?: IFormField["label"];
  name: IFormField["name"];
}

const Checkbox = ({ label, name, checked, onClick }: Props) => {
  return (
    <div className="text-accent flex items-center gap-2">
      <ShadcnCheckbox
        type="button"
        id={name}
        name={name}
        onClick={onClick}
        checked={checked||false}
      />
      <Label htmlFor={name} className="text-sm text-white font-normal">
        {label}
      </Label>
    </div>
  );
};

export default Checkbox;