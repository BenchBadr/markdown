// render.jsx
import React from 'react';
import { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';

const InlineContent = ({ content }) => {
  if (!content) return null;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((token, index) => <Token key={index} token={token} />);
  }
  return <Token token={content} />;
};

const Token = ({ token }) => {
  if (typeof token === 'string') return token;
  
  const tokenType = token.type || token.key;

  switch (tokenType) {
    case 'h1':
      return <h1><InlineContent content={token.content} /></h1>;
    case 'h2':
      return <h2><InlineContent content={token.content} /></h2>;
    case 'h3':
      return <h3><InlineContent content={token.content} /></h3>;
    case 'h4':
      return <h4><InlineContent content={token.content} /></h4>;
    case 'h5':
      return <h5><InlineContent content={token.content} /></h5>;
    case 'h6':
      return <h6><InlineContent content={token.content} /></h6>;
    case 'paragraph':
      return <p><InlineContent content={token.content} /></p>;
    case 'blockquote':
      return <blockquote><InlineContent content={token.content} /></blockquote>;
    case 'blockCode':
      return (
        <pre><code className={`language-${token.language}`}>{token.content}</code></pre>
      );
    case 'blockMath':
      return <div>{token.content}</div>;
    case 'bold':
      return <strong><InlineContent content={token.content} /></strong>;
    case 'italic':
      return <em><InlineContent content={token.content} /></em>;
    case 'strikethrough':
      return <del><InlineContent content={token.content} /></del>;
    case 'underline':
      return <u><InlineContent content={token.content} /></u>;
    case 'code':
      return <code><InlineContent content={token.content} /></code>;
    case 'link':
      const linkContent = token.content;
      if (typeof linkContent === 'object' && linkContent.key === 'text') {
        return <a href={linkContent.content}>{linkContent.content}</a>;
      }
      return (
        <a href={<InlineContent content={token.content} />}>
          <InlineContent content={token.content} />
        </a>
      );
    case 'image':
      const imgContent = token.content;
      if (typeof imgContent === 'object' && imgContent.key === 'text') {
        return <img src={imgContent.content} alt={imgContent.content} />;
      }
      return (
        <img 
          src={<InlineContent content={token.content} />}
          alt={<InlineContent content={token.content} />}
        />
      );
    case 'inlineMath':
      return <span>{token.content}</span>;
    case 'text':
      return token.content;
    default:
      return null;
  }
};

const MarkdownContent = ({ tokens }) => {
  if (!tokens) return null;
  
  return (
    <div>
      {tokens.map((token, index) => (
        <Token key={index} token={token} />
      ))}
    </div>
  );
};

function tokenToHtml(tokens) {
  return <MarkdownContent tokens={tokens} />;
}

export default tokenToHtml;