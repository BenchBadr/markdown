function tokenize(markdown) {
    let inBlock = null;
    let bulletLevel = null;
    const output = [];

    const inlineSyntaxes = [
        { type: 'bold', regex: /\*\*(.+?)\*\*/g, render: true },
        { type: 'italic', regex: /\*(.+?)\*/g, render: true },
        { type: 'strikethrough', regex: /~~(.+?)~~/g, render: true },
        { type: 'underline', regex: /__(.+?)__/g, render: true },
        { type: 'code', regex: /`(.+?)`/g, render: false },
        { type: 'link', regex: /\[(.+?)\]\((.*?)\)/g, render: false },
        { type: 'image', regex: /!\[(.*?)\]\((.+?)\)/g, render: false },
        { type: 'inlineMath', regex: /\$(.+?)\$/g, render: false },
    ]


    const lineSyntax = [
      { type: 'h1', regex: /^#\s(.*)/, render: true, level:1 },
      { type: 'h2', regex: /^##\s(.*)/, render: true, level:2 },
      { type: 'h3', regex: /^###\s(.*)/, render: true, level:3 },
      { type: 'h4', regex: /^####\s(.*)/, render: true, level:4 },
      { type: 'h5', regex: /^#####\s(.*)/, render: true, level:5 },
      { type: 'h6', regex: /^######\s(.*)/, render: true, level:6 },
      { type: 'blockquote', regex: /^>\s?(.*)/, render: true, wrap: true},
  ];
  
  const blockSyntaxes = [
      { type: 'blockCode', regex: /^```/g, render: false, end:'\`\`\`' },
      { type: 'blockMath', regex: /^\$\$/g, render: false, end:'$$' },
      { type: 'details', regex: /^\|\|/g, render: true, end:'||' },
  ];

  
    function tokenInline(content) {
        if (!content) return [];
        const output = [];
        let lastIdx = 0;
      
        while (lastIdx < content.length) {
          let earliestMatch = null;
          let earliestSyntax = null;
      
          for (const syntax of inlineSyntaxes) {
            syntax.regex.lastIndex = lastIdx;
            const match = syntax.regex.exec(content);
            if (match && (!earliestMatch || match.index < earliestMatch.index)) {
              earliestMatch = match;
              earliestSyntax = syntax;
            }
          }
      
          if (earliestMatch) {
            if (earliestMatch.index > lastIdx) {
              output.push({ type: 'text', content: content.slice(lastIdx, earliestMatch.index) });
            }
      
            if (earliestSyntax.type === 'link' || earliestSyntax.type === 'image') {
              output.push({
                type: earliestSyntax.type,
                content: earliestMatch[1],
                url: earliestMatch[2]
              });
            } else {
              output.push({
                type: earliestSyntax.type,
                content: earliestSyntax.render ? tokenInline(earliestMatch[1]) : earliestMatch[1]
              });
            }
      
            lastIdx = earliestMatch.index + earliestMatch[0].length;
          } else {
            output.push({ type: 'text', content: content.slice(lastIdx) });
            break;
          }
        }
      
        return output;
      }

    function getBlock(line, checkBlock = true) {
        const trimmedLine = line.trim();
        const syntaxes = checkBlock ? blockSyntaxes : lineSyntax;
        for (let i = 0; i < syntaxes.length; i++) {
          const syntax = syntaxes[i];
          syntax.regex.lastIndex = 0;
          if (syntax.regex.test(trimmedLine)) {
            return i;
          }
        }
        return null;
    }

    const lines = markdown.split('\n');
    lines.forEach(line => {
        if (true){
            const key = getBlock(line)

            if (key !== null){
                if (inBlock === null){
                    const adapter = {blockCode:'language', blockMath:'global', details:'title'};
                    const currentSyntax = blockSyntaxes[key];
                    const extension = line.trim().slice(currentSyntax.end.length);
                    output.push({
                        type: currentSyntax.type,
                        content: [],
                        [adapter[currentSyntax.type]]: extension,
                    });
                    inBlock = key;
                    return;
                } else if (inBlock === key){
                    inBlock = null;
                    return;
                }
            }

            if (inBlock !== null){
                output[output.length - 1].content+=`${line}\n`;
            } else {
                const key = getBlock(line, false);
                const type = key!==null ? lineSyntax[key].type : 'paragraph';
                // exclude both null and 0 (as compared with previous)
                if (type==='paragraph' && output[output.length - 1] && output[output.length - 1].type === 'paragraph') {
                  if (line.replaceAll(' ', '') !== '') {
                    output[output.length - 1].content.push(...tokenInline(' '+line));
                  } else {
                    output.push({type:'paragraph', content:[]});
                  }
                } else if (key && lineSyntax[key].wrap) {
                  if (output[output.length - 1] && output[output.length - 1].type === type) {
                    output[output.length - 1].content += ' '+line.split(' ').slice(1).join(' ')+'\n';
                  } else {

                    output.push({
                      type: type,
                      content: line.split(' ').slice(1).join(' '),
                    });
                  }
                } else {
                  output.push({
                      type: type,
                      content: tokenInline(type!='paragraph' ? line.split(' ').slice(1).join(' ') : line),
                  })
                }
            }
        }
    });

    return output
};


export default tokenize;