import { createStore, combineReducers, applyMiddleware } from "redux"
import {thunk} from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productReducer } from "./reducer/productReducer"

const reducer = combineReducers({
    product: productReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store; 