"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TabsContextValue {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

export const Tabs = ({ defaultValue, className = "", children }: TabsProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export const TabsList = ({ className = "", children }: TabsListProps) => {
  return (
    <div className={`flex space-x-1 rounded-md bg-black/30 p-1 ${className}`}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const TabsTrigger = ({ value, className = "", children }: TabsTriggerProps) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  const { value: selectedValue, setValue } = context;
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={`relative w-full rounded-md py-2.5 text-sm font-medium transition-all focus:outline-none ${
        isSelected
          ? "text-white"
          : "text-gray-400 hover:text-white hover:bg-black/20"
      } ${className}`}
      onClick={() => setValue(value)}
    >
      {isSelected && (
        <motion.div
          className="absolute inset-0 z-10 rounded-md bg-gradient-to-r from-violet-600/80 to-indigo-600/80"
          layoutId="tab-indicator"
          transition={{ type: "spring", duration: 0.5 }}
          style={{ borderRadius: "0.375rem" }}
        />
      )}
      <span className={`relative z-20 ${isSelected ? "text-white" : ""}`}>
        {children}
      </span>
    </button>
  );
};

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const TabsContent = ({ value, className = "", children }: TabsContentProps) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  const { value: selectedValue } = context;
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 