import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addDataAPI, deleteDataAPI, getDataAPI, updateDataAPI } from "../../../config/redux/action";
import './Dashboard.scss'

class Dashboard extends Component {
  state = {
    title: '',
    content: '',
    date: '',
    textButton: 'SIMPAN',
    noteId: ''
  }

  // unutk cek console local storage
  // componentDidMount(){
  //   const userData = localStorage.getItem('userData')
  //   console.log('dashboard: ', JSON.parse(userData))
  // }

  componentDidMount(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.props.getNotes(userData.uid)
  }
  
  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem('userData'))
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    }
    if(textButton === 'SIMPAN') {
      saveNotes(data);
    } else {
      data.noteId = noteId
      updateNotes(data)
    }
    console.log(data)
  }

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }

  updateNotes = (note) => {
    console.log('update', note)
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: 'UPDATE',
      noteId: note.id
    })
  }
  
  cancelUpdate = () => {
    this.setState({
      title: '',
      content: '',
      textButton: 'SIMPAN'
    })
  }

  deleteNote = (e, note) => {
    // alert("hai")
    e.stopPropagation()
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { deleteNotes } = this.props
    const data = {
      userId: userData.uid,
      noteId: note.id,
    }
    deleteNotes(data)
  }
  
    render() {
      const { title, content, textButton } = this.state;
      const { notes } = this.props;
      const { updateNotes, cancelUpdate, deleteNote } = this;
      // console.log(notes)
        return (
            <div className="container">
                <div className="input-form">
                <p className="judul">Dashboard Pages</p>
                <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')} >
                </textarea>
                <div className="wraper-btn">
                  {
                    textButton === 'UPDATE' ? (
                      <button className="cancel-btn" onClick={this.handleSaveNotes} onClick={cancelUpdate}>cancel</button>
                      ) : <div />
                    }
                      <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                </div>
                </div>
                <hr />
                {
                  notes.length > 0 ? (
                    <Fragment>
                      {
                        notes.map(note => {
                          return (
                            <div className="card-container" key={note.id} onClick={() => updateNotes(note)} >
                              <p className="title">{note.data.title}</p>
                              <p className="date">{note.data.date}</p>
                              <p className="content">{note.data.content}</p>
                              <button className="delete-btn" onClick={(e) => deleteNote(e, note)}>x</button>
                            </div>
                          )
                        })
                      }
                    </Fragment>
                  ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => {
  return {
    userId: state.user,
    notes: state.notes
  }
}

const reduxDispatch = (dispatch) => {
  return {
    saveNotes: (data) => dispatch(addDataAPI(data)),
    getNotes: (data) => dispatch(getDataAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data)),
  }
}

export default connect(reduxState, reduxDispatch)(Dashboard);