"use server"

import { getCategoryById } from "../db/category"

export const getCatByIdToClient = async(catId: string)=>{
    return await getCategoryById(catId)
}