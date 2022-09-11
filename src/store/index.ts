import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import reducers from "./reducers";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunkMiddleware from "redux-thunk";
// import {persistReducer,persistStore} from "redux-persist"
// import storage from "redux-persist/lib/storage";
// const persistConfig={
//     key:"persist-store",
//     storage
// }

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// const persistedReducer=persistReducer(persistConfig,reducers)


// export const store = createStore(
//     persistedReducer,
//     composedEnhancer
// )

// export let persistor=persistStore(store)

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)