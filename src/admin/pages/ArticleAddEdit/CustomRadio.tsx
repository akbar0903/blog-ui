import { RadioProps, cn, Radio } from '@heroui/react'
import { ReactNode } from 'react'

interface CustomRadio {
  value: string
  children?: ReactNode
}

export default function CustomRadio(props: RadioProps) {
  const { value, children } = props

  return (
    <Radio
      value={value}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse cursor-pointer rounded-lg gap-4 p-3 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        ),
      }}
    >
      {children}
    </Radio>
  )
}
