const CopyWrapper = ({ textToCopy, children }) => {
    const handleCopy = (e) => {
      e.preventDefault();
      e.clipboardData.setData('text/plain', textToCopy);
      e.target.blur();
    };
  
    return (
      <span onCopy={handleCopy}>
        {children}
      </span>
    );
  };

export default CopyWrapper;