import { connect } from 'react-redux'
import VisualizationView from './visualization-view'
import { visualizationLoad, visualizationReset, visualizationSave, visualizationUpdate, visualizationSaveFinish } from '../../store/actions'
import { getFreestyleQueryText } from '../../store/query-selectors'
import { visualizationTitle, visualizationSaving, isVisualizationSaveable, visualizationSaveSuccess, visualizationLoadSuccess, visualizationID, visualizationLoadFailure, visualizationSaveFailure} from '../../store/visualization-selectors'

const mapStateToProps = state => {
    return {
        id: visualizationID(state),
        title: visualizationTitle(state),
        query: getFreestyleQueryText(state),
        isLoadFailure: visualizationLoadFailure(state),
        isSaving: visualizationSaving(state),
        isSaveFailure: visualizationSaveFailure(state),
        isSaveSuccess: visualizationSaveSuccess(state),
        isSaveable: isVisualizationSaveable(state),
        updateQuery: visualizationID(state) !== undefined
    }
}

const mapDispatchToProps = dispatch => ({
    load: (id) => dispatch(visualizationLoad(id)),
    reset: () => dispatch(visualizationReset()),
    save: (title, query) => dispatch(visualizationSave(title, query)),
    update: (id, title, query) => dispatch(visualizationUpdate(id, title, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationView)

