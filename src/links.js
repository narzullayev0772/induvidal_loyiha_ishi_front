import { MdExplore, MdPerson } from "react-icons/md";
import Posts from "./pages/posts";
import UsersTable from "./pages/table.page";
import Upload from "./pages/upload";
import { HiOutlinePlusCircle } from "react-icons/hi";

const category = [
  {
    name: "Posts",
    icon: <MdExplore />,
    link: "/",
    component: <Posts />,
    can__see: ["user", "admin", "superadmin", "guest"],
  },
  {
    name: "Users",
    icon: <MdPerson />,
    link: "/users",
    component: <UsersTable />,
    can__see: ["admin", "superadmin"],
  },
  {
    name: "Upload",
    icon: <HiOutlinePlusCircle />,
    link: "/upload",
    component: <Upload />,
    can__see: ["admin", "user", "superadmin"],
  },
];

export default category;
