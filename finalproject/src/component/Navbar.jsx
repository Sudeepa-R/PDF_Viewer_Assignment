import React, { Component } from 'react'
import TaskForm  from './TaskForm'
export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbarr navbar-expand-lg bg-body-tertiary navbar- dark bg-dark mb-3">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"><i className="fa-solid fa-arrow-left"></i><strong> Task 38991 AP Team</strong></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li> */}
              
                
            </ul>
           
            
            </div>
        </div>
</nav>
      </div>
     
    )
  }
}
