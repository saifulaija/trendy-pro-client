import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card, Input, Button } from "antd";
import { useGetMeQuery } from "../../../redux/features/user/userApi";

const MyProfile = () => {
  const { data } = useGetMeQuery("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: data?.data?.name || "",
    email: data?.data?.email || "",
    // Add other fields here with initial values if needed
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Add logic to save edited data, e.g., dispatch an action
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const userData = isEditing ? editedData : data?.data;

  return (
    <div className="mt-10">
      <Card
        title="Personal Information"
        extra={
          isEditing ? (
            <Button onClick={handleSaveClick} type="primary" danger>
              Save
            </Button>
          ) : (
            <Button onClick={handleEditClick}>
              Edit <EditOutlined />
            </Button>
          )
        }
        style={{ width: "100%" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Name</p>
            {isEditing ? (
              <Input
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData?.name}</p>
            )}
          </div>
          <div>
            <p className="font-bold">Email</p>
            {isEditing ? (
              <Input
                disabled
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData?.email}</p>
            )}
          </div>
          <div>
            <p className="font-bold">Phone Number</p>
            {isEditing ? (
              <Input name="phoneNumber" onChange={handleInputChange} />
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <p className="font-bold">Gender</p>
            {isEditing ? (
              <Input name="gender" onChange={handleInputChange} />
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <p className="font-bold">Anniversary</p>
            {isEditing ? (
              <Input name="anniversary" onChange={handleInputChange} />
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <p className="font-bold">Date Of Birth</p>
            {isEditing ? (
              <Input name="dob" onChange={handleInputChange} />
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <p className="font-bold">Number of Family Members</p>
            {isEditing ? (
              <Input name="familyMember" onChange={handleInputChange} />
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <p className="font-bold">Number of Kids</p>
            {isEditing ? (
              <Input name="kids" onChange={handleInputChange} />
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <p className="font-bold">Preferred Model</p>
            {isEditing ? (
              <Input name="model" onChange={handleInputChange} />
            ) : (
              <p>N/A</p>
            )}
          </div>
       
        </div>
      </Card>
    </div>
  );
};

export default MyProfile;
