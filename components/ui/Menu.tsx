import { ReactNode } from 'react'
import BasicSwiper from './BasicSwiper'

const Menu = ({children}:{children: ReactNode}) => {
  return (
    <BasicSwiper>
      {children}
    </BasicSwiper>
  )
}

export default Menu