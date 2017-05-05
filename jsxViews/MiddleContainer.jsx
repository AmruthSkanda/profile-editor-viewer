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

const EducationReadOnly = (props) => {
		let val = ' ';
		for(var prop in props.formData){
			val += props.formData[prop];
			val += " :: ";
		}
		return(
			<div> 
				<div className="fieldContainer"> 
					<div className="fieldTitles">Education Details:&nbsp;&nbsp;&nbsp;</div>
		         	<div className="fieldValues">{ val.slice(0,-4) }</div>
				</div> 
				
			</div> 
		);
}
const ExpirienceReadOnly = (props) => {
	let val = ' ';
	for(var prop in props.formData){
		val += props.formData[prop];
		val += " :: ";
	}
	return(
		<div> 
			<div className="fieldContainer"> 
				<div className="fieldTitles">Company:&nbsp;&nbsp;&nbsp;</div>
	         	<div className="fieldValues">
	         		{ val.slice(0,-4) }
	         	</div>
			</div> 
		</div> 
	);
}
export default class MiddleContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={pageIndex:this.props.pageIndex,educationCount:store.getEducationCount(),expirienceCount:store.getExpirienceCount()}
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
			//console.log(store.getUserProfileData());
			that.props.changePage(nextPage);
		}
		catch(e){
			console.log(e.message);
		}
		return false;
	}

	updateEducationCount(){
		store.setEducationCount(++this.state.educationCount)
		this.setState({educationCount: store.getEducationCount()})
	}

	updateExpirienceCount(){
		store.setExpirienceCount(++this.state.expirienceCount)
		this.setState({expirienceCount: store.getExpirienceCount()})
	}

	onEditClick(nextView,i){
	    actions.changeUrl({
	      href: nextView +"/"+ i,
	    })
	    //this.setState({view:nextView})
	  }

	render(){
		that = this;
		var formDataAll = this.props.profileData ? this.props.profileData : store.getUserProfileData();
		var educationView =[],expirienceView=[];
		for(var i=1;i<=this.state.educationCount;i++)
			educationView.push(<EducationFields key={i} index={i}/>)
		for(var i=1;i<=this.state.expirienceCount;i++)
			expirienceView.push(<ExpirienceFields key={i} index={i}/>)
		var expirienceReadOnlyView = [],eduReadOnlyView=[];
		for(var i=1;i<=this.state.expirienceCount;i++){
			let formData = {};
			for(let prop in formDataAll["page4"]){
				if(prop.toString().indexOf(i) != -1)
					formData[prop] = formDataAll["page4"][prop];
			}
			expirienceReadOnlyView.push(
				<div>
					<div className="dummyTitle">{"Company "+ i + " details:   (Company :: Expirience)"}</div>
					<ExpirienceReadOnly key={i} formData={formData}/>
				</div>
			);
		}
		for(var i=1;i<=this.state.educationCount;i++){
			let formData = {};
			for(let prop in formDataAll["page3"]){
				if(prop.toString().indexOf(i) != -1)
					formData[prop] = formDataAll["page3"][prop];
			}
			eduReadOnlyView.push(
				<div>
					<div className="dummyTitle">{"Education "+ i + " details:   (Exam :: Education Board :: Percentage in %)"}</div>
					<EducationReadOnly key={i} formData={formData}/>
				</div>
			);
		}
		switch (this.state.pageIndex){ 	
			default:
			case 1:{
				if(this.props.readOnly){
					var formData = this.props.profileData["page"+this.state.pageIndex];
						return(
							<div id="formBody">
								<TitleView onEditClick={this.onEditClick} index={this.state.pageIndex}/>
								
				         		<div className="fieldDiv">
				         			<div className="fieldContainer">
							         	<div className="fieldTitles">First Name:&nbsp;&nbsp;&nbsp;</div>
							         	<div className="fieldValues">{formData.FIRST_NAME ? formData.FIRST_NAME : ''}</div>
						         	</div>
						         	<div className="fieldContainer">
							         	<div className="fieldTitles">Second Name:&nbsp;&nbsp;&nbsp;</div>
							         	<div className="fieldValues">{formData.SECOND_NAME ? formData.SECOND_NAME : ''}</div>
						         	</div>
						         	<div className="fieldContainer">
							        	<div className="fieldTitles">Father's Name:&nbsp;&nbsp;&nbsp;</div>
							         	<div className="fieldValues">{formData.FATHER_NAME ? formData.FATHER_NAME : ''}</div>
						         	</div>
						         	<div className="fieldContainer">
							         	<div className="fieldTitles">Mother's Name:&nbsp;&nbsp;&nbsp;</div>
							         	<div className="fieldValues">{formData.MOTHER_NAME ? formData.MOTHER_NAME : ''}</div>					       
						         	</div>
						         	<div className="fieldContainer">
							         	<div className="fieldTitles">DOB:&nbsp;&nbsp;&nbsp;</div>
							         	<div className="fieldValues">{formData.DOB ? formData.DOB : ''}</div><br/>
						         	</div>
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
				         			<div className="fieldContainer">
						         		<div className="fieldTitles">Street1:&nbsp;&nbsp;&nbsp;</div>
						         		<div className="fieldValues">{formData.STREET1 ? formData.STREET1 : ''}</div>
						         	</div>
						         	<div className="fieldContainer">
						         		<div className="fieldTitles">Street2:&nbsp;&nbsp;&nbsp;</div>
						         		<div className="fieldValues">{formData.STREET2 ? formData.STREET2 : ''}</div>
						        	</div>
						        	<div className="fieldContainer">
						        		<div className="fieldTitles">City:&nbsp;&nbsp;&nbsp;</div>
						         		<div className="fieldValues">{formData.CITY ? formData.CITY : ''}</div><br/>
						         	</div>
						         	<div className="fieldContainer">
						         		<div className="fieldTitles">State:&nbsp;&nbsp;&nbsp;</div>
						         		<div className="fieldValues">{formData.STATE ? formData.STATE : ''}</div><br/>						       
						         	</div>
						         	<div className="fieldContainer">
						         		<div className="fieldTitles">Pincode:&nbsp;&nbsp;&nbsp;</div>
						         		<div className="fieldValues">{formData.PINCODE ? formData.PINCODE : ''}</div><br/>
						        	</div>
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
								{eduReadOnlyView}
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
				         		{expirienceReadOnlyView}
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