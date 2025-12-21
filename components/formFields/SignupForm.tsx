"use client"
import BasicForm from './BasicForm'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'
import Motion from '../ui/motion'
const SignupForm = () => {
    const formSchema = z.object({
        name: z.string("this's cann't be empty").min(2, {
          message: "Username must be at least 2 characters.",
        }),
        email: z.email("enter a valid email!"),
        password: z.string("this's cann't be empty").min(8, "password must be at least 8 charchter!"),
        password2: z.string("this's cann't be empty").min(8, "password must be at least 8 charchter!")
      }).refine(({password, password2})=>password===password2, {
        message: "passwords don't match!",
        path: ["password2"]
      })
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password2: ""
        },
      })
          // 2. Define a submit handler.
          async function onSubmit(values: z.infer<typeof formSchema>) {
            const res = {status: 200, message: "eror"}
            if(res.status===201){
              toast.success("signup successfully")
              redirect("/login")
            }else{
              toast.error(res.message)
            }
            
            
          }
  return (
    <Motion init={{y: 200, opacity: 0}} animate={{y: 0, opacity: 1, transition: {duration: 0.5}}}>
    
        <BasicForm btn={
            {
            lable: "Signup",
            classNames: "auth-form-btn",
            disabled: false
            }
        }
        formOptions={{
            logo: (
                <Link href={'/'}>
                <h1 className='mb-[40px] text-2xl text-center font-bold'><span className='mr-[10px] text-rose-500'>Gaming</span>Boi</h1>

                </Link>
            ),
            form: form,
            onSubmit: onSubmit,
            classNames: "auth-form",
            footer: (<p>
                Already Have An Account ?!  <Link className='text-rose-400 hover:underline' href={"/login"}>Login In to Your Account !</Link>
            </p>)
        }}
        fieldSet={[
            {
                label: "name",
                placeholder: "name",
                name: "name",
                type: "text"
            },
            {
            label: "email",
            placeholder: "email",
            name: "email",
            type: "text"
        },
            {
            label: "password",
            placeholder: "password",
            name: "password",
            type: "password"
        },
            {
            label: "confirm password",
            placeholder: "confirm password",
            name: "password2",
            type: "password"
        },
        ]}
        />
    </Motion>
  )
}

export default SignupForm