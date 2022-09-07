import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FormInput, Card, FormButton, Form } from "../component";
import {Link} from 'react-router-dom'
import { Heading,Heading2, Paragraph, Select, Option, Label } from "../styling/css";
import axios from "axios";
import swal from "sweetalert";

type UserManagementProps = {};

const BASEURL = process.env.REACT_APP_BASEURL
const UserManagement: FC = (props: UserManagementProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    stack: "",
    squad: "",
    password: "1234",
  });

  const [stacks, setStacks] = useState([]);

  const [errMsg, setErrMsg] = useState<string>("");
  const [errMsgColor, setErrMsgColor] = useState<string>("");
  const [errBorderColor, setErrBorderColor] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      formData.firstName === "" ||
      errMsgColor === "" ||
      errBorderColor === ""
    ) {
      setErrMsgColor("#FF0000");
      setErrBorderColor("#FF0000");
      setErrMsg("First name cannot be empty");
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`${BASEURL}/admin/view_all_stack`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        setStacks(data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASEURL}/admin/create_decadev`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (result?.data) {
        swal(
          "Success",
          result.data.data.firstName +
            " " +
            result.data.data.lastName +
            " " +
            result.data.message,
          "success"
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          stack: "",
          squad: "",
          password: "1234",
        });
      }
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong", "error");
    }
  };

  return (
    <div style={{ width: '73rem', marginBottom: '5rem'}}>
      <Heading2>
        Create user
        <div>
          <Link
            to="/admin-dashboard/view-all-users"
            style={{
              fontSize: "calc(2rem - 18px)",

              fontWeight: "300",

              backgroundColor: "white",

              borderRadius: "5px",

              border: "1px solid #249800",

              textDecoration: "none",

              color: "#249800",

              padding: "0.5rem 0.5rem",
            }}
          >
            View all users
          </Link>
        </div>
      </Heading2>

      <Card>
        <div>
          <Paragraph>Fill in all required details.</Paragraph>
        </div>

        <div style={{ padding: "2rem 2.5rem" }}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormInput
              label="First Name"
              type="text"
              value={formData.firstName}
              name="firstName"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              errBorderColor={`${errBorderColor}`}
            />
            <FormInput
              label="Last Name"
              type="text"
              value={formData.lastName}
              name="lastName"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              errBorderColor={`${errBorderColor}`}
            />
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              errBorderColor={`${errBorderColor}`}
            />
            <FormInput
              label="Squad"
              type="text"
              value={formData.squad}
              name="squad"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              errBorderColor={`${errBorderColor}`}
            /> 
            {/* <FormInput
                label="Stack"
                type="text"
                value={formData.squad}
                name="stack"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
                errBorderColor={`${errBorderColor}`}
              /> */}
            <Label>Stack</Label>
            <Select name="stack" onChange={handleBlur}>
              <option value=""></option>
              {
                stacks.length > 0 &&
                  stacks.map((e: any) => (
                    <option key={e._id} value={e.name}>
                      {e.name}
                    </option>
                  ))

                
              }
            </Select>
            <FormButton text="Create User" />
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
