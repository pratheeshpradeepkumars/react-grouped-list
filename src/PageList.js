import React from "react";

const PageList = ({ pageId, name, versionActiveData }) => {
  let options = [];
  for (let version in versionActiveData) {
    options.push({
      value: version,
      label: version,
      active: versionActiveData[version]
    });
  }
  let checkboxId = `${pageId}-${name.replace(/\s/g, "")}`;
  return (
    <div className="pages-list" style={{ display: "flex" }}>
      <input type="checkbox" id={checkboxId} />
      <label htmlFor={checkboxId}>{name}</label>
      <div />
    </div>
  );
};

export default PageList;
