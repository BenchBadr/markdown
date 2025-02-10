import { createContext, useState } from "react";

const initialMacros = {
  "\\C": "\\mathbb{C}",
  "\\Q": "\\mathbb{Q}",
  "\\D": "\\mathbb{D}",
  "\\K": "\\mathbb{K}",

  "\\lim": "\\underset{#1}{\\text{lim}}",
  "\\cases": "\\begin{cases} #1 \\end{cases}",
  "\\ifff": "\\underset{\\begin{matrix}#1\\end{matrix}}{\\iff}",
};

const MathContext = createContext();

export const MathProvider = ({ children }) => {
  const [macros, setMacros] = useState(initialMacros);
  console.log('enabled')

  return (
    <MathContext.Provider value={{ macros, setMacros }}>
      {children}
    </MathContext.Provider>
  );
};

export default MathContext;
export { initialMacros };
