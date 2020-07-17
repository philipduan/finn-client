import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
const ProfileCard = ({ user }) => {
  return (
    <div style={{ margin: 20 }}>
      <Card style={{ maxWidth: 500 }} raised={false}>
        {user ? (
          <>
            <CardHeader
              avatar={
                <Avatar>
                  {user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </Avatar>
              }
              title={<div style={{ textAlign: "initial" }}>{user.name}</div>}
              subheader={
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PhoneIcon />
                    <p style={{ margin: "0px 10px" }}>{user.phone}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <EmailIcon />
                    <p style={{ margin: "0px 10px" }}>{user.email}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <RecordVoiceOverIcon />
                    <p style={{ margin: "0px 10px" }}>{user.tone}</p>
                  </div>
                </>
              }
            />
            <CardContent>
              {`Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
              <br />
              {`Work for ${user.company.name}`}
            </CardContent>
          </>
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default ProfileCard;
