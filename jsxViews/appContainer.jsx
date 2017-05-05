import React from 'react'
import store from '../src/utils/store.js'
import ProfileEditor from './ProfileEditor.jsx'
import ProfileViewer from './ProfileViewer.jsx'

export default class AppContainer extends React.Component{
	constructor(){
		super();
        this.state = {appUrl:"/editor/"}
	}

	componentDidMount(){
		store.addAppUrlChangeListener(this._onChangeUrl.bind(this));
	}
	componentWillUnmount() {
        store.removeAppUrlChangeListener(this._onChangeUrl.bind(this));
    }
	_onChangeUrl(url) {
        this.setState({appUrl:url});
    }
    getContent(){        
        var url = this.state.appUrl
        var match = null;
        if (url) {
        	if (match = url.match(/editor/ig)) {
        		
        		var lastIndex = url.lastIndexOf("/")
        		var qparam = url.substring(lastIndex+1,url.length);
        		console.log(qparam)
                return (
                    <ProfileEditor pageIndex={qparam}/>
                );
            }
            else if(match = url.match(/profile/ig)) {
                return (
                    <ProfileViewer />
                );
            }
            
        }
    }
    render(){
    	var content = this.getContent();
        return (
           <div className="pageContainer">
            {content}
           </div>
        );
    }
}
