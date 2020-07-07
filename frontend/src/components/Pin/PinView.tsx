import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import mapContext from "../../context/map";
import { DELETE_PIN } from "./queries";

export default () => {
  const { currentPin, setCurrentPin, setPins } = mapContext();
  const [deletePin, { loading }] = useMutation(DELETE_PIN, {
    onCompleted(data) {
      setCurrentPin(null);
      setPins(data.DeletePin);
    }
  });
  if (!currentPin) return null;

  const { image, description, title, createdAt } = currentPin;

  const onDelete = () =>
    deletePin({ variables: { input: { pinId: currentPin.id } } });

  return (
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">{createdAt}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          circular
          icon="trash"
          loading={loading}
          color="red"
          onClick={onDelete}
        />
      </Card.Content>
    </Card>
  );
};
