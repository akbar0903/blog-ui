import { Checkbox, cn } from '@heroui/react'
import { ReactNode } from 'react'

interface CustomCheckboxProps {
  ariaLabel?: string
  value: string
  children: ReactNode
}

export default function CustomCheckbox(props: CustomCheckboxProps) {
  const { ariaLabel, value, children } = props

  return (
    <Checkbox
      aria-label={ariaLabel}
      value={value}
      classNames={{
        base: cn(
          'inline-flex w-full bg-content1 m-0',
          'hover:bg-content2 items-center justify-start',
          'cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        ),
      }}
    >
      {children}
    </Checkbox>
  )
}
