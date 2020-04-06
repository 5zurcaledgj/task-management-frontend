import React, { Component } from 'react'
import { connect } from 'react-redux'

const HomePage = () => {
  return (
    <div>
      Hello. I am in the HomePage
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
