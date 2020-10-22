import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface DailogAddFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  save(firstName: string, lastName: string, age:number, photo:string): void;
}

export default function DailogAddForm({
  open,
  save,
  setOpen,
}: DailogAddFormProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      age,
      photo,
    } = event.target.elements;
    save(
      firstName["value"],
      lastName["value"],
      age["value"],
      photo["value"],
    )
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      fullScreen={fullScreen}
      TransitionComponent={Transition}
    >
      <form autoComplete="off" onSubmit={onSubmit}>
        <DialogContent>
          <React.Fragment>
            <TextField
              id="firstName"
              label="first Name"
              variant="outlined"
              margin="dense"
              fullWidth
            />
             <TextField
              id="lastName"
              label="last Name"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="age"
              label="age"
              variant="outlined"
              margin="dense"
              type="number"
              fullWidth
            />
             <TextField
              id="photo"
              label="photo"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            
          </React.Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Batal
          </Button>
          <Button type="submit" color="primary">
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}