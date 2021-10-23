import React, { Component } from "react";
import { connect } from "react-redux";
import { removeSelected, updateTopic,addTopics} from "../actions";
import Collapsible from "./Collapsible";
import _ from "lodash";
import SubjectListItem from "./SubjectListItem";

class SubjectList extends Component {
  state = {
    isEdit:"",
    addFormVisible: false,
    addTopicsValue: ""
  };

  handleCompleteClick = completeToDoId => {
    const { removeSelected } = this.props;
    removeSelected(completeToDoId);
  };


  handleInputChange = event => {
    this.setState({ addTopicsValue: event.target.value });
  };

  handleFormSubmit = topicId => {
    const { addTopicsValue } = this.state;
    const { addTopics } = this.props;
    addTopics({ topicsData:addTopicsValue },topicId);
    this.setState({ addTopicsValue: "" });
  };


  formEditHandler = (topicId,isEdit,editedValue) =>  { 
    if(isEdit == ""){
    this.setState((prevState) => {
      return {
        ...prevState,
        isEdit:topicId
      }
    })
  }else{
    const { updateTopic, subjectId} = this.props;
    updateTopic({ topicsData:editedValue },subjectId,topicId);
    this.setState((prevState) => {
      return {
        ...prevState,
        isEdit:""
      }
    })
  }

  }

  renderSubjectListItem() {
    const { todo,subjectId } = this.props;
    const subjects = _.map(todo, (value, key) => {
      return value.topicsData && <SubjectListItem formEditHandler={this.formEditHandler} isEdit={this.state.isEdit} key={key} subjectId={subjectId} topicId={key} topics={value} />;
    });
    if (!_.isEmpty(subjects)) {
      return subjects;
    }
  }

  render() {
    const { subjectId, todo } = this.props;
    return (
      <div key="toDoName" className="col s10 offset-s1">
        <Collapsible title={todo.title} cid={subjectId} handleCompleteClick={this.handleCompleteClick}  handleFormEdit={this.props.formEditHandler}  isEdit={this.props.isEdit}> 
          
          
        <div className="row">
            {this.renderSubjectListItem()}
        </div>
        <div className="input-field">
        <input
            value={this.state.addTopicsValue}
            onChange={this.handleInputChange}
            id="toDdoNext"
            type="text"
        />
        <label htmlFor="toDdoNext">Add Topics for {todo.title}</label>
        <span 
            onClick={() => this.handleFormSubmit(subjectId)}
            className="btn"
        >
            <i className="large material-icons">done</i>
        </span>
        </div>

          </Collapsible>
      </div>
    );
  }
}

export default connect(null, { addTopics,removeSelected,updateTopic })(SubjectList);
