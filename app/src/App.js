import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { AuthProvider } from "./context";
import AppRoute from './components/AppRoute';
import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.css";
import './App.css';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					{routes.map((route) => (
						<AppRoute
							key={route.path}
							path={route.path}
							component={withTracker(props => (
									<route.layout {...props}>
										<route.component {...props} />
									</route.layout>
								)
							)}
							isPrivate={route.isPrivate}
						/>
					))};
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default App;