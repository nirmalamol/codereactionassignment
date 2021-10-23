import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
let collapse;

class Collapsible extends Component {
  state = {
    changeVal:"",
  };

  componentDidMount() {
    const options1 = {
      onOpenStart: () => {
        console.log("onOpenStart");
      },
      onOpenEnd: () => {
        console.log("onOpenEnd");
      },
      onCloseStart: () => {
        console.log("onCloseStart");
      },
      onCloseEnd: () => {
        console.log("onCloseEnd");
      },
      inDuration: 300,
      outDuration: 200
    };
    const options3 = {
      accordion: false
    };
   collapse = M.Collapsible.init(this.Collapsible1, options1);
  }


  onChangeHandler = event => {
    this.setState({...this.state, changeVal: event.target.value });
  }

  render() {
    const { headingText, subHeading } = styles;
    return (
        <div>
          <ul
            ref={Collapsible => {
              this.Collapsible1 = Collapsible;
            }}
            className="collapsible popout"
          >
            <li> 
              <div style={headingText} className="collapsible-header">
                <i className="material-icons">expand_more</i>          
                {this.props.isEdit  == this.props.cid? <input type="text" value={this.state.changeVal} onChange={this.onChangeHandler} style={{width:"70%"}}/> : this.props.title}
                <span 
                    onClick={() => this.props.handleCompleteClick(this.props.cid)}
                    className="right-align complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
                >
                    <i className="large material-icons">clear</i>
                </span>
              </div>
              <span style={{position:"relative",top:"-45px",left:"-123px"}}
                    onClick={e => {
                      this.setState({...this.state,changeVal:this.props.title});
                      this.props.handleFormEdit(this.props.cid,this.props.isEdit,this.state.changeVal)
                    }}
                    className="complete-todo-item waves-light teal lighten-5 teal-text text-darken-4 btn"
                >
                  {this.props.isEdit == this.props.cid ? <i className="large material-icons">save</i> : <i className="large material-icons">edit</i>} 
                </span>

              <div className="collapsible-body" style={{display:"none"}}>
                {this.props.children}
              </div>
            </li>
          </ul>
        </div>
    );
  }
}

const styles = {
  headingText: {
    color: "black",
    display:"block"
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 300
  }
};

export default Collapsible;
