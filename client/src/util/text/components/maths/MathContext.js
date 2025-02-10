import { createContext, useState } from "react";

const initialMacros = {
  "\\C": "\\mathbb{C}",
  "\\Q": "\\mathbb{Q}",
  "\\D": "\\mathbb{D}",
  "\\K": "\\mathbb{K}",

  "\\lim": "\\underset{#1}{\\text{lim}}",
  "\\cases": "\\begin{cases} #1 \\end{cases}",
  "\\ifff": "\\underset{\\begin{matrix}#1\\end{matrix}}{\\iff}",

  '\\p':'#1, #2, #3'
};

const MathContext = createContext();

export const MathProvider = ({ children }) => {
  const [macros, setMacros] = useState(initialMacros);

  const addMacros = (alias, command) => {
    const tempMacros = {...macros};
    tempMacros[alias] = command;
    setMacros(tempMacros);
  };

  return (
    <MathContext.Provider value={{ macros, addMacros }}>
      {children}
    </MathContext.Provider>
  );
};

export default MathContext;
export { initialMacros };
