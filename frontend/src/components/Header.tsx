import React from "react";
import styled, { StyledComponent } from "styled-components";
import {
  Segment,
  Container as _Container,
  Button,
  Icon
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import useMapContext from "../context/map";
import { routes } from "../constants/routes";
import useCurrentUserContext from "../context/currentUser";

const Box: StyledComponent<any, any> = styled(Segment)`
  && {
    height: ${({ theme: { header } }) => header.height};
    background: ${({ theme: { colors } }) => colors.purple} !important;
    width: 100%;
    border-radius: 0 !important;
    color: inherit !important;
    margin: 0 !important;
    position: relative;
  }
`;

const Container = styled(_Container)`
  && {
    display: grid !important;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    grid-template-columns: 300px 300px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    margin: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconBox = styled.div`
  height: 100%;
  width: 100px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  i {
    font-size: 40px !important;
    cursor: pointer;
  }
`;

interface IProps extends RouteComponentProps {
  toggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  client: any;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IProps> = ({
  toggleSideBar,
  location: { pathname },
  history,
  client,
  setOpenSideBar
}) => {
  const [currentUser, setCurrentUser] = useCurrentUserContext();
  const { currentPosition, reset } = useMapContext();

  React.useEffect(() => setOpenSideBar(!!currentPosition), [
    currentPosition,
    setOpenSideBar
  ]);

  return (
    <Box raised>
      <IconBox>
        <Icon onClick={toggleSideBar} name="sidebar" />
      </IconBox>
      <Container>
        <LogoLink to={routes.ROOT}>
          <Icon name="map marker alternate" size="big" color="orange" />
          <h1>Geo Pins</h1>
        </LogoLink>
        <Buttons>
          {!currentUser ? (
            <>
              <Button
                active={pathname === routes.LOG_IN}
                as={Link}
                to={routes.LOG_IN}
                content="Log in"
                inverted
                color="blue"
              />
              <Button
                active={pathname === routes.SIGN_UP}
                as={Link}
                to={routes.SIGN_UP}
                content="Sign up"
                inverted
                color="brown"
              />
            </>
          ) : (
            <Button
              content="Sign out"
              inverted
              color="brown"
              onClick={async () => {
                reset();
                localStorage.removeItem("token");
                setCurrentUser(null);
                await client.resetStore();
                history.push(routes.LOG_IN);
              }}
            />
          )}
        </Buttons>
      </Container>
    </Box>
  );
};

export default withRouter(Header);
