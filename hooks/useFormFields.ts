import { FormTypes } from "@/app/types/enums";
import { IFormField, IFormFieldsVariables } from "@/app/types/interfaces";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const loginFields = (): IFormField[] => [
    {
      name: "phone",
      type: "text",
      label: "رقم الهاتف",
      placeholder: "ادخل رقم الهاتف",
      autoFocus: true,
    },
    {
      name: "password",
      type: "password",
      label: "كلمة المرور",
      placeholder: "ادخل كلمة المرور",
    },
  ];
  const singupFields = (): IFormField[] => [
    {
      name: "username",
      type: "text",
      label: "الاسم",
      placeholder: "ادخل الاسم",
      autoFocus: true,
    },
    {
      name: "email",
      type: "email",
      label: "البريد الالكتروني",
      placeholder: "ادخل بريدك الالكتروني",
    },
    {
      name: "phone",
      type: "text",
      label: "رقم الهاتف",
      placeholder: "ادخل رقم الهاتف",
    },
    {
      name: "career",
      type: "text",
      label: "الوظيفة",
      placeholder: "ادخل الوظيفة",
    },
    {
      name: "password",
      type: "password",
      label: "كلمة المرور",
      placeholder: "ادخل كلمة المرور",
    },
    {
      name: "password2",
      type: "password",
      label: "اعادة كلمة المرور",
      placeholder: "ادخل كلمة المرور مرة اخري",
    },
  ];
  const contactFields = (): IFormField[] => [
    {
      name: "username",
      type: "text",
      label: "الاسم",
      placeholder: "ادخل الاسم",
    },
    {
      name: "email",
      type: "email",
      label: "البريد الالكتروني",
      placeholder: "ادخل بريدك الالكتروني",
    },
    {
      name: "message",
      type: "textarea",
      label: "الرسالة",
      placeholder: "ادخل  الرسالة",
    },
  ];

  const profileFields = (): IFormField[] => [
    {
      name: "username",
      type: "text",
      label: "الاسم",
      placeholder: "ادخل الاسم",
      autoFocus: true,
    },
    {
      name: "email",
      type: "email",
      label: "البريد الالكتروني",
      placeholder: "ادخل بريدك الالكتروني",
    },
    {
      name: "phone",
      type: "text",
      label: "رقم الهاتف",
      placeholder: "ادخل رقم الهاتف",
    },
    {
      name: "career",
      type: "text",
      label: "الوظيفة",
      placeholder: "ادخل الوظيفة",
    },
    {
      label: "عنوان الشارع",
      name: "streetAddress",
      type: "text",
      placeholder: "ادخل عنوان الشارع",
    },
    {
      label: "الكود البريدي",
      name: "postalCode",
      type: "text",
      placeholder: "ادخل الكود البريدي",
    },
    {
      label: "المدينة",
      name: "city",
      type: "text",
      placeholder: "المدينة",
    },
    {
      label: "الدولة",
      name: "country",
      type: "text",
      placeholder: "الدولة",
    },
  ];
  const courseFields = (): IFormField[] => [
    {
      name: "title",
      type: "text",
      label: "عنوان الدورة",
      placeholder: "ادخل عنوان الدورة",
      autoFocus: true,
    },
    {
      name: "description",
      type: "text",
      label: "وصف الدورة",
      placeholder: "ادخل وصف الدورة",
    },
    {
      name: "categoryId",
      type: "select",
      label: "الفئة",
      placeholder: "ادخل فئة الدورة",
    },
    {
      name: "basePrice",
      type: "text",
      label: "السعر الاساسي",
      placeholder: "ادخل سعر الدورة",
    },
  ];
  const articleFields = (): IFormField[] => [
    {
      name: "title",
      type: "text",
      label: "عنوان المقالة",
      placeholder: "ادخل عنوان المقالة",
      autoFocus: true,
    },
    {
      name: "description",
      type: "text",
      label: "وصف المقالة",
      placeholder: "ادخل وصف المقالة",
    },
    {
      name: "categoryId",
      type: "select",
      label: "الفئة",
      placeholder: "ادخل فئة المقالة",
    },
    {
      name: "readingTime",
      type: "text",
      label: "وقت قراءة المقالة",
      placeholder: "ادخل وقت القراءة",
    },
    {
      name: "content",
      type: "textarea",
      label: "محتوي المقالة",
      placeholder: "ادخل محتوي المقالة",
    },

  ];
  const checkoutFields =(): IFormField[]=>[
    {
      name: "email",
      type: "text",
      label: "البريد الاكتروني",
      placeholder: "ادخل  البريد الاكتروني",
    },
    {
      name: "phone",
      type: "text",
      label: "رقم الهاتف",
      placeholder: "ادخل رقم الهاتف",
    },
    {
      label: "عنوان الشارع",
      name: "streetAddress",
      type: "text",
      placeholder: "ادخل عنوان الشارع",
    },
    {
      label: "الكود البريدي",
      name: "postalCode",
      type: "text",
      placeholder: "ادخل الكود البريدي",
    },
    {
      label: "المدينة",
      name: "city",
      type: "text",
      placeholder: "المدينة",
    },
    {
      label: "الدولة",
      name: "country",
      type: "text",
      placeholder: "الدولة",
      
    },
  ]
  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case FormTypes.SIGNIN:
        return loginFields();
      case FormTypes.SIGNUP:
        return singupFields();
      case FormTypes.CONTACT:
        return contactFields();
      case FormTypes.EDITUSER:
        return profileFields();
      case FormTypes.ADDCOURSE:
        return courseFields();
      case FormTypes.ADDARTICLE:
        return articleFields();
      case FormTypes.CHECKOUT:
        return checkoutFields();
      default:
        return [];
    }
  };

  return { getFormFields };
};

export default useFormFields;
