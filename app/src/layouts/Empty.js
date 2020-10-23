import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

const EmptyLayout = ({ children }) => (
	<Container fluid>
		<Row>
			<Col
				className="main-content p-0"
				lg="12"
				md="12"
				sm="12"
				tag="main"
			>
			{children}
			</Col>
		</Row>
	</Container>
);
	
EmptyLayout.propTypes = {

};

EmptyLayout.defaultProps = {

};

export default EmptyLayout;
