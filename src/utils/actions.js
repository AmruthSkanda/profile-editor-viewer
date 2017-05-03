import ActionConstants from './ActionConstants';
import Dispatcher from './Dispatcher';

export default const Actions = {
  changeUrl(url) {
    Dispatcher.dispatch({
      action: ActionConstants.CHANGE_URL,
      url: url,
    });
  },
};