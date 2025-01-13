import React from 'react';

function renderContent(item) {
  switch (item.key) {
    case 'text':
      return item.content;
    case 'bold':
      return React.createElement('strong', null, item.content.map(renderContent));
    case 'italic':
      return React.createElement('em', null, item.content.map(renderContent));
    case 'underline':
      return React.createElement('u', null, item.content.map(renderContent));
    default:
      return <a style={{color:'red'}}>{item.content.map(renderContent)}</a>;
  }
}

function tokenToHtml(tokens) {
  return tokens.map((token, index) => {
    const content = Array.isArray(token.content)
      ? token.content.map(renderContent)
      : token.content;

    switch (token.type) {
      case 'h1':
        return React.createElement('h1', { key: index }, content);
      case 'paragraph':
        return React.createElement('p', { key: index }, content);
      case 'blockquote':
        return React.createElement('blockquote', { key: index }, content);
      default:
        return null;
    }
  });
}

export default tokenToHtml;
