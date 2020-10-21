import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

const DefaultLayout = ({ children, noFooter }) => (
	<Container fluid>
		<Row>
			<MainSidebar />
			<Col
				className="main-content p-0"
				lg={{ size: 10, offset: 2 }}
				md={{ size: 9, offset: 3 }}
				sm="12"
				tag="main"
			>
			{children}
				{!noFooter && <MainFooter />}
			</Col>
		</Row>
	</Container>
);
	
DefaultLayout.propTypes = {
	/**
	* Whether to display the footer, or not.
	*/
	noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
	noFooter: true
};

export default DefaultLayout;
