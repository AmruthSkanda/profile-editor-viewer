import React from 'react';
import store from '../src/utils/store';
import actions from '../src/utils/actions';
//console.log(store.getUserProfileData())
var that;

const EducationFields = (props) => {
	return(
		<div> 
			<div> 
				<label>Type of Exam</label><br/> 
				<select id={"EXAM_TYPE"+props.index}>
					<option value="">Select an Exam</option>
					<option value="Exam1">Exam 1</option>
					<option value="Exam2">Exam 2</option>
				</select> 
			</div> 
			<div> 
				<label>Board of education </label><br/> 
				<input id={"EDUCATION_BOARD"+props.index} type="text" name="EXAM_TYPE" placeholder="Enter education board" /><br/> 
			</div> 
			<div> 
				<label>Percentage % </label><br/> 
				<input id={"PERCENTAGE"+props.index} type="number" min="0" max="100" placeholder="Enter %" /><br/> 
			</div> 
		</div> 
	);

}

const ExpirienceFields = (props) => {
	return (
		<div> 
			<div> 
	 			<label>Company </label><br/> 
	 			<input id={"COMPANY"+props.index} type="text" placeholder="Enter name of employer"/> 
	 		</div> 
	 		<div> 
	 			<label>No. of years </label><br/> 
	 			<input id={"NO_OF_YEARS"+props.index} type="number" max="100" min="0" placeholder="Enter no of years"/><br/> 
	 		</div> 
	 		
 		</div> 
	);
}

const SubmitFields = (props) =>{
	if(props.backButton)
		return (// onClick={()=>{props.save(props.nextPageIndex)}}
			<div className="submitButtons">
	        	<input type="submit" value="Previous" onClick={()=>{props.changePage(props.prevPageIndex)}}/>
		        <input type="reset" value="Clear" onClick={()=>{props.clear(document.getElementById("formBody"))}}/>
		        <input type="submit" value="Save"/>
	        </div>
		);
	 return(//onClick={()=>{props.save(props.nextPageIndex)}}
		 <div className="submitButtons">
	        <input type="reset" value="Clear" onClick={()=>{props.clear(document.getElementById("formBody"))}}/>
	        <input type="submit" value="Save" />
        </div>
	);
}

