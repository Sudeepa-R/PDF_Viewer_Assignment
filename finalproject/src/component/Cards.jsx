import React, { Component } from 'react'
import TaskForm from './TaskForm'
import Filepdf from './Filepdf'

export default class Cards extends Component {
  render() {
    return (
      <div className='d-flex flex-row bd-highlight mb-3 '>
            <div className="row  w-50  vh-100  " style={{margin:'58px 2px'}}>
              <Filepdf />
            </div>
            <div className="row  w-50  vh-100" style={{margin:'58px 2px'}}>
              <TaskForm/>
            </div>
                 
      </div>
    )
  }
}
