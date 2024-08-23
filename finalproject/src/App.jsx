import React, { Component } from 'react'
import Navbar from './component/Navbar'
import Cards from './component/Cards'
import Footer from './component/Footer'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Cards/>
       {/* <Footer /> */}
      </div>
    )
  }
}
