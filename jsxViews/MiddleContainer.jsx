import React from 'react';
var that;

const EducationFields = () => {
	return(
		<div> 
			<div> 
				<label>Type of Exam <sup>*</sup></label><br/> 
				<select required>
					<option value="">Select an Exam</option>
					<option value="Exam1">Exam 1</option>
					<option value="Exam2">SeExam 2</option>
				</select> 
			</div> 
			<div> 
				<label>Board of education <sup>*</sup></label><br/> 
				<input type="text" placeholder="Enter education board" required/><br/> 
			</div> 
			<div> 
				<label>Percentage % <sup>*</sup></label><br/> 
				<input type="number" min="0" max="100" placeholder="Enter %" required/><br/> 
			</div> 
			<div> 
				+
			</div> 
		</div> 
	);

}

const ExpirienceFields = () => {
	return (
		<div> 
			<div> 
	 			<label>Company <sup>*</sup></label><br/> 
	 			<input type="text" placeholder="Enter name of employer"/> 
	 		</div> 
	 		<div> 
	 			<label>No. of years <sup>*</sup></label><br/> 
	 			<input type="number" max="100" min="0" placeholder="Enter no of years"/><br/> 
	 		</div> 
	 		<div> 
				+
			</div>
 		</div> 
	);
}

const SubmitFields = (props) =>{
	if(props.backButton)
		return (
			<div className="submitButtons">
	        	<input type="submit" value="Previous" onClick={()=>{props.changePage(props.prevPageIndex)}}/>
		        <input type="reset" value="Clear" onClick={()=>{props.clear(document.getElementById("formBody"))}}/>
		        <input type="submit" value="Save" onClick={()=>{props.save(props.nextPageIndex)}}/>
	        </div>
		)
	return(
		 <div className="submitButtons">
	        <input type="reset" value="Clear" onClick={()=>{props.clear(document.getElementById("formBody"))}}/>
	        <input type="submit" value="Save" onClick={()=>{props.save(props.nextPageIndex)}}/>
        </div>
	);
}
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

		that.props.changePage(nextPage);
	}

	render(){
		that = this;
		var educationView =[],expirienceView=[];
		for(var i=1;i<=this.state.educationCount;i++)
			educationView.push(<EducationFields />)
		for(var i=0;i<this.state.expirienceCount;i++)
			expirienceView.push(<ExpirienceFields />)
		switch (this.state.pageIndex){ 	
			default:
			case 1:{
				return(
					<div id="formBody" >
						<div className="formTitle">Tell me about yourself (*mandatory)</div>
		         		<div>
				         	<label>Your Name</label><br/>
				         	<input type="text" placeholder="Enter first name *" required/>
				         	<input type="text" style={{"marginLeft": "4em"}} placeholder="Enter second name"/>
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
				        <SubmitFields backButton={false} nextPageIndex={2} save={this.onSave} clear={this.props.clear}/>	        
				       
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
				        <SubmitFields backButton={true} prevPageIndex={1} nextPageIndex={3} changePage={this.props.changePage} save={this.onSave} clear={this.props.clear}/>	        
				        
		         	</div>
	         	);
	         	break;
			}
			case 3:{
				return(
					<div id="formBody" >
						<div className="formTitle">Your Education (*mandatory)</div>
						{educationView}
				        <SubmitFields backButton={true} prevPageIndex={2} nextPageIndex={4} changePage={this.props.changePage} save={this.onSave} clear={this.props.clear}/>	        
				        
		         	</div>
	         	);
	         	break;
			}
			case 4:{
				return(
					<div id="formBody" >
						<div className="formTitle">Your Expirience (*mandatory)</div>
		         		{expirienceView}		
		         		<SubmitFields backButton={true} prevPageIndex={3} nextPageIndex={0} changePage={this.props.changePage} save={this.onSave} clear={this.props.clear}/>	        
				     
		         	</div>
	         	);
	         	break;
			}
		}
	}
}