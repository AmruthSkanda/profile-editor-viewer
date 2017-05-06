import React from 'react';
import actions from '../src/utils/actions'

class TopContainer extends React.Component {
	constructor(props){
		super(props);
    this.state={view:this.props.currentView}
	}

  _onClick(nextView){
    actions.changeUrl({
      href: nextView,
    })
    this.setState({view:nextView})
  }

    render() {
      let nextView,buttonText,titleTxt;
      if(this.state.view === "/editor/"){
        nextView = "/profile/";
        buttonText = "Goto Profile Viewer";
        titleTxt = "Profile Editor";  
      }
      else{
        nextView = "/editor/";
        buttonText = "Goto Profile Editor";
        titleTxt = "Profile Viewer";
      }
      return (
         <div id="topContainer">
          <div className="profileViewerButton" onClick={()=>{this._onClick(nextView)}}>{buttonText}</div>
         	<div className="title">{titleTxt}</div>
         </div>
      );
    }
}

export default TopContainer;