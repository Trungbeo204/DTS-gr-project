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
import { deleteAPI, getAPI, postAPI } from "../../configs/api";

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

  const RoleUser = localStorage.getItem("roleUser");
  const dataUser = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [Data, setData] = useState([]);
  const [proFileUser, setProFileUser] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const name = useRef();
  const fullName = useRef();
  const email = useRef();
  const password = useRef();

  useEffect(() => {
    async function ListUserData() {
      try {
        const response = await getAPI("");
        const data = response.data;
        setData(data);
      } catch (error) {
        console.error(">>err :", error);
      }
    }
    ListUserData();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  function handleOpenEdit(a, role) {
    toggle();
    const infor = Data.find((i) => i.id === a);
    setProFileUser(infor);
    setSelectedRole(role);
  }

  const handleSave = async () => {
    // const updatedUser = {
    //   name: name.current.value,
    //   fullName: fullName.current.value,
    //   email: email.current.value,
    //   password: password.current.value,
    //   role: selectedRole,
    // };
    // const updatedData = Data.map((item) => {
    //   if (item.id === proFileUser.id) {
    //     return { ...item, ...updatedUser };
    //   }
    //   return item;
    // });
    // setData(updatedData);
    // toggle();
    // toast.success("Done");
    try {
      if (name.current.value !== "") {
        toast.error("tên không được để trống.");
      }
      if (fullName.current.value !== "") {
        toast.error("tên đầy đủ không được để trống.");
      }
      if (email.current.value !== "") {
        toast.error("email không được để trống.");
      }
      if (password.current.value !== "") {
        toast.error("password không được để trống.");
      }
      await postAPI("", {
        userName: name.current.value,
        fullName: fullName.current.value,
        email: email.current.value,
        passwordUser: password.current.value,
        role: selectedRole,
      })
        .then((res) => {
          toast.success("Cập nhật thành công");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  function handleDelete() {
    deleteAPI("")
      .then((res) => {
        toast.success("Xóa thành công ");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCancel = () => {
    toggle();
  };

  const  handleSaveClient = async () => {
    // const updatedUser = {
    //   name: name.current.value,
    //   fullName: fullName.current.value,
    //   email: email.current.value,
    // };
    // const updatedData = Data.map((item) => {
    //   if (item.id === dataUser.id) {
    //     return { ...item, ...updatedUser };
    //   }
    //   return item;
    // });
    // setData(updatedData);
    // toast.success("Done");
    try {
      if (name.current.value !== "") {
        toast.error("tên không được để trống.");
      }
      if (fullName.current.value !== "") {
        toast.error("tên đầy đủ không được để trống.");
      }
      if (email.current.value !== "") {
        toast.error("email không được để trống.");
      }
      postAPI("", {
        nameUser: name.current.value,
        fullName: fullName.current.value,
        email: email.current.value,
      })
        .then((res) => {
          toast.success("thay đổi thành công. ");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error('thay đổi thất bại. ')
    }
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
                      RoleUser === "ROLE_SUPERADMIN" ? "canUpdate" : "cantUpdate"
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
                      RoleUser === "ROLE_SUPERADMIN" ? "canUpdate" : "cantUpdate"
                    }`}
                  >
                    <td>Role</td>
                    <td>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="ROLE_SUPERADMIN">SUPER ADMIN</option>
                        <option value="ROLE_ADMIN">ADMIN</option>
                        <option value="ROLE_CLIENT">CLIENT</option>
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
        {(RoleUser === "ROLE_SUPERADMIN" || RoleUser === "ROLE_ADMIN") && (
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
                        {RoleUser === "ROLE_SUPERADMIN" && (
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
        {RoleUser === "ROLE_CLIENT" && (
          <div>
            <p>Profile {`${dataUser?.name}`}</p>
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
