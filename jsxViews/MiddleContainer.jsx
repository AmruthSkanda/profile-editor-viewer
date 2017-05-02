import React from 'react';
export default class MiddleContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={pageIndex:null}
	}

	render(){
		switch (this.state.pageIndex){ 	
			default:
			case 1:{
				return(
					<div id="formBody" >
		         		<div>
				         	<label>Your Name</label><br/>
				         	<input type="text" placeholder="Enter first name"/>
				         	<input type="text" style={{"margin-left": "4em"}} placeholder="Enter second name"/>
				        </div> 
				        <div>
				        	<label>Father's Name</label><br/>
				         	<input type="text" placeholder="Enter father name"/><br/>
				        </div>
				        <div>
				         	<label>Mother's Name</label><br/>
				         	<input type="text" placeholder="Enter mother name"/><br/>
				        </div>
				        <div>
				         	<label>DOB</label><br/>
				         	<input type="date" placeholder="Enter date of birth"/><br/>
				        </div>
				        <div className="submitButtons">
					        <input type="reset" value="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Next" onClick={()=>{this.props.changePage(2)}}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
			case 2:{
				return(
					<div id="formBody" >
		         		<div>
				         	<label>Your Name</label><br/>
				         	<input type="text" placeholder="Enter first name"/>
				         	<input type="text" style={{"margin-left": "4em"}} placeholder="Enter second name"/>
				        </div> 
				       
				        <div>
				         	<label>Mother's Name</label><br/>
				         	<input type="text" placeholder="Enter mother name"/><br/>
				        </div>
				        <div>
				         	<label>DOB</label><br/>
				         	<input type="date" placeholder="Enter date of birth"/><br/>
				        </div>
				        <div className="submitButtons">
				        	<input type="submit" value="Previous" onClick={()=>{this.props.changePage(1)}}/>
					        <input type="reset" defaultValue="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Next" onClick={()=>{this.props.changePage(3)}}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
			case 3:{
				return(
					<div id="formBody" >
		         		<div>
				         	<label>Your Name</label><br/>
				         	<input type="text" placeholder="Enter first name"/>
				         	<input type="text" style={{"margin-left": "4em"}} placeholder="Enter second name"/>
				        </div> 
				        <div>
				        	<label>Father's Name</label><br/>
				         	<input type="text" placeholder="Enter father name"/><br/>
				        </div>
				        
				        <div>
				         	<label>DOB</label><br/>
				         	<input type="date" placeholder="Enter date of birth"/><br/>
				        </div>
				        <div className="submitButtons">
				        	<input type="submit" value="Previous" onClick={()=>{this.props.changePage(2)}}/>
					        <input type="reset" value="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Next" onClick={()=>{this.props.changePage(4)}}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
			case 4:{
				return(
					<div id="formBody" >
		         		<div>
				         	<label>Your Name</label><br/>
				         	<input type="text" placeholder="Enter first name"/>
				         	<input type="text" style={{"margin-left": "4em"}} placeholder="Enter second name"/>
				        </div> 
				        <div>
				        	<label>Father's Name</label><br/>
				         	<input type="text" placeholder="Enter father name"/><br/>
				        </div>
				        <div>
				         	<label>Mother's Name</label><br/>
				         	<input type="text" placeholder="Enter mother name"/><br/>
				        </div>
				        
				        <div className="submitButtons">
				        	<input type="submit" value="Previous" onClick={()=>{this.props.changePage(3)}}/>
					        <input type="reset" value="Clear" onClick={()=>{this.props.clear(document.getElementById("formBody"))}}/>
					        <input type="submit" value="Submit" onClick={()=>this.props.changePage(0)}/>
				        </div>
		         	</div>
	         	);
	         	break;
			}
		}
	}
}