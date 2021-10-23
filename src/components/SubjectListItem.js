import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTopic ,addNotes,updateNotes} from "../actions";
import _ from "lodash";
import Collapsible from "./Collapsible";
import NotesListItem from "./NotesListItem";

class SubjectListItem extends Component {
  state = {
    isEdit:"",
    addNotesValue: ""
  };

  handleCompleteClick = topicId => {
    const { removeTopic,subjectId } = this.props;
    removeTopic(subjectId, topicId);
  };


  handleInputChange = event => {
    this.setState({ addNotesValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addNotesValue } = this.state;
    const { addNotes, subjectId} = this.props;
    addNotes({ notesData:addNotesValue },subjectId,event);
    this.setState({ addNotesValue: "" });
  };

  handleFormEdit = (notesId,isEdit,editedValue) =>{
    if(isEdit == ""){
    this.setState((prevState) => {
      return {
        ...prevState,
        isEdit:notesId
      }
    })
  }else{
    const { updateNotes, topicId,subjectId} = this.props;
    updateNotes({ notesData:editedValue }, subjectId,topicId,notesId);
    this.setState((prevState) => {
      return {
        ...prevState,
        isEdit:""
      }
    })
  }

  }

  renderNotesListItem() {
    const { topicId,subjectId,topics } = this.props;
    const notes = _.map(topics, (value, key) => {
      return value.notesData && <NotesListItem handleFormEdit={this.handleFormEdit} isEdit={this.state.isEdit} key={key} notesId={key} subjectId={subjectId} topicId={topicId} notes={value} />;
    });
    if (!_.isEmpty(notes)) {
      return notes;
    }
  }

  render() {
    const { topicId, topics } = this.props;
    return (
      <div key="topicName" className="col s10 offset-s1">
          <Collapsible title={topics.topicsData}  handleFormEdit={this.props.formEditHandler}  isEdit={this.props.isEdit} cid={topicId} handleCompleteClick={this.handleCompleteClick}>

            
          <div className="row">
            {this.renderNotesListItem()}
        </div>
        <div className="input-field">
        <input
            value={this.state.addNotesValue}
            onChange={this.handleInputChange}
            id="notesId"
            type="text"
        />
        <label htmlFor="notesId">Add Notes for {topics.topicsData}</label>
        <span 
            onClick={() => this.handleFormSubmit(topicId)}
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

export default connect(null, { addNotes,removeTopic,updateNotes })(SubjectListItem);
