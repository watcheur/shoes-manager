import React from "react";
import { Container, Button, Row, Col, Card, CardBody, CardFooter, CardHeader, Form, FormInput } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { ItemsList, ItemUpsert } from "../components/items";

const ItemsOverview = (props) => (
	<Container fluid className="main-content-container px-4">
		<Row noGutters className="page-header py-4">
			<PageTitle title="Items" subtitle="Dashboard" className="text-sm-left mb-3" />
		</Row>

		<Row>
			<Col md="12">
				<ItemUpsert />
			</Col>
		</Row>

		<Row>
			<Col md="12">
				<ItemsList />
			</Col>
		</Row>
	</Container>
);
  
export default ItemsOverview;