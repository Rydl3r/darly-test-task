import { useState, useEffect } from "react";
import Table from "./components/Table";
import { IItem, INotification } from "./models/types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Form from "./components/Form";
import Notification from "./components/Notification/index";

function App() {
  const [data, setData] = useState<IItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const loadData = async (): Promise<void> => {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${
        (page - 1) * 10
      }&_limit=10`
    );
    let data: IItem[] = await response.json();
    setData((prev: IItem[]) => [...prev, ...data]);
  };

  const addNotification = (message: string, type: "success" | "error") => {
    setNotifications((prev: INotification[]) => [
      ...prev,
      {
        id: prev[prev.length - 1]?.id + 1 || 1,
        message: message,
        type: type,
      },
    ]);
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev: INotification[]) =>
      prev.filter((notification: INotification) => notification.id !== id)
    );
  };

  const addItem = async (
    title: string,
    body: string,
    userId: number
  ): Promise<void> => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.status === 201) {
      let data: IItem = await response.json();
      setData((prev: IItem[]) => [{ ...data, id: 100 + prev.length }, ...prev]);
      addNotification("Item added successfully", "success");
    } else {
      addNotification("Something went wrong", "error");
    }
  };

  const toggleShowForm = (): void => {
    setShowForm((prev: boolean) => !prev);
  };

  useEffect(() => {
    loadData();
  }, [page]);
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }} gutterBottom>
          Darly test task
        </Typography>
        <Table data={data} setPage={setPage} page={page} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleShowForm()}
          sx={{ width: "fit-content", margin: "16px auto 0" }}
        >
          Add Entry
        </Button>
      </Box>
      <Form
        showForm={showForm}
        toggleShowForm={toggleShowForm}
        addItem={addItem}
      />
      {notifications.map((notification: INotification) => (
        <Notification
          key={notification.id}
          data={notification}
          deleteNotification={deleteNotification}
        />
      ))}
    </div>
  );
}

export default App;
