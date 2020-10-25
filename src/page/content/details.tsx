import { Avatar, Button, Card, CardHeader, CardMedia, Dialog } from "@material-ui/core";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {ObjectModelContact} from "../../api"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

interface DialogDetails {
    close(): void;
    details?:ObjectModelContact;
  }

  export default function Details({
    close,
    details,
  }: DialogDetails) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return(
        <Dialog fullWidth
        open={details !== undefined}
        fullScreen={fullScreen}
        TransitionComponent={Transition}> 
        <div>
            <Card>
                <CardHeader  avatar={
                    <Avatar aria-label="recipe" >
                        A/n
                    </Avatar>
                    }
                    title={`${details?.firstName} ${details?.lastName}`}
                    subheader={`${details?.age} years`}
                />
                <CardMedia
                    style={{height: 0, paddingTop:'56.25%'}}
                    image={`${details?.photo} `}
                    src={`${details?.photo}`}
                    title="Live from space album cover"
                />
            </Card>
        </div>
        <Button onClick={close} color="primary">
              Cancel
        </Button>
        </Dialog>
    )

  }