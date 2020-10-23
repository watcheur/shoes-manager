import React from "react";
import { Container, Button, Row, Col, Card, CardBody, CardFooter, CardHeader, Form, FormInput } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { ItemUpsert } from "../components/items";

const ItemDetail = (props) => {

	const { match: { params } } = props;

	return (
		<Container fluid className="main-content-container px-4">

			<Row noGutters className="page-header p-0 mt-3 mb-3">
				<Col className="py-2">
					<Button href={`/Items`} pill className="m-0">&larr; Go Back</Button>
				</Col>
				<Col lg="11">
					<PageTitle title="Item update" subtitle="Dashboard" className="text-sm-left mb-3" />
				</Col>
			</Row>

			<Row>
				<Col md="12">
					<ItemUpsert title="Modify Item" itemId={params.itemId} />
				</Col>
			</Row>

		</Container>
	)
};

export default ItemDetail;