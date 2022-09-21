import { INotification } from "../../models/types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Props {
  data: INotification;
  deleteNotification: (id: number) => void;
}

const Notification = ({ data, deleteNotification }: Props) => {
  return (
    <Snackbar
      key={data.id}
      open={true}
      autoHideDuration={6000}
      onClose={() => deleteNotification(data.id)}
    >
      <Alert
        onClose={() => deleteNotification(data.id)}
        severity={data.type}
        sx={{ width: "100%" }}
      >
        {data.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
