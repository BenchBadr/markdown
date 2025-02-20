import { createContext, useState, useEffect } from "react";

const initialMacros = {
  // "\\C": "\\mathbb{C}",
  // "\\Q": "\\mathbb{Q}",
  // "\\D": "\\mathbb{D}",
  // "\\K": "\\mathbb{K}",

  // "\\lim": "\\underset{#1}{\\text{lim}}",
  // "\\cases": "\\begin{cases} #1 \\end{cases}",
  // "\\ifff": "\\underset{\\begin{matrix}#1\\end{matrix}}{\\iff}",
  // "\\matrix": "\\begin{bmatrix}#1\\end{bmatrix}",

  // "\\ncr":"\\begin{pmatrix}#1 \\\\ #2\\end{pmatrix}"
};

const MathContext = createContext();

export const MathProvider = ({ children }) => {
  const [macros, setMacros] = useState(initialMacros);

  useEffect(() => {
    console.log("macros", macros);
  }, [macros]);
  return (
    <MathContext.Provider value={{ macros, setMacros }}>
      {children}
    </MathContext.Provider>
  );
};

export default MathContext;
export { initialMacros };
