import React, { useEffect, useRef, useState } from "react";
import "./ListUser.css";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getAPI } from "../../configs/api";

function ListUser(args) {
  const fakeData = [
    {
      name: "user1",
      fullName: "user1",
      email: "user1@gmail.com",
      password: "Trung@123",
      role: "SUPERADMIN",
      id: 0,
    },
    {
      name: "user2",
      fullName: "user2",
      email: "user2@gmail.com",
      password: "Trung@123",
      role: "ADMIN",
      id: 1,
    },
    {
      name: "user3",
      fullName: "user3",
      email: "user3@gmail.com",
      password: "Trung@123",
      role: "CLIENT",
      id: 2,
    },
  ];

  const RoleUser = localStorage.getItem("role");
  const dataUser = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [Data, setData] = useState(fakeData);
  const [proFileUser, setProFileUser] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const name = useRef();
  const fullName = useRef();
  const email = useRef();
  const password = useRef();

  // useEffect(() => {
  //   async function ListUserData() {
  //     try {
  //       const response = await getAPI("");
  //       const data = response.data;
  //       setData(data);
  //     } catch (error) {
  //       console.error(">>err :", error);
  //     }
  //   }
  //   ListUserData();
  // }, []);

  const toggle = () => {
    setModal(!modal);
  };

  function handleOpenEdit(a, role) {
    toggle();
    const infor = Data.find((i) => i.id === a);
    setProFileUser(infor);
    setSelectedRole(role);
  }

  function handleSave() {
    const updatedUser = {
      name: name.current.value,
      fullName: fullName.current.value,
      email: email.current.value,
      password: password.current.value,
      role: selectedRole,
    };
    const updatedData = Data.map((item) => {
      if (item.id === proFileUser.id) {
        return { ...item, ...updatedUser };
      }
      return item;
    });
    setData(updatedData);
    toggle();
    toast.success("Done");
  }

  function handleDelete(){
    console.log(1);
  }

  const handleCancel = () => {
    toggle();
  };

  function handleSaveClient() {
    const updatedUser = {
      name: name.current.value,
      fullName: fullName.current.value,
      email: email.current.value,
    };
    const updatedData = Data.map((item) => {
      if (item.id === dataUser.id) {
        return { ...item, ...updatedUser };
      }
      return item;
    });
    setData(updatedData);
    toast.success("Done");
  }

  return (
    <div>
      <>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Edit</ModalHeader>
          <ModalBody>
            <div>
              <div className="Form-edit">
                <table>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input defaultValue={proFileUser?.name} ref={name} />
                    </td>
                  </tr>
                  <tr>
                    <td>Full name</td>
                    <td>
                      <input
                        defaultValue={proFileUser?.fullName}
                        ref={fullName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <input defaultValue={proFileUser?.email} ref={email} />
                    </td>
                  </tr>
                  <tr
                    className={`${
                      RoleUser === "SUPERADMIN" ? "canUpdate" : "cantUpdate"
                    }`}
                  >
                    <td>Password</td>
                    <td>
                      <input
                        defaultValue={proFileUser?.password}
                        ref={password}
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${
                      RoleUser === "SUPERADMIN" ? "canUpdate" : "cantUpdate"
                    }`}
                  >
                    <td>Role</td>
                    <td>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="SUPER ADMIN">SUPER ADMIN</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="CLIENT">CLIENT</option>
                      </select>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {(RoleUser === "SUPERADMIN" || RoleUser === "ADMIN") && (
          <>
            <h1>List User</h1>
            <Table hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              {Data.map((item, index) => {
                return (
                  <tbody className="table-body">
                    <tr>
                      <th>{item.name}</th>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          onClick={() => handleOpenEdit(item?.id, item?.role)}
                          className="btn-open"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        {RoleUser === "SUPERADMIN" && (
                          <button className="btn-open" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faDeleteLeft} />
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </>
        )}
        {RoleUser === "CLIENT" && (
          <div>
            <p>Profile {`${dataUser.name}`}</p>
            <div className="profile-client">
              <table>
                <tr>
                  <td>Name</td>
                  <td>
                    <input defaultValue={dataUser?.name} ref={name} />
                  </td>
                </tr>
                <tr>
                  <td>Full name</td>
                  <td>
                    <input defaultValue={dataUser?.fullName} ref={fullName} />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input defaultValue={dataUser?.email} ref={email} />
                  </td>
                </tr>
              </table>
            </div>
            <button onClick={handleSaveClient} className="btn-save">
              Save
            </button>
          </div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    </div>
  );
}

export default ListUser;
