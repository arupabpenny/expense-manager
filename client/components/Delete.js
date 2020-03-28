//client/components/Delete.js
import React from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Delete extends React.Component {
constructor(){
  super();
  this.state={
      id:'',
      messageFromServer: '',
      modalIsOpen: false,
      month: '',
      year: ''
    };
  this.onClick = this.onClick.bind(this);
  this.delete = this.delete.bind(this);
  this.closeModal = this.closeModal.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.expense._id,
      year: this.props.expense.year
    })
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }
onClick(e){
     this.delete(this);
    }
delete(e){
    axios.get('/delete?id='+e.state.id)
      .then(function(response) {
        e.setState({
            modalIsOpen: true,
            messageFromServer: response.data
          });
    });
}
render(){
  return (
      <div>
        <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>     
            <span className="fas fa-trash"></span>
        </Button>
        <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           contentLabel="Delete Expense"
           className="Modal">
           <div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/', search: '?month=All&year='+this.state.year }} style={{ textDecoration: 'none' }}>
                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
              </Link>
            </div>
          </Modal>
    </div>
  )
 }
}
export default Delete;