import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
const Dropdown = (props) => {
  const renderMenuItems = (usersList) =>
    usersList.map((user, index) => (
      <MenuItem key={index} value={index}>
        {user.name}
      </MenuItem>
    ));
  return (
    <FormControl>
      <InputLabel id="users-name-label">Users Name</InputLabel>
      <Select
        labelId="users-name-label"
        id="users-name-select"
        value={props.selectedUsersListIndex}
        onChange={(event) => props.handleDropdownChanged(event.target.value)}
      >
        {renderMenuItems(props.usersList)}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
