export interface IItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface INotification {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
}
