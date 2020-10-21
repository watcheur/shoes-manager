import React from "react";
import { Container, Button, Row, Col, Card, CardBody, CardFooter, CardHeader, Form, FormInput } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const ItemDetail = (props) => (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle title="Item" subtitle="Dashboard" className="text-sm-left mb-3" />
		</Row>

	</Container>
);

export default ItemDetail;