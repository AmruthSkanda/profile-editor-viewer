import React from 'react';
import TopContainer from './TopContainer.jsx'
import BottomContainer from './BottomContainer.jsx'
import MiddleContainer from './MiddleContainer.jsx'
var that;

class NavBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {pageIndex:1}
	}	

	updateSelected(i){
		that.refs.middleContainer.setState({pageIndex:i});
		this.setState({pageIndex:i});
	}


	render(){	
		var pageLabels = [null,"Yourself?","Your address?", "Education?", "Expirienced?"]
		var highlightClass; 
		var content = this.props.pages.map((i)=>{
				highlightClass = (i === this.state.pageIndex) ? "highlighted" : "";
					return(
						<div className={highlightClass} id={"page"+i} key={i} onClick={()=>this.updateSelected(i)}>{pageLabels[i]}</div>
					);
				});	
		return(
			<div id="navBar"> 
				{content}
         	</div>
        );
    }
}

NavBar.defaultProps = {
	pages:[1,2,3,4],
}

class App extends React.Component {
	constructor(props){
		super(props);		
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
	         default: that.clearChildren(e);
	      }
	   }
	}

	changePage(nextPage){
		if(nextPage){
			that.refs.middleContainer.setState({pageIndex:nextPage});
			that.refs.navBar.setState({pageIndex:nextPage});
		}
		else
			alert("done")
	}

    render() {
    	that=this;
      return (
         <div id="pageContainer">
         	<TopContainer />
         	<div id="middleContainer">
	         	<NavBar ref="navBar" />
	         	<MiddleContainer ref="middleContainer" changePage={that.changePage} clear={that.clearChildren}/>
	        </div>
         	<BottomContainer />
         </div>
      );
    }
}

export default App;