import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    notification: state.notification
  })
}

// link state to mapStateToProps and map this to AnecdoteForm props
export default connect(
  mapStateToProps
)(Notification)