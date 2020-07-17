import React, { useState, useEffect } from "react";
import axios from "axios";
import faker from "faker";
import Grid from "@material-ui/core/Grid";
import Dropdown from "../../Component/Dropdown";
import ProfileCard from "../../Component/ProfileCard";
import AlertBar from "../../Component/AlertBar";

const BASE_URI_USERS = "http://localhost:8080";
const BASE_URI_TONE = "http://localhost:5000";

const MainLayout = () => {
  const [usersList, setUsersList] = useState([]);
  const [selectedUsersListIndex, setSelectedUsersListIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const initialFetch = async () => {
      let initialFetchUserList = [];
      try {
        const { data: fetchedUsersList } = await axios.get(
          `${BASE_URI_USERS}/id`
        );
        initialFetchUserList = [...fetchedUsersList];
        const {
          data: { user: fetchSavedUser },
        } = await axios.post(`${BASE_URI_USERS}/user`, {
          user: faker.helpers.userCard(),
        });
        if (fetchSavedUser)
          initialFetchUserList.push({
            _id: fetchSavedUser._id,
            name: fetchSavedUser.name,
          });
        setAlertMessage("New user saved successfully");
      } catch (error) {
        setAlertMessage(error.response.data.message);
      } finally {
        return initialFetchUserList;
      }
    };
    initialFetch().then((users) => {
      setUsersList(users);
      setSelectedUsersListIndex(Math.floor(Math.random() * users.length));
    });
    return () => {};
  }, []);

  useEffect(() => {
    const fetchUserAndTone = async (userId) => {
      try {
        const user = await axios.get(`${BASE_URI_USERS}/user/${userId}`);
        const tone = await axios(BASE_URI_TONE);
        setSelectedUser({ ...user.data, tone: tone.data });
      } catch (error) {
        setAlertMessage(error.response && error.response.data.message);
      }
    };
    if (usersList.length && selectedUsersListIndex !== null) {
      fetchUserAndTone(usersList[selectedUsersListIndex]._id);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUsersListIndex]);

  return (
    <>
      <AlertBar alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      <Grid align="center">
        {usersList.length && selectedUsersListIndex !== null ? (
          <>
            <Dropdown
              usersList={usersList}
              selectedUsersListIndex={selectedUsersListIndex}
              handleDropdownChanged={setSelectedUsersListIndex}
            />
            <br />
            <ProfileCard user={selectedUser} />
          </>
        ) : (
          "Please refresh the browser to create users"
        )}
      </Grid>
    </>
  );
};

export default MainLayout;
