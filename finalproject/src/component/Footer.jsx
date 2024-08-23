import React, { Component } from 'react'

export default class Footer extends Component {
  
  render() {
    const {Currency,
      Inv_Basic_Amt,
      Inv_Tax_Amt,
      Net_Payable_Amt} = this.props
    return (
      <div className='container'>
        <div className="footer p-1 ">
            <span className=" p-2 me-1 bd-highlight footerbox ">Currency : <span className='text-success'>{Currency}</span></span>
            <span className="p-2 bd-highlight footerbox me-1 mt-1">Inv Basic Amt : <span className='text-success'>{Inv_Basic_Amt}</span></span>
            <span className="p-2 bd-highlight footerbox me-1 mt-1">Basic Tax Amt : <span className='text-success'>{Inv_Tax_Amt}</span></span>
            <span className="p-2 bd-highlight footerbox me-1 mt-1">Total Inv Amt : <span className='text-success'>{parseFloat(Inv_Basic_Amt) + parseFloat(Inv_Tax_Amt)}</span></span>
            <span className="p-2 bd-highlight footerbox me-1 mt-1">TDS Amt : <span className='text-success'>15.00</span></span>
            <span className="p-2 bd-highlight footerbox me-1 mt-1">Net Payable Amt : <span className='text-success'>{Net_Payable_Amt}</span></span>
            <span className="p-2 bd-highlight footerbox me-1 mt-1">Basic Amt Diff : <span className='text-danger'>NA</span></span>

            <form className='inline mrg me-2 footer_buttons '>
            <select id="dropdown" name="dropdown " className='p-1 me-1'>
                <option value="option1">Select Action</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
            </select>
            <input type="submit" className='redclr ms-2 me-2' value="Reject"></input>
            <input type="submit" value="Approve" className='clr me-0'></input>
        </form>
            {/* <div className='inline '><button type="button me-3" className="redclr btn">Reject</button></div>
            <div className='inline'> <button type="button me-1" className="clr btn">Approve</button></div> */}
           
        

        </div>

      </div>
    )
  }
}