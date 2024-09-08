import React, { PropsWithChildren } from "react"
import { sizeType } from "./Space"

export interface ConfigContextType {
  space?: {
    size?: sizeType
  }
}

export const ConfigContext = React.createContext<ConfigContextType>({})

interface ConfigProviderProps extends PropsWithChildren<ConfigContextType> {}

export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { space, children } = props
  return (
    <ConfigContext.Provider value={{space}}>
      {children}
    </ConfigContext.Provider>
  )
}