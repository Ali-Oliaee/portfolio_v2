"use client";

import { createContext, useContext } from 'react';

type Messages = Record<string, any>;

const IntlContext = createContext<Messages>({});

export function IntlProvider({ 
  children, 
  messages 
}: { 
  children: React.ReactNode;
  messages: Messages;
}) {
  return (
    <IntlContext.Provider value={messages}>
      {children}
    </IntlContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const messages = useContext(IntlContext);
  
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split('.');
    let value: any = messages;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || fullKey;
  };
}
