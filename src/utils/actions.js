import ActionConstants from './ActionConstants';
import Dispatcher from './Dispatcher';

export default const Actions = {
  changeUrl(url) {
    Dispatcher.dispatch({
      type: TodoActionTypes.CHANGE_URL,
      params: url,
    });
  },
};