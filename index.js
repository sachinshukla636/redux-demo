const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function cakeRestocked(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function iceCreamRestocked(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// const initialState = {
//   noOfCakes: 10,
//   noOfIcecream: 20,
// };

const initialCakeState = {
  noOfCakes: 10,
};

const initialIceCreamState = {
  noOfIcecream: 20,
};

// (prevState, action) => newState

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         noOfCakes: state.noOfCakes - 1,
//       };
//     case CAKE_RESTOCKED:
//       return {
//         ...state,
//         noOfCakes: state.noOfCakes + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         noOfIcecream: state.noOfIcecream - 1,
//       };
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         noOfIcecream: state.noOfIcecream + action.payload,
//       };
//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        noOfCakes: state.noOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        noOfIcecream: state.noOfIcecream - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        noOfIcecream: state.noOfIcecream + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer,applyMiddleware(logger));
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Update state", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(cakeRestocked(3));

const actions = bindActionCreators(
  { orderCake, cakeRestocked, orderIcecream, iceCreamRestocked },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.cakeRestocked(3);
actions.orderIcecream();
actions.orderIcecream();
actions.iceCreamRestocked(5);

unsubscribe();
