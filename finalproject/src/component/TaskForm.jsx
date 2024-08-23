import React, { Component } from 'react'
import GLForm from './GLForm'
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class TaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Currency: 'INR',
            Inv_Basic_Amt: '0.00',
            Inv_Tax_Amt: '0.00',
            Total_Inv_Amt: '0.00',
            Advanced_Paid: '0.00',
            TDS_Applicable: 'No',
            Net_Payable_Amt: '0.00',
            payee2: '',
            city: '',
            street: '',
            country: '',
            IFSC_code: '',
            Acc_Number: '',
            Reference: ''
          };

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange = (e) => {
      
        const { name, value, type, checked } = e.target;
        const newValue = type === 'radio' ? value : (type === 'checkbox' ? checked : value);
        this.setState({ [name]: newValue });
      }

      
  handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // postgres 
    try {
      const response = await fetch('http://localhost:5005/addInvoice', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
        
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.log('Response data:', data);
        toast.success('Data submitted successfully!');
        

      } else {
        const text = await response.text();
        console.log('Response text:', text);
        
      }
      // Here you can add any follow-up actions, like redirecting or showing a success message
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('Something went wrong!!...');
    }

    //mongo
    try {
      const response = await fetch('http://localhost:5001/api/addInvoice', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
        
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.log('Response data:', data);
        toast.success('Data submitted successfully!');
      } else {
        const text = await response.text();
        console.log('Response text:', text);
      }
      // Here you can add any follow-up actions, like redirecting or showing a success message
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }


  

  render() {
    return (
    
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
        <div className="d-flex flex-row bd-highlight mb-2 sub-navbar w-100">
                        <button className="p-1 bd-highlight bdrNone me-2 " style={{color:'#461B7E'}}><strong>Invoice Details</strong></button>
                        <button className="p-1 bd-highlight text-black bdrNone" >Action History</button>
        </div>
        <div className="accordion mt-4 " id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button className="accordion-button bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                INVOICE AMOUNT DETAILS
            </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div className="accordion-body">
                    

                 
            <label htmlFor="Currency" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2 '>Currency <span className='red'>*</span> :</span></label>
                        <input type="text" id="Currency" onChange={this.handleChange} name="Currency" value={this.state.Currency} className='borderNone' style={{marginLeft:'25%'}} required /> <br></br>
                        <label htmlFor="Inv_Basic_Amt" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Inv Basic Amt<span className='red'>*</span> :</span></label>
                        <input type="text" id="Inv_Basic_Amt" onChange={this.handleChange} name="Inv_Basic_Amt" value={this.state.Inv_Basic_Amt} className='borderNone ' style={{marginLeft:'21%'}} required/> <br/>
                        <label htmlFor="Inv_Tax_Amt" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Inv Tax Amt<span className='red'>*</span> :</span></label>
                        <input type="text" id="Inv_Tax_Amt" onChange={this.handleChange} name="Inv_Tax_Amt" value={this.state.Inv_Tax_Amt} required className='borderNone' style={{marginLeft:'23%'}} /> <br/>
                        <label htmlFor="Total_Inv_Amt" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Total Inv Amt [Inclu. of tax]<span className='red'>*</span> :</span></label>
                        <input type="text" id="Total_Inv_Amt" onChange={this.handleChange} name="Total_Inv_Amt" value={this.state.Total_Inv_Amt} className='borderNone ' required style={{marginLeft:'7%'}}/> <br/>
                        <label htmlFor="Advanced_Paid" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Advanced Paid<span className='red'>*</span> :</span></label>
                        <input type="text" id="Advanced_Paid" onChange={this.handleChange} name="Advanced_Paid" value={this.state.Advanced_Paid} required style={{marginLeft:'20%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="TDS_Applicable" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>TDS Applicable<span className='red'>*</span> :</span></label>
                        
                        <label style={{marginLeft:'17%'}}>
                        <input
                          type="radio"
                          onChange={this.handleChange}
                          name="TDS_Applicable"
                          value="Yes"
                          className='m-2'
                          checked={this.state.TDS_Applicable === 'Yes'}
                        />
                        Yes
                        <input
                          type="radio"
                          onChange={this.handleChange}
                          name="TDS_Applicable"
                          value="No"
                          className='m-2'
                          checked={this.state.TDS_Applicable === 'No'}
                        />
                        No
                        </label> <br/>

                        <label htmlFor="Net_Payable_Amt" className='mb-3'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Net Payable Amt [Exclu. of TDS]<span className='red'>*</span> :</span></label>
                        <input type="text" id="Net_Payable_Amt" onChange={this.handleChange} name="Net_Payable_Amt" value={this.state.Net_Payable_Amt} className='borderNone mss' required style={{marginLeft:'2%'}}/> <br/>
                    

                     
                   

            </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                ALTERNATE PAYEE DETAILS
            </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
            <div className="accordion-body">
                
                
          
                       
                        <label htmlFor="payee1" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Alternate Payee 1 :</span></label>
                        <input type="text" id="payee1" name="payee1" onChange={this.handleChange} value={this.state.payee1} style={{marginLeft:'20%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="payee2" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Alternate Payee 2 :</span></label>
                        <input type="text" id="payee2" name="payee2" onChange={this.handleChange} value={this.state.payee2} style={{marginLeft:'20%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="city" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>City :</span></label>
                        <input type="text" id="city" name="city" onChange={this.handleChange} value={this.state.city} style={{marginLeft:'35%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="street" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Street :</span></label>
                        <input type="text" id="street" name="street" onChange={this.handleChange} value={this.state.street} style={{marginLeft:'33%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="country" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Country :</span></label>
                        <input type="text" id="country" name="country" onChange={this.handleChange} value={this.state.country} style={{marginLeft:'31%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="IFSC_code" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Bank Key / IFSC Code :</span></label>
                        <input type="text" id="IFSC_code" name="IFSC_code" onChange={this.handleChange} value={this.state.IFSC_code} style={{marginLeft:'16%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="Acc_Number" className='mb-2'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Bank Acc No :</span></label>
                        <input type="text" id="Acc_Number" name="Acc_Number" onChange={this.handleChange} value={this.state.Acc_Number} style={{marginLeft:'25%'}} className='w-50 ps-2'/> <br/>
                        <label htmlFor="Reference" className='mb-3'><i className="fa-regular fa-clock textsize"></i><span className='p-2'>Reference :</span></label>
                        <input type="text" id="Reference" name="Reference" onChange={this.handleChange} value={this.state.Reference} style={{marginLeft:'28%'}} className='w-50 ps-2'/> <br/>
                 



            </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                LINE ITEM DETAILS
            </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
            <div className="accordion-body ">
                <button
                    className="GlFormPageButton mx-2 circle"
                    >
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                    </button>
                {/* <span className='me-2'>
                    <div className='circle p-1 ps-2 pe-2 '><i className="fa-solid fa-up-right-and-down-left-from-center"></i></div>
                </span> */}
                <button
                    className="GlFormPageButton mx-2 wcircle "
                    >
                   <i className="fa-solid fa-rotate"></i>   
                    </button>
                {/* <span className='p-5'>
                    <div className='wcircle p-1 ps-2 pe-2'><i className="fa-solid fa-rotate"></i></div>
                </span> */}
               {/* <div className='lastbox mt-3 p-2 d-flex'>
             
                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault"/>
                    <div className='inline lft ms-4'></div> */}
                    {/* <input type="number" className='lft p-2' name="quantity" min="1" max="10" /> */}
                    {/* <div className='inline lft ms-2'><strong className='me-2'>Select Debit</strong></div>
                    <div className='inline lft ms-3 pe-5'><strong className='me-2'>GL Desc</strong></div>
                    <div className='inline lft ms-5'><strong className='me-2'>GL Code</strong></div>
                    <div className='inline lft ms-3 flex-shrink-1 w-25 '><strong className='me-2'>Text (Do not enter special character)</strong></div>
                    
               </div> */}
              <GLForm/>
            </div>
        </div>
        </div>
</div>
<button className="btn navbar-brand bdr   btn-light toprht toprht2 " type="button"><i className="fa-solid fa-repeat"></i></button>
<button className="btn navbar-brand bdr  btn-light toprht1" type="submit">Save to draft</button>
</form>
<ToastContainer />
<Footer 
  Currency={this.state.Currency} 
  Inv_Basic_Amt={this.state.Inv_Basic_Amt}
  Inv_Tax_Amt={this.state.Inv_Tax_Amt}
  Net_Payable_Amt={this.state.Net_Payable_Amt}

/>
      </div>
    )
  }
}