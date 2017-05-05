import ActionConstants from './ActionConstants';
import Dispatcher from './Dispatcher';

class Actions {
  changeUrl(params) {
    Dispatcher.dispatch({
      action: ActionConstants.CHANGE_URL,
      params: params
    });
  }
}
export default new Actions();