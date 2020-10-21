import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { UserContext } from './userContext';

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.css";
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {}
		}

		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
	}

	logout() {
		this.setState({ user: { } });
	}

	login(user) {
		this.setState({ user: user });
	}

	render() {
		const userCtx = {
			user: this.state.user,
			login: this.login,
			logout: this.logout
		};

		return (
			<UserContext.Provider value={userCtx}>
				<Router basename={""}>
					{routes.map((route, index) => {
						return (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							component={withTracker(props => {
								var p = { ... props, ...route };
								if (route.admin && !this.state.user.id)
									return (<Redirect to="/login" />)
								return (
									<route.layout {...p}>
										<route.component {...p} />
									</route.layout>
								);
							})}
						/>
						);
					})}
				</Router>
			</UserContext.Provider>
		)
	}
}

export default App;