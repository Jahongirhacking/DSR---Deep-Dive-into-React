import React from 'react'
import PropTypes from 'prop-types'

class Square extends React.Component {
  render() {
    return <button onClick={this.props.handleClick}>{this.props.value}</button>
  }
}

Square.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.number,
}

export default Square
