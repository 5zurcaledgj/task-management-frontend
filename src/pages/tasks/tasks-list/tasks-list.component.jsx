import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchTasksStartAsync } from '../../../redux/tasks/tasks.actions'

const TasksListPage = ({ fetchData }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <div>
      Hello. I am in the tasks lists page
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchTasksStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksListPage)
