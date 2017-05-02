import React from 'react';
export default class MiddleContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={pageIndex:null,educationCount:1,expirienceCount:1}
	}
	onSave(nextPage){
		var inputs = document.getElementById('formBody').getElementsByTagName('input');
		var selects = document.getElementById('formBody').getElementsByTagName('select')
		var allValidInputs = [...inputs,...selects];
		for(var input of allValidInputs){
			if(input.required)
				if(!input.value){
					alert("Please input all mandatory to save")
					return;
				}
		}

		this.props.changePage(nextPage);
	}

	render(){
		
 		var educationFields = (<div> <div> <label>Your Address</label><br/> <input type="text" placeholder="Enter Street1 *" required/> <input type="text" style={{"margin-left": "4em"}} placeholder="Enter Street2"/> </div> <div> <label>City <sup>*</sup></label><br/> <input type="text" placeholder="Enter City" required/><br/> </div> <div> <label>State <sup>*</sup></label><br/> <input type="text" placeholder="Enter State" required/><br/> </div> <div> <label>Pincode <sup>*</sup></label><br/> <input type="text" placeholder="Enter Zip" required/><br/> </div> </div> );
		var expirienceFields =(<div> <div> <label>Company <sup>*</sup></label><br/> <input type="text" placeholder="Enter name of employer"/> </div> <div> <label>No. of years <sup>*</sup></label><br/> <input type="number" max="100" min="0" placeholder="Enter no of years"/><br/> </div> </div> );

		switch (this.state.pageIndex){ 	
			default:
			case 1:{
				return(
					<div id="formBody" >
						<div className="formTitle">Tell me about yourself (*mandatory)</div>
		         		<div>
				         	<label>Your Name</label><br/>
				         	<input type="text" placeholder="Enter first name *" required/>
				         	<input type="text" style={{"margin-left": "4em"}} placeholder="Enter second name"/>
				        </div> 
				        <div>
				        	<label>Father's Name <sup>*</sup></label><br/>
				         	<input type="text" placeholder="Enter father name" required/><br/>
				        </div>
				        <div>
				         	<label>Mother's Name <sup>*</sup></label><br/>
				         	<input type="text" placeholder="Enter mother name" required/><br/>
				        </div>
				        <div>
				         	<label>DOB</label> <sup>*</sup><br/>
				         	<input type="date" placeholder="Enter date of birth" required/><br/>
				        </div>
				        <div className="submitButtons">
					        <input type="reset" value="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Save" onClick={()=>{this.onSave(2)}}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
			case 2:{
				return(
					<div id="formBody" >
						<div className="formTitle">Where do you live? (*mandatory)</div>
		         		<div>
				         	<label>Your Address</label><br/>
				         	<input type="text" placeholder="Enter Street1 *" required/>
				         	<input type="text" style={{"margin-left": "4em"}} placeholder="Enter Street2"/>
				        </div> 				       
				        <div>			
				        	<label>City <sup>*</sup></label><br/>	         	
				         	<input type="text" placeholder="Enter City" required/><br/>
				        </div>
				        <div>
				        	<label>State <sup>*</sup></label><br/>				         	
				         	<input type="text" placeholder="Enter State" required/><br/>
				        </div>
				        <div>			
				        	<label>Pincode <sup>*</sup></label><br/>	         	
				         	<input type="text" placeholder="Enter Zip" required/><br/>
				        </div>
				        <div className="submitButtons">
				        	<input type="submit" value="Previous" onClick={()=>{this.props.changePage(1)}}/>
					        <input type="reset" defaultValue="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Save" onClick={()=>{this.onSave(3)}}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
			case 3:{
				return(
					<div id="formBody" >
						<div className="formTitle">Your Education (*mandatory)</div>
						{educationFields}
				         <div>		         		
				         	<div style={{"font-size":"1.5em","font-weight":"bold"}} onClick={()=>this.setState({educationCount:++this.state.educationCount})}>+</div><br/>
				        </div>
				        <div className="submitButtons">
				        	<input type="submit" value="Previous" onClick={()=>{this.props.changePage(2)}}/>
					        <input type="reset" value="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Save" onClick={()=>{this.onSave(4)}}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
			case 4:{
				return(
					<div id="formBody" >
						<div className="formTitle">Your Expirience (*mandatory)</div>
		         		{expirienceFields}
				        <div>
				         	<div style={{"font-size":"1.5em","font-weight":"bold"}} onClick={()=>this.setState({expirienceCount:++this.state.expirienceCount})}>+</div><br/>
				        </div>
				        
				        <div className="submitButtons">
				        	<input type="submit" value="Previous" onClick={()=>{this.props.changePage(3)}}/>
					        <input type="reset" value="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Submit" onClick={()=>this.onSave(0)}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
		}
	}
}