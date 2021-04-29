import React, { useState, useEffect } from "react";
import Select from "react-select";

const PageList = ({
  fileId,
  pageId,
  name,
  versionActiveData,
  checked = false,
  onSelect,
  validatePageName,
  handleEdit,
  getSelectedOptions,
  status
}) => {
  let options = [];
  for (let version in versionActiveData) {
    options.push({
      value: version,
      label: version,
      active: versionActiveData[version]
    });
  }
  let checkboxId = `${fileId}-${pageId}-${name.replace(/\s/g, "")}`;
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState(name);
  const [isValidText, setIsValidText] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    if (selectedOption.length === 0) {
      let master = options.filter(op => op.value === "master");
      let list = master.length === 0 || !master ? [options[0]] : master;
      setSelectedOption(list);
      getSelectedOptions(`${fileId}-${pageId}`, list);
    }
  }, [selectedOption]);

  const onEdit = id => {
    setEditItem(id);
  };

  const handleEditChange = e => {
    let value = e.target.value;
    setEditText(value);
    const isValid = validatePageName({ pageId, pageName: value, checked });
    if (!isValid) {
      setIsValidText(false);
    } else {
      setIsValidText(true);
    }
  };

  const handleOnBlur = () => {
    if (editText && editText !== "") {
      const isValid = validatePageName({ pageId, pageName: editText, checked });
      if (isValid) {
        setEditItem(null);
        setIsValidText(true);
        if (editText !== name) {
          handleEdit({ fileId, pageId, pageName: editText });
        }
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

  // mutiselct handle change
  const handleMutiSelect = selectedOption => {
    setSelectedOption(selectedOption);
    getSelectedOptions(`${fileId}-${pageId}`, selectedOption);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "25px",
      height: "325x",
      boxShadow: state.isFocused ? null : null
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      // height: "25px",
      padding: "0 6px"
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px"
    }),
    indicatorSeparator: state => ({
      display: "none"
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "25px"
    })
  };

  let imported = status[`${fileId}:${pageId}`] === "done";
  let failed = status[`${fileId}:${pageId}`] === "failed";

  return (
    <div className="pages-list">
      {!imported && (
        <input
          type="checkbox"
          className="selection-box"
          id={checkboxId}
          checked={checked}
          onChange={e => onSelect(e, { pageId, pageName: editText })}
        />
      )}

      {editItem !== pageId ? (
        <label htmlFor={checkboxId}>{name}</label>
      ) : (
        <input
          className={`edit-text ${isValidText ? "" : "invalid-text"}`}
          type="text"
          value={editText}
          onChange={handleEditChange}
          onKeyPress={e => handleKeyPress(e)}
          autoFocus
          onFocus={e => e.currentTarget.select()}
          onBlur={e => handleOnBlur(e)}
        />
      )}
      {!imported && (
        <button
          className={`edit-page-name ${
            editItem === pageId ? "is-editing" : ""
          }`}
          onClick={() => onEdit(pageId)}
        >
          Edit
        </button>
      )}
      {imported && <div>Imported</div>}
      {failed && <div>Failed</div>}
      <div className="version-select">
        <Select
          value={selectedOption}
          onChange={handleMutiSelect}
          options={options}
          styles={customStyles}
          isMulti
          isClearable={false}
          isDisabled={imported}
        />
      </div>

      <div />
    </div>
  );
};

export default PageList;
