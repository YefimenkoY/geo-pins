import React from "react";
import { Header, Grid, Icon } from "semantic-ui-react";

const NoContent = () => (
  <Grid.Row>
    <Grid.Column>
      <Icon name="map marker alternate" size="huge" />
      <Header textAlign="center" as="h3">
        Welcome to geo pin app!
      </Header>
    </Grid.Column>
  </Grid.Row>
);

export default NoContent;
