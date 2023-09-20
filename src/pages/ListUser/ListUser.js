import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteAPI, getAPI, postAPI, postAPItoken } from "../../configs/api";
import { setUser } from "../../reducer/userProfile";

function ListUser(args) {
  const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const RoleUser = localStorage.getItem("roleUser");
  const nameClient = localStorage.getItem("nameClient");
  const fullNameClient = localStorage.getItem("fullNameClient");
  const emailClient = localStorage.getItem("emailClient");
  const idClient = localStorage.getItem("idClient");

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [Data, setData] = useState([]);
  const [proFileUser, setProFileUser] = useState();
  const [roleTitle, setRoleTitle] = useState([]);
  const [selectedRole, setSelectedRole] = useState(proFileUser?.role);
  const [count, setCount] = useState(0);
  const name = useRef();
  const fullName = useRef();
  const email = useRef();
  const next = useNavigate();
  const dispatch = useDispatch();
  const roleData = [];

  const roleEnum = [
    { id: 3, roleName: "ROLE_SUPERADMIN" },
    { id: 2, roleName: "ROLE_ADMIN" },
    { id: 3, roleName: "ROLE_CLIENT" },
  ];

  useEffect(() => {
    if (RoleUser === "ROLE_SUPERADMIN" || RoleUser === "ROLE_ADMIN") {
      async function ListUserData() {
        try {
          const response = await getAPI("http://localhost:8080/user/auth/all");
          const data = response.data.data;
          if (RoleUser === "ROLE_ADMIN") {
            const dataUser = data.filter((i) => i.role !== "ROLE_SUPERADMIN");
            setData(dataUser);
          } else {
            setData(data);
          }
        } catch (error) {
          console.error(">>err :", error);
        }
      }
      ListUserData();
    }
  }, [RoleUser, count]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      // style={{ position: 'absolute', top: '150px', right: '15px' }}
      onClick={toggleDelete}
    >
      &times;
    </button>
  );

  function handleOpenEdit(a, role) {
    toggle();
    const infor = Data.find((i) => i.id === a);


    
    setProFileUser(infor);
    setSelectedRole(role);
  }
  useEffect(() => {
    for (let index = 0; index < roleEnum.length; index++) {
      if (selectedRole !== roleEnum[index].roleName) {
        roleData.push(roleEnum[index]);
      }
    }
    setRoleTitle(roleData);
  }, [selectedRole])

  function handleOpenDelete(itemID) {
    toggleDelete();
    const infor = Data.find((i) => i.id === itemID);
    setProFileUser(infor);
  }

  const handleSave = async (id) => {
    try {
      if (name.current.value === "") {
        toast.error("tên không được để trống.");
      } else if (fullName.current.value === "") {
        toast.error("tên đầy đủ không được để trống.");
      } else if (email.current.value === "") {
        toast.error("email không được để trống.");
      } else if (!regexEmail.test(email.current.value)) {
        toast.error("không đúng định dạng email.");
      }

      await postAPItoken(`http://localhost:8080/user/auth/updateAll/${id}`, {
        userName: name.current.value,
        fullName: fullName.current.value,
        email: email.current.value,
        role: selectedRole,
      })
        .then((res) => {
          toast.success("Cập nhật thành công");
          setCount(count + 1);
          toggle();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  function handleDelete() {
    getAPI(`http://localhost:8080/user/auth/delete/${proFileUser?.id}`)
      .then((res) => {
        toast.success("Xóa thành công ");
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    toggleDelete();
  }

  const handleCancel = () => {
    toggle();
  };

  const handleSaveClient = async (id) => {
    try {
      if (name.current.value === "") {
        toast.error("tên không được để trống.");
      }
      if (fullName.current.value === "") {
        toast.error("tên đầy đủ không được để trống.");
      }
      if (email.current.value === "") {
        toast.error("email không được để trống.");
      }
      postAPItoken(`http://localhost:8080/user/auth/update/${id}`, {
        userName: name.current.value,
        fullName: fullName.current.value,
        email: email.current.value,
      })
        .then((res) => {
          localStorage.setItem("nameClient", name.current.value);
          localStorage.setItem("nameClient", fullName.current.value);
          localStorage.setItem("nameClient", email.current.value);
          toast.success("thay đổi thành công. ");
          handleLogout();
        })
        .catch((err) => {
          toast.error("thay đổi thất bại. ");
          console.log(err);
        });
    } catch (error) {
      toast.error("thay đổi thất bại. ");
    }
  };

  function handleLogout() {
    localStorage.clear();
    next("/Login");
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
                      <input defaultValue={proFileUser?.nameUser} ref={name} />
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
                      <input
                        type="email"
                        defaultValue={proFileUser?.email}
                        ref={email}
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${
                      RoleUser === "ROLE_SUPERADMIN"
                        ? "canUpdate"
                        : "cantUpdate"
                    }`}
                  >
                    <td>Role</td>
                    <td>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="selectRole"
                      >
                        <option value={`${selectedRole}`}>
                          {selectedRole}
                        </option>
                        {roleTitle.map((item, index) => {
                          return (
                            <option value={`${item?.roleName}`} key={index}>
                              {item?.roleName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleSave(proFileUser?.id)}>
              Save
            </Button>
            <Button color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <div>
          <Modal
            isOpen={modalDelete}
            toggle={toggleDelete}
            className="delete-box"
          >
            <ModalHeader toggle={toggleDelete} external={externalCloseBtn}>
              Xóa User {`${proFileUser?.userName}`}
            </ModalHeader>
            <ModalBody>Bạn chắc chắn muốn xóa user ?</ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={handleDelete}>
                Delete
              </Button>{" "}
              <Button color="secondary" onClick={toggleDelete}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

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
                  <tbody key={index} className="table-body">
                    <tr>
                      <th>{item.nameUser}</th>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          onClick={() => handleOpenEdit(item?.id, item?.role)}
                          className="btn-open"
                          // className={`${
                          //   // RoleUser === "ROLE_SUPERADMIN"
                          //   idRole > item?.idRole
                          //     ? "btn-open"
                          //     : "cantUpdate"
                          // }`}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        {RoleUser === "ROLE_SUPERADMIN" && (
                          <button
                            className="btn-open"
                            onClick={() => handleOpenDelete(item?.id)}
                          >
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
          <div className="client-box">
            <p>Profile {`${nameClient}`}</p>
            <div className="profile-client">
              <table>
                <tr>
                  <td>Name</td>
                  <td>
                    <input defaultValue={nameClient} ref={name} />
                  </td>
                </tr>
                <tr>
                  <td>Full name</td>
                  <td>
                    <input defaultValue={fullNameClient} ref={fullName} />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input defaultValue={emailClient} ref={email} />
                  </td>
                </tr>
              </table>
            </div>
            <button
              onClick={() => handleSaveClient(idClient)}
              className="btn-save"
            >
              Save
            </button>
          </div>
        )}
        <button onClick={handleLogout} className="btn-logOut">
          {" "}
          Log out
        </button>
        <ToastContainer
          position="top-right"
          autoClose={3000}
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
