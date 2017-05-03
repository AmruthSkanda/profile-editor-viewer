import AppDispatcher from './Dispatcher'
import ActionConstants from './ActionConstants';
import Events from 'events';

var userProfileData = {};

class Store extends Events.EventEmitter{
	constructor(props) {
        super(props);
        this.dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));

    }
    handleAction(payload){        
        let action = payload.action;
        switch(action) {
            case ActionConstants.CHANGE_URL:
                this.emitAppUrlChange(action.url);
            break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    }
    emitAppUrlChange(url){
    	this.emit("APP_URL_CHANGED",url)
    }

    addAppUrlChangeListener(callback){
    	this.on("APP_URL_CHANGED",callback)
    }
    
    removeAppUrlChangeListener(callback){
    	this.removeListener("APP_URL_CHANGED",callback)
    }

    setUserProfileData(data){
    	userProfileData = data;
    }

    getUserProfileData(){
    	return userProfileData;
    }
}
export default new Store();