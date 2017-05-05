import React from 'react';
import TopContainer from './TopContainer.jsx'
import BottomContainer from './BottomContainer.jsx'
import MiddleContainer from './MiddleContainer.jsx'
import NavBar from './NavBar.jsx'

export default class ProfileEditor extends React.Component {
	constructor(props){
		super(props);		
	}

	componentDidMount(){
		if(this.props.pageIndex){
			this.changePage(Number(this.props.pageIndex))
			this.refs.topContainer.setState({view:"/editor/"})
		}
	}

	clearChildren(element) {
	   for (var i = 0; i < element.childNodes.length; i++) {
	      var e = element.childNodes[i];
	      if (e.tagName) switch (e.tagName.toLowerCase()) {
	         case 'input':
	            switch (e.type) {
	               case "radio":
	               case "checkbox": e.checked = false; break;
	               case "button":
	               case "reset":
	               case "submit":
	               case "image": break;
	               default: e.value = ''; break;
	            }
	            break;
	         case 'select': e.selectedIndex = 0; break;
	         case 'textarea': e.innerHTML = ''; break;
	         default: this.clearChildren(e);
	      }
	   }
	}

	changePage(nextPage){
		if(nextPage){
			this.refs.middleContainer.setState({pageIndex:nextPage});
			this.refs.navBar.setState({pageIndex:nextPage});
		}
		else
			alert("Done")
	}


    render() {
      return (
         <div className="pageContainer">
         	<TopContainer ref="topContainer" currentView="/editor/"/>
         	<div id="middleContainer">
	         	<NavBar ref="navBar" pageIndex={1} changePage={this.changePage.bind(this)}/>
	         	<MiddleContainer ref="middleContainer" pageIndex={1} changePage={this.changePage.bind(this)} clear={this.clearChildren}/>
	        </div>
         	<BottomContainer />
         </div>
      );
    }
}

ProfileEditor.defaultProps = {
	pageIndex:1
}