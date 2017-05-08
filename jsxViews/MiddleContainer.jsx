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
					<option value="Exam3">Exam 3</option>
				</select> 
			</div> 
			<div> 
				<label>Board of education </label><br/> 
				<input id={"EDUCATION_BOARD"+props.index} defaultValue={props.formData[1]} type="text" name="EXAM_TYPE" placeholder="Enter education board" /><br/> 
			</div> 
			<div> 
				<label>Percentage % </label><br/> 
				<input id={"PERCENTAGE"+props.index} defaultValue={props.formData[2]} type="number" min="0" max="100" placeholder="Enter %" /><br/> 
			</div> 
		</div> 
	);

}

const ExpirienceFields = (props) => {
	return (
		<div> 
			<div> 
	 			<label>Company </label><br/> 
	 			<input id={"COMPANY"+props.index} defaultValue={props.formData[0]} type="text" placeholder="Enter name of employer"/> 
	 		</div> 
	 		<div> 
	 			<label>No. of years </label><br/> 
	 			<input id={"NO_OF_YEARS"+props.index} defaultValue={props.formData[1]} type="number" max="100" min="0" placeholder="Enter no of years"/><br/> 
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

const ReadOnlyView = (props) => {
	let prop = props.id.toString();
	return(			
		<div className="fieldContainer"> 
			<div className="fieldTitles">{prop.replace('_',' ').slice(0,prop.length-1).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})}:&nbsp;&nbsp;&nbsp;</div>
         	<div className="fieldValues">{props.value}</div>
		</div> 
	);
		
}
/*const ExpirienceReadOnly = (props) => {
	for(var i=0;i < Object.keys(props.formData).length;i++){
		return(
			<div> 
				<div className="fieldContainer"> 
					<div className="fieldTitles">{prop}:&nbsp;&nbsp;&nbsp;</div>
		         	<div className="fieldValues">{props.formData[prop]}</div>
				</div> 
			</div> 
		);	
	}
	
}*/
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
		let readOnly = [],reqFields = [];
		var formDataAll = this.props.profileData ? this.props.profileData : store.getUserProfileData();
		let page3Keys = Object.keys(formDataAll["page3"]);
		let page4Keys = Object.keys(formDataAll["page4"]);
		var educationView =[],expirienceView=[];

		for(var i=1;i<=this.state.educationCount;i++){
			let reqVals = page3Keys.map((key)=>{
				if(key.match(i)) return formDataAll["page3"][key];
			});
			reqVals = reqVals.filter((val)=> {return val});
			/*let reqVals = reqFields.map((prop)=>{
				return formDataAll["page3"][prop];
			});*/
			educationView.push(<EducationFields key={i} index={i} formData={reqVals}/>)
		}

		reqFields=[];
		for(var i=1;i<=this.state.expirienceCount;i++){
			let reqVals = page4Keys.map((key)=>{
				if(key.match(i)) return formDataAll["page4"][key];
			});
			reqVals = reqVals.filter((val)=> {return val});
			/*let reqVals = reqFields.map((prop)=>{
				return formDataAll["page4"][prop];
			});*/
			expirienceView.push(<ExpirienceFields key={i} index={i} formData={reqVals}/>)
		}

		var expirienceReadOnlyView = [],eduReadOnlyView=[];
		for(var i=1;i<=this.state.expirienceCount;i++){
			let formData = {},readOnly=[];;
			for(let prop in formDataAll["page4"]){
				if(prop.toString().indexOf(i) != -1)
					formData[prop] = formDataAll["page4"][prop];
			}
			for(let prop in formData){
				readOnly.push(
					<ReadOnlyView key={prop} id={prop} value={formData[prop]}/>
				);
			}
			expirienceReadOnlyView.push(
				<div>
					<div className="dummyTitle">{"Company "+ i + " details:"}</div>
					{readOnly}
				</div>
			);
		}
		
		for(var i=1;i<=this.state.educationCount;i++){
			let formData = {},readOnly=[];
			for(let prop in formDataAll["page3"]){
				if(prop.toString().indexOf(i) != -1)
					formData[prop] = formDataAll["page3"][prop];
			}
			for(let prop in formData){
				readOnly.push(
					<ReadOnlyView key={prop} id={prop} value={formData[prop]}/>
				);
			}
			eduReadOnlyView.push(
				<div>
					<div className="dummyTitle">{"Education "+ i + " details:"}</div>
					{readOnly}
				</div>
			);
		}
		var readOnlyPage1 = [],readOnlyPage2 = [],tempValues1=[],tempValues2=[];
		for(let prop in formDataAll["page1"]){
			tempValues1.push(formDataAll["page1"][prop]);
			readOnlyPage1.push(
				<ReadOnlyView key={prop} id={prop+' '} value={formDataAll["page1"][prop]} />
			);
		}
		for(let prop in formDataAll["page2"]){
			tempValues2.push(formDataAll["page2"][prop]);
			readOnlyPage2.push(
				<ReadOnlyView key={prop} id={prop+' '} value={formDataAll["page2"][prop]} />
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
									{readOnlyPage1}
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
					         	<input id="FIRST_NAME" key="FIRST_NAME" defaultValue={tempValues1[0]} type="text" placeholder="Enter first name" />
					         	<input id="SECOND_NAME" key="SECOND_NAME" defaultValue={tempValues1[1]} type="text" style={{"marginLeft": "4em"}} placeholder="Enter second name"/>
					        </div> 
					        <div>
					        	<label>Father's Name </label><br/>
					         	<input id="FATHER_NAME" key="FATHER_NAME" defaultValue={tempValues1[2]} type="text" placeholder="Enter father name" /><br/>
					        </div>
					        <div>
					         	<label>Mother's Name </label><br/>
					         	<input id="MOTHER_NAME" key="MOTHER_NAME" defaultValue={tempValues1[3]} type="text" placeholder="Enter mother name" /><br/>
					        </div>
					        <div>
					         	<label>DOB</label> <br/>
					         	<input id="DOB" key="DOB" defaultValue={tempValues1[4]} type="date" placeholder="Enter date of birth" /><br/>
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
				         			{readOnlyPage2}
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
					         	<input id="STREET1" key="STREET1"  defaultValue={tempValues2[0]} type="text" placeholder="Enter Street1" />
					         	<input id="STREET2" key="STREET2" defaultValue={tempValues2[1]} type="text" style={{"marginLeft": "4em"}} placeholder="Enter Street2"/>
					        </div> 				       
					        <div>			
					        	<label>City </label><br/>	         	
					         	<input id="CITY" key="CITY" defaultValue={tempValues2[2]} type="text" placeholder="Enter City" /><br/>
					        </div>
					        <div>
					        	<label>State </label><br/>				         	
					         	<input id="STATE" key="STATE"  defaultValue={tempValues2[3]} type="text" placeholder="Enter State" /><br/>
					        </div>
					        <div>			
					        	<label>Pincode </label><br/>	         	
					         	<input id="PINCODE" key="PINCODE"  defaultValue={tempValues2[4]} type="text" placeholder="Enter Zip" /><br/>
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