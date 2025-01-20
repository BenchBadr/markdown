import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const sharedMacros = {
  "\\RR": "\\mathbb{R}",
  "\\ZZ": "\\mathbb{Z}",
  // Add shared LaTeX commands here
};

export const addMacro = (name, definition) => {
  if (!sharedMacros[name]) {
    sharedMacros[name] = definition;
  }
};

const Math = ({ formula, block=false }) => {
  if (block) {
    const newCommands = extractNewCommands(formula);
    newCommands.forEach(cmd => addMacro(cmd.name, cmd.definition));
  }

  const html = katex.renderToString(formula, {
    macros: block ? sharedMacros : {},
    throwOnError: false
  });
  
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const extractNewCommands = (formula) => {
  const regex = /\\newcommand{\\(\w+)}{([^}]+)}/g;
  const commands = [];
  let match;
  while ((match = regex.exec(formula)) !== null) {
    commands.push({ name: `\\${match[1]}`, definition: match[2] });
  }
  return commands;
};

export default Math;