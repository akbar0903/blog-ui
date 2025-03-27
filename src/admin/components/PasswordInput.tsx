import { Input } from '@heroui/react'
import { ChangeEvent, useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'

interface PasswordInputProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label?: string
  name?: string
  placeholder?: string
  labelPlacement?: 'inside' | 'outside' | 'outside-left'
  className?: string
}

export default function PasswordInput(props: PasswordInputProps) {
  const { value, onChange, label, name, placeholder, labelPlacement, className } = props

  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <Input
      label={label}
      name={name}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? (
            <IoEye className="text-xl text-default-400 pointer-events-none" />
          ) : (
            <IoEyeOff className="text-xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={passwordVisible ? 'text' : 'password'}
    />
  )
}
