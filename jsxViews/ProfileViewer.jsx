import React from 'react';
import TopContainer from './TopContainer.jsx'
import BottomContainer from './BottomContainer.jsx'
import MiddleContainer from './MiddleContainer.jsx'
import NavBar from './NavBar.jsx'
import store from '../src/utils/store'

export default class ProfileViewer extends React.Component {
	constructor(props){
		super(props);		
	}

	changePage(nextPage){
		if(nextPage){
			this.refs.middleContainer.setState({pageIndex:nextPage});
			this.refs.navBar.setState({pageIndex:nextPage});
		}
		
			//alert("Done")
	}


    render() {
    	var profileData = store.getUserProfileData();
      return (
         <div className="pageContainer">
         	<TopContainer currentView="/profile"/>
         	<div id="middleContainer">
	         	<NavBar ref="navBar" pageIndex={this.props.pageIndex} changePage={this.changePage.bind(this)} />
	         	<MiddleContainer ref="middleContainer" pageIndex={this.props.pageIndex} changePage={this.changePage.bind(this)} readOnly={true} profileData={profileData}/>
	        </div>
         	<BottomContainer />
         </div>
      );
    }
}

ProfileViewer.defaultProps = {
	pageIndex:1
}