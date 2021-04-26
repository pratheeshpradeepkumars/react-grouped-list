import React, { useState } from "react";

const PageList = ({
  fileId,
  pageId,
  name,
  versionActiveData,
  checked = false,
  onSelect,
  validatePageName
}) => {
  let options = [];
  for (let version in versionActiveData) {
    options.push({
      value: version,
      label: version,
      active: versionActiveData[version]
    });
  }
  let checkboxId = `${pageId}-${name.replace(/\s/g, "")}`;
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState(name);
  const [isValidText, setIsValidText] = useState(true);

  const onEdit = id => {
    setEditItem(id);
  };

  const handleEditChange = e => {
    let value = e.target.value;
    setEditText(value);
    const isValid = validatePageName({ pageId, pageName: value, checked });
    if (!isValid) {
      setIsValidText(false);
    }
  };

  const handleOnBlur = () => {
    if (editText && editText !== "") {
      const isValid = validatePageName({ pageId, pageName: editText, checked });
      if (isValid) {
        setEditItem(null);
        setIsValidText(true);
      } else {
        setIsValidText(false);
      }
    } else {
      setEditItem(null);
      setEditText(name);
    }
  };

  //enter key press
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleOnBlur(event);
    }
  };

  return (
    <div className="pages-list" style={{ display: "flex" }}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={e => onSelect(e, { pageId })}
      />
      {editItem !== pageId ? (
        <label htmlFor={checkboxId}>{name}</label>
      ) : (
        <input
          placeholder={isValidText}
          className={`${isValidText ? "" : "invalid-text"}`}
          type="text"
          value={editText}
          onChange={handleEditChange}
          onKeyPress={e => handleKeyPress(e)}
          autoFocus
          onFocus={e => e.currentTarget.select()}
          onBlur={e => handleOnBlur(e)}
        />
      )}
      <button onClick={() => onEdit(pageId)}>Edit</button>
      <div />
    </div>
  );
};

export default PageList;
