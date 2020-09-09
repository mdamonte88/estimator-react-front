import { fromJS } from 'immutable';

const initialState = fromJS({
  types: [{
    id: 'IOS',
    image: 'IOS'
  },
  {
    id: 'Android',
    image: 'Android'
  },
  {
    id: 'Website',
    image: 'Website'
  },
  {
    id: 'Hybrid',
    image: 'Hybrid'
  },
  ],
  platform: ''
});

const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_PLATFORM': {
      return state.set('platform', fromJS(action.payload));
    }
    default:
      return state;
  }
};

export default landingReducer;
