import "./HomePage.css";
import React,{useState, useEffect} from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import SubjectList from "./SubjectList";
import Preloader from "./Preloader";

const HomePage = (props) => {

  const [isEdit, setIsEdit] = useState("");
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [addFormValue, setAddFormValue] = useState("");

  useEffect(() => {
    props.fetchToDos();
  },[])

  const handleInputChange = event => {
    setAddFormValue(event.target.value);
  };

  const handleFormSubmit = event => {
    const { addSubject } = props;
    event.preventDefault();
    addSubject({ title: addFormValue});
    setAddFormValue(() => "");
  };

  const formEditHandler = (subjectId,isEdit,editedValue) =>  { 
    if(isEdit == ""){
    setIsEdit(() => subjectId);
  }else{
    const { updateSubject} = props;
    updateSubject({ title:editedValue }, subjectId);
    setIsEdit(() => "");
  }

  }

  const renderAddForm = () => {
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={handleFormSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">note_add</i>
              <input
                value={addFormValue}
                onChange={handleInputChange}
                id="toDoNext"
                type="text"
              />
              <label htmlFor="toDoNext">Add Subject</label>
            </div>
          </form>
        </div>
      );
    }
  };

  const renderSubjects = () => {
    const { data } = props;
    const toDos = _.map(data, (value, key) => {
      return value.title && <SubjectList key={key} subjectId={key} todo={value} formEditHandler={formEditHandler} isEdit={isEdit}/>;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <img
          alt="Nothing was found"
          id="nothing-was-found"
          src="/img/nothing.png"
        />
        <h4>Please add the subjects</h4>
        <p>Click on the bottom + icon</p>
      </div>
    );
  };

    if (props.data === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }
    return (
      <div className="to-do-list-container">
        <div className="row">
          {renderAddForm()}
          {renderSubjects()}
        </div>
        <div className="fixed-action-btn">
          <button
            onClick={() => setAddFormVisible(!addFormVisible )}
            className="btn-floating btn-large teal darken-4"
          >
            {addFormVisible ? (
              <i className="large material-icons">close</i>
            ) : (
              <i className="large material-icons">add</i>
            )}
          </button>
        </div>
      </div>
    );
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(HomePage);
