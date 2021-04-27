import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

import App from "./App";
const list = [
  {
    id: "07688482-6328-4552-af0a-2a39e9cb95ab",
    fileName: "jsw.zip",
    pages: [
      {
        name: "jsw_01",
        pageId: "685bf9ff901c4be4a37a5a33d31e007b",
        versionActiveData: {
          "version 1": true,
          master: false
        }
      }
    ]
  },
  {
    id: "15d8e4e2-a021-4f5b-a8c1-af4094f9e4ca",
    fileName: "pages.zip",
    pages: [
      {
        name: "ps_dont_delete",
        pageId: "38728b4d5a264ef69c12ed6a99c88b21",
        versionActiveData: {
          master: true
        }
      },
      {
        name: "Copy_of_IKEA - Design",
        pageId: "88f95b093d094170854751018bd96022",
        versionActiveData: {
          master1: true
        }
      },
      {
        name: "Copy_of_IKEA - Design",
        pageId: "ab8479422e9f4df9a15c08f96ca61696",
        versionActiveData: {
          master: true
        }
      }
    ]
  },
  {
    id: "07688482-6328-4552-af0a-2a39e9cb95ab-1",
    fileName: "jsw.zip",
    pages: [
      {
        name: "jsw_01",
        pageId: "685bf9ff901c4be4a37a5a33d31e007b",
        versionActiveData: {
          "version 1": true,
          master: false
        }
      }
    ]
  }
];

ReactDOM.render(<App data={list} />, document.getElementById("root"));
