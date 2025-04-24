import Dropdown from "react-bootstrap/Dropdown";
import UserDropdownToggle from "./UserDropdownToggle";
import { type User } from "../store/authContext";

interface UserButtonProps {
  user: User;
}

const UserButton = ({ user }: UserButtonProps) => {
  const userImage = user.photoUrl ? (
    <img src={user.photoUrl} className="profilePhoto" alt="Profile picture" />
  ) : (
    <i className="bi bi-person-circle fs-2" />
  );
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={UserDropdownToggle}>{userImage}</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.ItemText>{user.name}</Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item href="/api/logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserButton;
