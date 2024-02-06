import { HTMLProps, useEffect, useRef } from 'react'

export function TableCheckbox({
  indeterminate,
  ...rest
}: {
  indeterminate?: boolean
} & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return <input type="checkbox" ref={ref} {...rest} />
}
