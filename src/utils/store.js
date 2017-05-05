import AppDispatcher from './Dispatcher'
import ActionConstants from './ActionConstants';
import Events,{EventEmitter} from 'events';
var emitter = new EventEmitter();
var userProfileData = {page1:{},page2:{},page3:{},page4:{}};

class Store{
	constructor() {
        this.dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
    }
    handleAction(payload){        
        let action = payload.action;
        let param = payload.params;
        switch(action) {
            case ActionConstants.CHANGE_URL:
                this.emitAppUrlChange(param.href);
            break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    }
    emitAppUrlChange(url,pageIndex){
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