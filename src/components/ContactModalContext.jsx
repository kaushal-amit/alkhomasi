import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ContactModalContext = createContext({ open: () => {}, close: () => {}, isOpen: false })

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])
  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>
}

export const useContactModal = () => useContext(ContactModalContext)
