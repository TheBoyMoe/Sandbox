import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  
  onSubmitHandler = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onClickHandler = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }

  render(){
    return (
      <div>
        <ExpenseForm
          expense={ this.props.expense }
          onSubmit={ this.onSubmitHandler }
        />
        <button onClick={ this.onClickHandler }>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    editExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    removeExpense: (obj) => dispatch(startRemoveExpense(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
