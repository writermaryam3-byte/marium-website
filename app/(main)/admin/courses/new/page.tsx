import Container from '@/components/layouts/Container'
import React from 'react'
import Form from './_components/form'
import { getCategories } from '@/server/db/category'

const AddNewCoursePage = async() => {
  const categories = await getCategories()
  return (
    <main>
        <Container>
            <h1 className='my-5 text-3xl'>اضافة دورة جديدة</h1>
            <Form categories={categories}/>
        </Container>
    </main>
  )
}

export default AddNewCoursePage