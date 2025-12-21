import { ValidationErrors } from "@/validations/auth";
import TextField from "./TextField";
import { InputTypes } from "@/app/types/enums";
import { IFormField } from "@/app/types/interfaces";
import PasswordField from "./PasswordField";
import Checkbox from "./CheckboxField";
import Select from "./Select";
import { Category } from "@/lib/generated/prisma/client";
import TextArea from "./TextArea";

interface Props extends IFormField {
  error: any;
  data?: (Category|any)[]
}

const FormFields = (props: Props) => {
  const { type } = props;
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    if (type === InputTypes.CHECKBOX) {
      return <Checkbox {...props} />;
    }
    if(type===InputTypes.TEXTAREA){
      return <TextArea {...props}/>
    }
    if (type === InputTypes.SELECT&&props.data) {
      return <Select {...props} data={props.data||[]} />;
    }
    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;
