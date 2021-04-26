import React, { Component } from "react";
import PageList from "./PageList";

export default class extends Component {
  state = {
    uploadedFiles: [],
    searchValue: "",
    selectedList: [],
    editItem: null,
    error: [],
    importPagesList: []
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

  // handle list select
  handleSelect = (e, { pageId, id, pageName }) => {
    let checked = e.target.checked,;
    let newList = [...this.state.uploadedFiles].map(files => {
      if(files.id === id) {
         files.pages.map(page => {
          if(page.pageId === pageId) {
            page.checked = checked
          }
          return page;
        })
        return files
      }else {
        return files;
      }
    });
    this.setState({ uploadedFiles: newList}, () => {
      this.validatePageName({pageId, pageName, checked});
      this.selectedPagesInfo();
    })
  };

  // On Edit save
  handleEdit = ({fileId, pageId, pageName}) => {
    let { uploadedFiles }  = this.state;
    let processedFiles = uploadedFiles.map(files => {
      if(files.id === fileId) {
        files.pages.map(page => {
          if(page.pageId === pageId) {
            page.name = pageName
          }
          return page
        })
      }
      return files;
    });
    this.setState( { uploadedFiles: processedFiles }, () => {
      this.selectedPagesInfo();
    });
  }

  // Version name validation
   validatePageName = ({ pageId, pageName, checked }) => {
    let isValid = false;
    let patt = new RegExp('^[A-Za-z0-9](([_\.\\-\|\: ]?[a-zA-Z0-9]?)*)$');
    if (patt.test(pageName)) {
      isValid = true;
    }
    if (pageName.length < 2) {
      isValid = false;
    }
    if(!isValid && checked) {
      this.setState({error: [...this.state.error, pageId]})
    } else {
      let filteredValue = [...this.state.error].filter(err => err !== pageId);
       this.setState({error: filteredValue});
    }
    return isValid;
  };


  // selected pages deatails

  selectedPagesInfo() {
    let { uploadedFiles } = this.state;
    let filteredUploadFiles = [];
    uploadedFiles.forEach(files => {
      let newFiles = {...files};
      let filteredChecked = files.pages.filter(page => page.checked);
      newFiles.pages = [];
      if(filteredChecked.length > 0) {
        newFiles.pages = [...filteredChecked];
        filteredUploadFiles.push(newFiles);
      }
    });
    this.setState({importPagesList: filteredUploadFiles});
  }

  // On click Inport
  handleImport = () => {
    let { importPagesList, error }= this.state;
    if(importPagesList && importPagesList.length > 0 && error.length === 0) {
      console.log("Import values : ", JSON.stringify(importPagesList, null, 2));
    }else {
      alert("Please select valid pages for importing.")
    }
    
  }

  render() {
    const { searchValue, importPagesList } = this.state;
    const filteredUploadedFiles = this.filterBySearchValue(searchValue);
    let isClickable = importPagesList.length > 0;
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
              <div className="pages-list-container">
              {list.pages.map(page => {
                return (
                  <PageList
                    key={page.pageId}
                    fileId={list.id}
                    {...page}
                    onSelect={(e, { pageId, pageName }) => {
                      this.handleSelect(e, { pageId, id: list.id, pageName });
                    }}
                    handleEdit={this.handleEdit}
                    validatePageName={this.validatePageName}
                  />
                );
              })}</div>
            </div>
          ))}
        </div>
        <button disabled={!isClickable} onClick={this.handleImport}>Import</button>
      </div>
    );
  }
}
