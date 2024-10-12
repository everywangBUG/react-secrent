import { CSSProperties, FormEvent, useRef, useState } from "react"
import FormContext from "./FormContext"

interface FormProps {
  classNames?: string
  style?: CSSProperties
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (errors: Record<string, any>) => void
  initialValues?: Record<string, any>
  children?: React.ReactNode
}

export const Form: React.FC<FormProps> = (props) => {
  const { classNames, style, onFinish, onFinishFailed, initialValues, children, ...others } = props

  const [values, setValues] = useState<Record<string, any>>(initialValues ?? {})

  const validatorMap = useRef(new Map<string, Function>())

  const errors = useRef<Record<string, any>>({})

  const onValueChange = (key: string, value: any) => {
    values[key] = value
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    for(const [key, callbackFun] of validatorMap.current) {
      if (typeof callbackFun === "function") {
        errors.current[key] = callbackFun()
      }
    }

    const errorList = Object.keys(errors.current).map(key => {
      return errors.current[key]
    }).filter(Boolean)

    if (errorList.length) {
      onFinishFailed?.(errors.current)
    } else {
      onFinish?.(values)
    }
  }

  const handleValidateRegister = (name: string, cb: Function) => {
    validatorMap.current.set(name, cb)
  }

  return (
    <FormContext.Provider
      value={{
        onValueChange,
        values,
        setValues: (v) => setValues(v),
        validateRegister: handleValidateRegister,
      }}
    >
      <form
        onSubmit={handleSubmit} {...others}>{children}
      </form>
    </FormContext.Provider>
  )
}
