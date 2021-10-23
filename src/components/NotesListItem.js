import React, { Component } from "react";
import { connect } from "react-redux";
import { removeNotes ,addNotes} from "../actions";
import "materialize-css/dist/css/materialize.min.css";

class NotesListItem extends Component {
  state = {
    changeVal:"",
    addNotesValue: ""
  };

  handleCompleteClick = notesId => {
    const { removeNotes,subjectId,topicId } = this.props;
    removeNotes(subjectId, topicId, notesId);
  };

  onChangeHandler = event => {
    console.log(event.target.value);
    this.setState({...this.state, changeVal: event.target.value });
  }

  render() {
    const { subjectId,topicId ,notesId, notes } = this.props;
    const { headingText, subHeading } = styles;
    return (
      <div style={headingText} key="topicName" className="col s10 offset-s1">
        {this.props.isEdit  == notesId? <input type="text" onChange={this.onChangeHandler} value={this.state.changeVal} style={{width:"80%"}}/> : notes.notesData}
        <span 
            disabled={this.props.isEdit != "" && this.props.isEdit !== notesId}
            onClick={() => {this.setState({...this.state,changeVal:notes.notesData});this.props.handleFormEdit(notesId,this.props.isEdit,this.state.changeVal)}}
            className="complete-todo-item waves-light teal lighten-5 teal-text text-darken-4 btn"
        >
          {this.props.isEdit == notesId ? <i className="large material-icons">save</i> : <i className="large material-icons">edit</i>} 
            
        </span>
        <span 
            disabled={this.props.isEdit == notesId }
            onClick={() => this.handleCompleteClick(notesId)}
            className="right-align complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
        >
            <i className="large material-icons">clear</i>
        </span>
      </div>
    );
  }
}

const styles = {
  headingText : {
    padding : "13px",
    border : "1px solid lightgray",
    marginBottom : "1px"
  }
}

export default connect(null, { addNotes,removeNotes })(NotesListItem);
