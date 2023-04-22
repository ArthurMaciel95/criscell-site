import React, { useState, createContext, useContext } from 'react'

interface GlobalContextData {
  contextWorking: string
}

export const GlobalContext = createContext<GlobalContextData>(
  {} as GlobalContextData
)

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cep, setCep] = useState('')

  const data = {
    cep,
    setCep,
  }

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  return useContext(GlobalContext)
}

