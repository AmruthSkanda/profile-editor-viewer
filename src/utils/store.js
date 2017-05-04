import AppDispatcher from './Dispatcher'
import ActionConstants from './ActionConstants';
import Events,{EventEmitter} from 'events';
var emitter = new EventEmitter();
var userProfileData = {};

class Store{
	constructor() {
        //this.dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
    }
    handleAction(payload){        
        let action = payload.action;
        switch(action) {
            case ActionConstants.CHANGE_URL:
                emitter.emitAppUrlChange(action.url);
            break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    }
    emitAppUrlChange(url){
    	emitter.emit("APP_URL_CHANGED",url)
    }

    addAppUrlChangeListener(callback){
    	emitter.on("APP_URL_CHANGED",callback)
    }

    removeAppUrlChangeListener(callback){
    	emitter.removeListener("APP_URL_CHANGED",callback)
    }

    saveFormData(page,data){
    	userProfileData[page] = data;
    }

    getUserProfileData(){
    	return userProfileData;
    }
}

export default new Store();