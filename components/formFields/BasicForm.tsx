"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ReactNode } from "react"
import { Textarea } from "../ui/textarea"


export default function BasicForm({
    btn={
        lable: "submit",
        classNames: "",
        disabled: false
    },
    formOptions,
    fieldSet,
}:{
    btn?:{lable: string, classNames: string, disabled: boolean},
    fieldSet: {
        name: string,
        type: string,
        label: string,
        placeholder: string,
        des?: string
    }[]
    formOptions:{logo?:ReactNode, onSubmit: (values:any)=>void, form:any, classNames?: string, footer?:ReactNode},
}) {
 


  return (
      <Form {...formOptions.form}>
      <form onSubmit={formOptions.form.handleSubmit(formOptions.onSubmit)} className={`${formOptions.classNames??""} space-y-8`}>
        {formOptions.logo&&formOptions.logo}
        {fieldSet?.map(({ type, name, label, placeholder, des })=>{
            return <FormField
            key={label}
            control={formOptions.form.control}
            name={`${name}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 mb-1">{label}</FormLabel>
                <FormControl>
                  {type==="textarea"?(
                    <Textarea className="h-40" placeholder={placeholder} {...field}/>
                  ):(
                  <Input placeholder={placeholder} type={type} {...field} />

                  )}
                </FormControl>
                <FormDescription>
                  {des}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        })}
        
        <Button disabled={btn.disabled} className={`${btn.classNames}`} type="submit">{btn.lable}</Button>
        {formOptions.footer&&formOptions.footer}
      </form>
    </Form>
  )
}