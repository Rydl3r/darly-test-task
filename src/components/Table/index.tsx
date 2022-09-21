import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { IItem } from "../../models/types";

interface Props {
  data: IItem[];
  setPage: (page: number) => void;
  page: number;
}

const TableComponent = ({ data, setPage, page }: Props) => {
  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const target = e.target as HTMLInputElement;
    const bottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 20;
    if (bottom) {
      setPage(page + 1);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 500, overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <Table sx={{ minWidth: 560 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>UserId</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: IItem) => (
            <TableRow
              key={item.id + item.userId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.body}</TableCell>
            </TableRow>
          ))}
          {page < 10 && (
            <TableRow>
              <TableCell component="th" scope="row">
                <CircularProgress color="inherit" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
