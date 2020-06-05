import React, { Component } from 'react'
import colors from '../../styles/variables'
import './data-view.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ReactJson from 'react-json-view'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import _ from 'lodash'

export default class extends Component {
  constructor() {
    super();
    this.state = { index: 0 };
  }

  componentDidMount() {
  }

  render() {
    // const { datasetPreview = { data: [], meta: { columns: [] } } } = this.props
    const cleanData = this.getCleanData(this.props.data)
    const columns = this.props.columns.map((column) => {
      return { Header: column, id: column, accessor: (row) => row[column], headerClassName: 'table-header' }
    })

    return (
      <div id='data-view'>
        <Tabs
          selectedIndex={this.state.index}
          onSelect={tabIndex => this.setState({ index: tabIndex })}>
          <TabList className="header">
            <span className='tab-area'>
              <Tab data-testid="data-table">Table</Tab>
              <Tab data-testid="data-json">JSON</Tab>
            </span>
          </TabList>
          <TabPanel>
            <div id='data-view-table'>
              <ReactTable
                data={cleanData}
                columns={columns}
                loading={this.props.loading}
                defaultPageSize={50}
                style={{
                  height: '400px'
                }}
                className='-striped -highlight'
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div id="data-view-raw">
              <ReactJson src={this.props.data} theme={this.getTheme()} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  cleanseData(data) {
    return data.map(row => this.cleanseRow(row))
  }

  cleanseRow(row) {
    console.log("Cleansing row")
    const deconstructedObject = Object.entries(row)
    const listOfKeyValues = deconstructedObject.map(field =>
      ({ [field[0]]: this.cleanseField(field[1]) })
    )
    const reconstructedObject = Object.assign({}, ...listOfKeyValues)

    return reconstructedObject
  }

  cleanseField(value) {
    if (typeof value === "boolean") {
      return value.toString();
    } else if (_.isNull(value) || _.isNaN(value)) {
      return ''
    } else if (typeof value === "object") {
      return JSON.stringify(value);
    } else {
      return value;
    }
  }

  getCleanData(queryData) {
    return queryData ? this.cleanseData(queryData) : queryData
  }

  getTheme() {
    // react-json-view uses the 'base16' theme structure: 
    // https://github.com/chriskempson/base16/blob/master/styling.md
    return {
      base00: "white", // Default Background
      base01: "white", // Lighter Background
      base02: colors.headerGrey, // Null background
      base03: colors.almostBlack, // Null Text
      base04: colors.mediumGrey, // Item counts
      base05: colors.darkGrey, // Unused
      base06: colors.darkGrey, // Unused
      base07: colors.lightBlue, // Field names
      base08: colors.darkGrey, // Unused
      base09: colors.green, // Field values
      base0A: colors.darkGrey, // Unused
      base0B: colors.darkGrey, // Unused
      base0C: colors.darkGrey, // Unused
      base0D: colors.mediumGrey, // Expanders
      base0E: colors.mediumGrey, // Expanders
      base0F: colors.mediumGrey // Expanders
    }
  }
}
