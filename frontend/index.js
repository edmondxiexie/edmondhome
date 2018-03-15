import React from "react";

import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";
import routes from './routes';
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension(): f => f
	)
)




render(<Provider store={store}>
	<Router history={browserHistory} routes={routes}/>
</Provider>, document.getElementById("root"))
