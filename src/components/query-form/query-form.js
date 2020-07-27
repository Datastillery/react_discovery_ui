import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './query-form.scss'
import LoadingElement from '../generic-elements/loading-element'
import RecommendationList from '../recommendation-list'
import ReactTooltip from 'react-tooltip'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import MergeType from '@material-ui/icons/MergeType'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea'

const TEXT_AREA_MIN_HEIGHT = 100;
const TEXT_AREA_HEIGHT_OFFSET = 5;

const QueryForm = props => {
  const {
    queryText,
    recommendations,
    usedDatasets,
    datasetReferences,
    isQueryLoading,
    queryFailureMessage,
    isQueryDataAvailable,

    executeQuery,
    cancelQuery,
    setQueryText
  } = props

  const [localQueryText, setLocalQueryText] = useState(queryText)
  const textAreaRef = useRef(null)

  React.useEffect(() => {
    setLocalQueryText(queryText);
  }, [queryText])

  const handleQueryChange = event => {
    setLocalQueryText(event.target.value)
  }

  const updateReduxQueryText = e => setQueryText(e.target.value)

  const submit = () => {
    executeQuery(localQueryText)
  }

  const cancel = () => {
    cancelQuery()
  }

  const textArea = <TextareaAutosize
    style={{ minHeight: `${TEXT_AREA_MIN_HEIGHT}px` }}
    type='text'
    placeholder='SELECT * FROM ...'
    value={localQueryText}
    onBlur={updateReduxQueryText}
    onChange={handleQueryChange}
    onInput={handleQueryChange}
    className='query-input'
    ref={textAreaRef}
    data-testid='query-input'
    rows={3}
  />
  const submitButton = <button data-testid="submit-query-button" className="action-button" disabled={isQueryLoading} onClick={submit}>Submit</button>
  const cancelButton = <button data-testid="cancel-query-button" className="action-button" disabled={!isQueryLoading} onClick={cancel}>Cancel</button>

  const showSuccessMessage = !queryFailureMessage && isQueryDataAvailable && !isQueryLoading
  const successMessage = showSuccessMessage && (
    <span data-testid='success-message' className='success-message'>
      Query successful
    </span>
  )

  const showFailureMessage = queryFailureMessage && !isQueryLoading
  const failureMessage = (
    showFailureMessage && <span data-testid='error-message' className='error-message'>
      {queryFailureMessage}
    </span>
  )

  const recommendationSection = () => {
    const toolTipText = 'These datasets have related fields or columns that may be suitable for joining in your query'
    if (!_.isEmpty(recommendations)) {
      return (
        <div className="recommendation-section link-list">
          <div className="title">
            <span>Recommendations</span>
            <ReactTooltip effect="solid" />
            <InfoOutlined className="info-icon" data-tip={toolTipText} />
          </div>
          <RecommendationList recommendations={recommendations} />
        </div>
      )
    }
  }

  const createDatasetLinks = (datasetIds) => {
    return datasetIds.map((datasetId) => {
      const dataset = datasetReferences[datasetId]
      if (!dataset) {
        return
      }
      return (
        <span className="dataset-reference" key={datasetId}><MergeType className="icon"/><Link target="_blank" to={`/dataset/${dataset.org}/${dataset.name}`}>{dataset.title}</Link></span>
      )
    });
  }

  const usedDatasetsSection = () => {
    const toolTipText = 'These datasets are used in the query. This list is regenerated whenever the visualization is saved.'
    if (!_.isEmpty(usedDatasets)) {
      return (
        <div className="link-list">
          <div className="title">
            <span>Used Datasets</span>
            <ReactTooltip effect="solid" />
            <InfoOutlined className="info-icon" data-tip={toolTipText} />
          </div>
          <div className="used-datasets-section">
            {createDatasetLinks(usedDatasets)}
          </div>
        </div>
      )
    }
  }

  return (
    <query-form>
      <div className="user-input">
        <div className="sql-section">
          <div className="sql-title">Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.</div>
          {textArea}
        </div>
        <div className="query-info">
          {recommendationSection()}
          {usedDatasetsSection()}
        </div>
      </div>
      <div>
        {submitButton}
        {cancelButton}
        {failureMessage}
        {successMessage}
        {isQueryLoading && <LoadingElement />}
      </div>
    </query-form>
  )
}

QueryForm.propTypes = {
  queryText: PropTypes.string,
  recommendations: PropTypes.array,
  queryFailureMessage: PropTypes.string,
  isQueryDataAvailable: PropTypes.bool,
  isQueryLoading: PropTypes.bool.isRequired,

  executeQuery: PropTypes.func.isRequired,
  cancelQuery: PropTypes.func.isRequired,
  setQueryText: PropTypes.func.isRequired
}

export default QueryForm
