import { FormTypes } from "./enums";

export interface Email {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
}

export interface CourseInCart {
  slug: string;
  count: number;
}
export interface IOption {
  label: string;
  value: string;
}
export interface IFormField {
  name: string;
  label?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "hidden"
    | "textarea";
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption;
  id?: string;
  defaultValue?: string;
  readOnly?: boolean;
}
export interface IFormFieldsVariables {
  slug: FormTypes;
}
