import { todosRef } from "../config/firebase";
import { FETCH_TODOS } from "./types";

export const addSubject = (newToDo) => async dispatch => {
  todosRef
    .push()
    .set(newToDo);
};

export const addTopics = (newToDo, completeToDoId) => async dispatch => {
  todosRef
    .child(completeToDoId)
    .push()
    .set(newToDo);
};

export const addNotes = (newToDo, subjectId, topicId) => async dispatch => {
  todosRef
    .child(subjectId)
    .child(topicId)
    .push()
    .set(newToDo);
};

export const updateNotes = (newToDo, subjectId, topicId,notesId) => async dispatch => {
  todosRef
    .child(subjectId)
    .child(topicId)
    .child(notesId)
    .update(newToDo);
};

export const updateTopic = (newToDo, subjectId, topicId) => async dispatch => {
  todosRef
    .child(subjectId)
    .child(topicId)
    .update(newToDo);
};

export const updateSubject = (newToDo, subjectId) => async dispatch => {
  todosRef
    .child(subjectId)
    .update(newToDo);
};

export const removeTopic = (subjectId, topicId) => async dispatch => {
  todosRef
    .child(subjectId)
    .child(topicId)
    .remove();
};

export const removeNotes = (subjectId, topicId,notesId) => async dispatch => {
  todosRef
    .child(subjectId)
    .child(topicId)
    .child(notesId)
    .remove();
};


export const removeSelected = (completeToDoId) => async dispatch => {
  todosRef
    .child(completeToDoId)
    .remove();
};


export const fetchToDos = ()  => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};
