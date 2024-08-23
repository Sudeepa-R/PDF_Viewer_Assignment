import React, { Component } from 'react';
import './GlForm.css';

class GLForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          id: 1,
          selected: false,
          debit: 'Debit',
          glDesc: 'Original cost-Plant & ...',
          glCode: '0020200000',
          text: '',
        },
      ],
      currentPage: 1,
      itemsPerPage: 200,
    };
  }

  handleInputChange = (e, id, field) => {
    const { rows } = this.state;
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, [field]: e.target.value } : row
    );
    this.setState({ rows: updatedRows });
  };

  handleCheckboxChange = (e, id) => {
    const { rows } = this.state;
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, selected: e.target.checked } : row
    );
    this.setState({ rows: updatedRows });
  };

  addRow = () => {
    const { rows } = this.state;
    const newRow = {
      id: rows.length + 1,
      selected: false,
      debit: 'Debit',
      glDesc: '',
      glCode: '',
      text: '',
    };
    this.setState({ rows: [...rows, newRow] });
  };

  deleteRow = id => {
    const { rows } = this.state;
    this.setState({ rows: rows.filter(row => row.id !== id) });
  };

  handlePageChange = (direction) => {
    const { currentPage } = this.state;
    this.setState({
      currentPage: direction === 'next' ? currentPage + 1 : currentPage - 1,
    });
  };

  setItemsPerPage = (value) => {
    this.setState({ itemsPerPage: value });
  };

  render() {
    const { rows, currentPage, itemsPerPage } = this.state;

    return (
      <div className="GlFormApp mt-3">
        <div className="GlFormContainer">
          <table className="GlFormTable">
            <thead>
              <tr >
                <th className="GlFormTh GlFormm "> <input
                      type="checkbox"
                      className="GlFormCheckbox GlFormm"
                      checked
                    /></th>
                <th className="GlFormTh  lft"></th>
                <th className="GlFormTh lft   ">Select Debit</th>
                <th className="GlFormTh lft">GL Desc</th>
                <th className="GlFormTh lft">GL Code</th>
                <th className="GlFormTh lft">Text (Do not enter special characters)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td className="GlFormTd">
                    <input
                      type="checkbox"
                      className="GlFormCheckbox bgr"
                      
                      checked
                      onChange={(e) => this.handleCheckboxChange(e, row.id)}
                    />
                  </td>
                  <td className="GlFormTd">
                    <button
                      className="GlFormDeleteButton"
                      onClick={() => this.deleteRow(row.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td className="GlFormTd">
                    <select
                      className="GlFormSelect"
                      value={row.debit}
                      onChange={(e) => this.handleInputChange(e, row.id, 'debit')}
                    >
                      <option value="Debit">Debit</option>
                      {/* Add more options as needed */}
                    </select>
                  </td>
                  <td className="GlFormTd">
                    <input
                      type="text"
                      className="GlFormInput "
                      value={row.glDesc}
                      onChange={(e) => this.handleInputChange(e, row.id, 'glDesc')}
                    />
                  </td>
                  <td className="GlFormTd">
                    <input
                      type="text"
                      className="GlFormInput"
                      value={row.glCode}
                      onChange={(e) => this.handleInputChange(e, row.id, 'glCode')}
                    />
                  </td>
                  <td className="GlFormTd">
                    <input
                      type="text"
                      className="GlFormInput"
                      value={row.text}
                      onChange={(e) => this.handleInputChange(e, row.id, 'text')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {/* <div className="d-flex flex-row-reverse bd-highlight">
                <div className="p-2 bd-highlight">
                <form className='inline  me-2 '>
            <select id="dropdown" name="dropdown " className='p-1 me-1'>
                <option value="option1">200 / page</option>
                <option value="option2">300 / page</option>
            </select>
        </form>
                </div>
               <div className="p-2 bd-highlight "> <button
                    className="GlFormPageButton"
                    onClick={() => this.handlePageChange('prev')}
                    disabled={currentPage === 1}
                    ></button></div> */}
                {/* <div className="p-2 bd-highlight"><i className="fa-solid fa-angle-left"></i></div>
                <div className="p-2 bd-highlight"><i className="fa-solid fa-angle-left"></i></div> */}
            {/* </div> */}
                <div className=" d-flex flex-row-reverse bd-highlight mt-2 ">

                <select id="dropdown" name="dropdown " className='p-1 mx-2'>
                        <option value="option1">200 / page</option>
                        <option value="option2">300 / page</option>
                    </select>
                    <button
                    className="GlFormPageButton mx-2 "
                    onClick={() => this.handlePageChange('next')}
                    >
                    ❯
                    </button>
                   
                    <span className="GlFormPageNumber mx-2">{currentPage}</span>
                    <button
                    className="GlFormPageButton mx-2"
                    onClick={() => this.handlePageChange('prev')}
                    disabled={currentPage === 1}
                    >
                    ❮ 
                    </button>
                    
                </div>
                <div className="GlFormActionButtons ">
                    <button className="GlFormCalculateButton bgr">Calculate</button>
                    <button className="GlFormAddButton bgr" onClick={this.addRow}>
                    Add
                    </button>
                </div>
        </div>
      </div>
    );
  }
}

export default GLForm;
