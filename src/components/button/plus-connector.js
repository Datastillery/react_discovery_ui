import Button from './button'
import { addToCount } from '../../store/actions'

import { connect } from 'react-redux'

const mapStateToProps = () => ({
  symbol: '➕'
})

const mapDispatchToProps = dispatch => ({
  action: () => dispatch(addToCount(1))
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
