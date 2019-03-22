import './dataset-api-doc.scss'
import { QueryStringBuilder } from '../../utils'
import _ from 'lodash'

const DatasetApiDoc = props => {
  if (!props.dataset) { return <div /> }

  return (
    <dataset-api-doc>
      <div className='header-container'>
        <div className='header-text-items'>
          <div className='api-doc-header'>Dataset API Example</div>
          <div>Access Operating System data with supported queries. All supported clauses follow standard ANSI SQL standards.</div>
        </div>
      </div>
      <div className='example-container'>
        <div className='example-header'>Example: Select all, limited to 200 records</div>
        <div className='example-code'><code>GET: {`${window.API_HOST}/api/v1/dataset/${props.dataset.id}/query?limit=200&orderBy=id asc&where=id=3`}</code></div>
        <div className='example-header'>Parameters</div>
        <div className='example-parameters'>
          <table class='parameter-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Example</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {apiParams.map(i => {
                return [
                  <tr key={`${i.name}`}>
                    <td><span class='pill'>{i.name}</span></td>
                    <td class='parameter-example'>{i.example}</td>
                    <td>{i.description}</td>
                  </tr>
                ]
              })}
            </tbody>
          </table>
        </div>
      </div>
    </dataset-api-doc>
  )
}

const createKeyword = (name) => <a key={`dataset-keyword-${name}`} className='keyword' href={`/?${QueryStringBuilder.createFilterQueryString('keywords', name)}`}>{name}</a>

const apiParams = [
  {
    name: "columns",
    description: "A list of columns from the dataset to be included in the query. Defaults to all columns.",
    example: "column1,column2,column3"
  },
  {
    name: "where",
    description: "A set of conditions to filter rows by. Multiple conditions can be added, seperated by AND or OR",
    example: "column1='a value' OR column1='another value'"
  },
  {
    name: "orderBy",
    description: "A column (or comma seperated list of columns) to order the results by and one of 'asc' or 'desc' to determine the direction of each.",
    example: "column1 asc, column2 desc"
  },
  {
    name: "limit",
    description: "A whole number limiting the total rows returned. The API does not guaruntee the same list of rows every time when limited this way.",
    example: "100"
  },
  {
    name: "groupBy",
    description: "A column (or space-separated list of columns) to group the results by.",
    example: "column1='a value'"
  }
]

export default DatasetApiDoc
