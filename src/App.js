import React, { Component } from "react";
import PageList from "./PageList";

export default class extends Component {
  state = {
    uploadedFiles: [],
    searchValue: ""
  };

  componentDidMount() {
    this.setState({ uploadedFiles: this.props.data });
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({ searchValue: value });
  };

  filterBySearchValue(searchValue) {
    let newData = [];
    let uploadedFiles = this.state.uploadedFiles;
    uploadedFiles.forEach(files => {
      let newFiles = { ...files };
      const filterData = files.pages.filter(page => {
        let name = page.name || "";
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
      });
      newFiles.pages = [];
      if (filterData.length > 0) {
        newFiles.pages = [...filterData];
        newData.push(newFiles);
      }
    });
    return newData;
  }
  render() {
    const { searchValue } = this.state;
    const filteredUploadedFiles = this.filterBySearchValue(searchValue);
    return (
      <div className="uploaded-info-container">
        <div className="search-box">
          <input
            type="text"
            value={searchValue}
            placeholder="Search pages"
            onChange={this.handleChange}
          />
        </div>
        <div className="uploaded-info-list">
          {filteredUploadedFiles.map(list => (
            <div className="header" key={list.id}>
              <div className="file-name">{list.fileName}</div>
              {list.pages.map(page => {
                return <PageList key={page.pageId} {...page} />;
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
