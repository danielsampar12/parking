import { forwardRef, useRef } from 'react'

import { Input, InputProps, useMergeRefs } from '@chakra-ui/react'
import CurrencyInput from 'react-currency-input-field'

interface BrazilianCurrencyInputProps extends InputProps {
  disabled?: boolean
}

export const BrazilianCurrencyInput = forwardRef<
  HTMLInputElement,
  BrazilianCurrencyInputProps
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef, ref)

  return (
    <Input
      as={CurrencyInput}
      ref={mergeRef}
      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
      decimalScale={2}
      {...props}
    />
  )
})

BrazilianCurrencyInput.displayName = 'BrazilianCurrencyInput'
