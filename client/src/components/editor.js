import React, { useState } from 'react';
import Split from 'react-split';
import tokenize from '../util/text/parser';
import tokenToHtml from '../util/text/render';
import './Editor.css';

const Editor = () => {
  const [leftContent, setLeftContent] = useState('');

  return (
    <Split className="split-container" sizes={[32, 32, 33]} minSize={100}>
      <div className="editor-panel">
        <textarea
          value={leftContent}
          onChange={(e) => setLeftContent(e.target.value)}
          placeholder="Left panel content (editable)"
        />
      </div>
      <div className="editor-panel">
        <div className="non-editable-content">
          {leftContent?<pre>{JSON.stringify(tokenize(leftContent), null, 2)}</pre>:'Type on the left panel content will appear here.'}
        </div>
      </div>
      <div className='editor-panel'>
        <div className='non-editable-content'>
            {tokenToHtml(tokenize(leftContent))}
        </div>
      </div>
    </Split>
  );
};

export default Editor;
