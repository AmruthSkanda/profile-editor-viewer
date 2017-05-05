import React from 'react';
export default class NavBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {pageIndex:this.props.pageIndex}
	}	

	render(){	
		var pageLabels = [null,"Yourself?","Your adress?", "Education?", "Expirienced?"]
		var highlightClass; 
		var content = this.props.pages.map((i)=>{
				highlightClass = (i === this.state.pageIndex) ? "highlighted" : "";
					return(
						<div className={highlightClass} id={"page"+i} key={i} onClick={()=>this.props.changePage(i)}>{pageLabels[i]}</div>
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