const TitleView = (props) =>{
	return(
		<div className="formTitle">
			<div className="formTitleVal">My Details</div>
		 	<div className="editButton" onClick={()=>props.onEditClick("/editor",props.index)}> Edit </div>
		</div>
	)
}
export default class MiddleContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={pageIndex:this.props.pageIndex,educationCount:1,expirienceCount:1}
	}
	onSave(currPage,nextPage){

		try{
			var formData = {};
			var formElem = document.getElementById("formBody");
			for(var i=0; i<formElem.elements.length;i++){
				let elemId = formElem.elements[i].id;
				if(elemId)
					formData[elemId] = document.getElementById(elemId).value;
			}
			store.saveFormData("page"+currPage,formData);
			console.log(store.getUserProfileData());
			that.props.changePage(nextPage);
		}
		catch(e){
			console.log(e.message);
		}
		return false;
	}

	updateEducationCount(){
		this.setState({educationCount: ++this.state.educationCount})
	}

	updateExpirienceCount(){
		this.setState({expirienceCount: ++this.state.expirienceCount})
	}

	onEditClick(nextView,i){
	    actions.changeUrl({
	      href: nextView +"/"+ i,
	    })
	    //this.setState({view:nextView})
	  }

	render(){
		that = this;
		var educationView =[],expirienceView=[];
		for(var i=1;i<=this.state.educationCount;i++)
			educationView.push(<EducationFields key={i} index={i}/>)
		for(var i=1;i<=this.state.expirienceCount;i++)
			expirienceView.push(<ExpirienceFields key={i} index={i}/>)
		switch (this.state.pageIndex){ 	
			default:
			case 1:{
				if(this.props.readOnly){
					var formData = this.props.profileData["page"+this.state.pageIndex];
						return(
							<div id="formBody">
								<TitleView onEditClick={this.onEditClick} index={this.state.pageIndex}/>
								
				         		<div className="fieldDiv">
						         	<div className="fieldTitles">First Name:</div>
						         	<div className="fieldValues">{formData.FIRST_NAME ? formData.FIRST_NAME : ''}</div>
						         	<div className="fieldTitles">Second Name:</div>
						         	<div className="fieldValues">{formData.SECOND_NAME ? formData.SECOND_NAME : ''}</div>
						        	<div className="fieldTitles">Father's Name:</div>
						         	<div className="fieldValues">{formData.FATHER_NAME ? formData.FATHER_NAME : ''}</div>
						         	<div className="fieldTitles">Mother's Name:</div>
						         	<div className="fieldValues">{formData.MOTHER_NAME ? formData.MOTHER_NAME : ''}</div>					       
						         	<div className="fieldTitles">DOB:</div>
						         	<div className="fieldValues">{formData.DOB ? formData.DOB : ''}</div><br/>
						        </div>			       
			         		</div>
						);
				}
				else
					return(
						<form id="formBody" onSubmit={(event)=>{event.preventDefault(); this.onSave(1,2)}}>
							<div className="formTitle">Tell me about yourself</div>
			         		<div>
					         	<label>Your Name</label><br/>
					         	<input id="FIRST_NAME" type="text" placeholder="Enter first name" />
					         	<input id="SECOND_NAME" type="text" style={{"marginLeft": "4em"}} placeholder="Enter second name"/>
					        </div> 
					        <div>
					        	<label>Father's Name </label><br/>
					         	<input id="FATHER_NAME" type="text" placeholder="Enter father name" /><br/>
					        </div>
					        <div>
					         	<label>Mother's Name </label><br/>
					         	<input id="MOTHER_NAME" type="text" placeholder="Enter mother name" /><br/>
					        </div>
					        <div>
					         	<label>DOB</label> <br/>
					         	<input id="DOB" type="date" placeholder="Enter date of birth" /><br/>
					        </div>
					        <SubmitFields backButton={false} clear={this.props.clear}/>	        
					       
			         	</form>
		         	);
	         	break;
			}
			case 2:{
				if(this.props.readOnly){
					var formData = this.props.profileData["page"+this.state.pageIndex];
						return(
							<div id="formBody">
								<TitleView onEditClick={this.onEditClick} index={this.state.pageIndex}/>
				         		<div className="fieldDiv">
						         	<div className="fieldTitles">First Name:</div>
						         	<div className="fieldValues">{formData.FIRST_NAME ? formData.FIRST_NAME : ''}</div>
						         	<div className="fieldTitles">Second Name:</div>
						         	<div className="fieldValues">{formData.SECOND_NAME ? formData.SECOND_NAME : ''}</div>
						        	<div className="fieldTitles">Father's Name:</div>
						         	<div className="fieldValues">{formData.FATHER_NAME ? formData.FATHER_NAME : ''}</div><br/>
						         	<div className="fieldTitles">Mother's Name:</div>
						         	<div className="fieldValues">{formData.MOTHER_NAME ? formData.MOTHER_NAME : ''}</div><br/>						       
						         	<div className="fieldTitles">DOB:</div>
						         	<div className="fieldValues">{formData.DOB ? formData.DOB : ''}</div><br/>
						        </div>			       
			         		</div>
						);
				}
				else
					return(
						<form id="formBody" onSubmit={(event)=>{event.preventDefault(); this.onSave(2,3);}}>
							<div className="formTitle">Where do you live?</div>
			         		<div>
					         	<label>Your Address</label><br/>
					         	<input id="STREET1" type="text" placeholder="Enter Street1" />
					         	<input id="STREET2" type="text" style={{"marginLeft": "4em"}} placeholder="Enter Street2"/>
					        </div> 				       
					        <div>			
					        	<label>City </label><br/>	         	
					         	<input id="CITY" type="text" placeholder="Enter City" /><br/>
					        </div>
					        <div>
					        	<label>State </label><br/>				         	
					         	<input id="STATE" type="text" placeholder="Enter State" /><br/>
					        </div>
					        <div>			
					        	<label>Pincode </label><br/>	         	
					         	<input id="PINCODE" type="text" placeholder="Enter Zip" /><br/>
					        </div>
					        <SubmitFields backButton={true} prevPageIndex={1} changePage={this.props.changePage}  clear={this.props.clear}/>	        
					        
			         	</form>
		         	);
	         	break;
			}
			case 3:{
				if(this.props.readOnly){
					var formData = this.props.profileData["page"+this.state.pageIndex];
						return(
							<div id="formBody">
								<TitleView onEditClick={this.onEditClick} index={this.state.pageIndex}/>
				         		<div className="fieldDiv">
						         	<div className="fieldTitles">First Name:</div>
						         	<div className="fieldValues">{formData.FIRST_NAME ? formData.FIRST_NAME : ''}</div>
						         	<div className="fieldTitles">Second Name:</div>
						         	<div className="fieldValues">{formData.SECOND_NAME ? formData.SECOND_NAME : ''}</div>
						        	<div className="fieldTitles">Father's Name:</div>
						         	<div className="fieldValues">{formData.FATHER_NAME ? formData.FATHER_NAME : ''}</div><br/>
						         	<div className="fieldTitles">Mother's Name:</div>
						         	<div className="fieldValues">{formData.MOTHER_NAME ? formData.MOTHER_NAME : ''}</div><br/>						       
						         	<div className="fieldTitles">DOB:</div>
						         	<div className="fieldValues">{formData.DOB ? formData.DOB : ''}</div><br/>
						        </div>			       
			         		</div>
						);
				}
				else
					return(
						<form id="formBody" onSubmit={(event)=>{event.preventDefault(); this.onSave(3,4);}}>
							<div className="formTitle">Your Education </div>
							{educationView}
							<div className="addIcon" onClick={()=>this.updateEducationCount()}> 
								+
							</div>
					        <SubmitFields backButton={true} prevPageIndex={2} changePage={this.props.changePage} clear={this.props.clear}/>	        
					        
			         	</form>
		         	);
	         	break;
			}
			case 4:{
				if(this.props.readOnly){
					var formData = this.props.profileData["page"+this.state.pageIndex];
						return(
							<div id="formBody">
								<TitleView onEditClick={this.onEditClick} index={this.state.pageIndex}/>
				         		<div className="fieldDiv">
						         	<div className="fieldTitles">First Name:</div>
						         	<div className="fieldValues">{formData.FIRST_NAME ? formData.FIRST_NAME : ''}</div>
						         	<div className="fieldTitles">Second Name:</div>
						         	<div className="fieldValues">{formData.SECOND_NAME ? formData.SECOND_NAME : ''}</div>
						        	<div className="fieldTitles">Father's Name:</div>
						         	<div className="fieldValues">{formData.FATHER_NAME ? formData.FATHER_NAME : ''}</div><br/>
						         	<div className="fieldTitles">Mother's Name:</div>
						         	<div className="fieldValues">{formData.MOTHER_NAME ? formData.MOTHER_NAME : ''}</div><br/>						       
						         	<div className="fieldTitles">DOB:</div>
						         	<div className="fieldValues">{formData.DOB ? formData.DOB : ''}</div><br/>
						        </div>			       
			         		</div>
						);
				}
				else
					return(
						<form id="formBody" onSubmit={(event)=>{event.preventDefault(); this.onSave(4,0);}}>
							<div className="formTitle">Your Expirience</div>
			         		{expirienceView}	
			         		<div className="addIcon" onClick={()=>this.updateExpirienceCount()}> 
								+
							</div>	
			         		<SubmitFields backButton={true} prevPageIndex={3} nextPageIndex={0} changePage={this.props.changePage} clear={this.props.clear}/>	        
					     
			         	</form>
		         	);
	         	break;
			}
		}
	}
}