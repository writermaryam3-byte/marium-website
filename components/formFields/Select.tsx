import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ValidationErrors } from "@/validations/auth";
import { IFormField } from "@/app/types/interfaces";
import { Category } from "@/lib/generated/prisma/client";
import { Label } from "../ui/label";

interface Props extends IFormField {
  error: ValidationErrors;
  data: (Category | any)[];
}
export default function SelectField({
  data,
  label,
  name,
  placeholder,
  error,
  defaultValue,
}: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize mb-2">
        {label}
      </Label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger className="w-full!" dir="rtl">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-full!" dir="rtl">
          <SelectGroup className="w-full!">
            <SelectLabel>{label}</SelectLabel>
            {data.map((cat: Category) => {
              return (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
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
}
