import React, { Component } from 'react'
import { connect } from 'react-redux'

const ProfilePage = () => {
  return (
    <div>
      Hello. I am in Profile Page
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
