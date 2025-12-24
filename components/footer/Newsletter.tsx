import { Button } from "../ui/button";
import useFormFields from "@/hooks/useFormFields";
import { FormTypes } from "@/app/types/enums";
import FormFields from "../formFields/formFields";

const Newsletter = () => {
  const { getFormFields } = useFormFields({ slug: FormTypes.NEWSLETTER });
  return (
    <form className="flex flex-col gap-4">
      {getFormFields().map((field) => {
        return (
          <div key={field.name}>
            <FormFields  {...field} error={{}} />
          </div>
        );
      })}

      <Button className="bg-bottom px-4 py-2 rounded-md w-full!">اشترك</Button>
    </form>
  );
};

export default Newsletter;
