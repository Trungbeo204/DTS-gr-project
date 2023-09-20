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
  const dataUser = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  // const [Data, setData] = useState([]);
  const [proFileUser, setProFileUser] = useState();
  const [selectedRole, setSelectedRole] = useState(1);
  const [count, setCount] = useState(0);
  const name = useRef();
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const next = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (RoleUser === "ROLE_SUPERADMIN" || RoleUser === "ROLE_ADMIN") {
  //     async function ListUserData() {
  //       try {
  //         const response = await getAPI("");
  //         const data = response.data;
  //         setData(data);
  //       } catch (error) {
  //         console.error(">>err :", error);
  //       }
  //     }
  //     ListUserData();
  //   }
  // }, [RoleUser, count]);
  const Data = [
    {
      userName: " trung ",
      fullName: "trungbeo",
      email: "tungbeo@gmail.com",
      role: "SUPERADMIN",
    },
  ];

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

  function handleOpenDelete(itemID) {
    toggleDelete();
    const infor = Data.find((i) => i.id === itemID);
    setProFileUser(infor);
  }
  console.log(selectedRole);

  const handleSave = async (id) => {
    try {
      if (name.current.value === "") {
        toast.error("tên không được để trống.");
      }
      if (fullName.current.value === "") {
        toast.error("tên đầy đủ không được để trống.");
      }
      if (email.current.value === "") {
        toast.error("email không được để trống.");
      } else if (!regexEmail.test(email.current.value)) {
        toast.error("không đúng định dạng email.");
      }

      await postAPItoken(`http://localhost:8080/user/auth/update/${id}`, {
        nameUser: name.current.value,
        fullName: fullName.current.value,
        email: email.current.value,
      })
        .then((res) => {
          toast.success("Cập nhật thành công");
          setCount(count + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  function handleDelete() {
    console.log(">>itemID : ", proFileUser?.id);
    deleteAPI("")
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

  const handleSaveClient = async () => {
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
      postAPI("", {
        nameUser: name.current.value,
        fullName: fullName.current.value,
        email: email.current.value,
      })
        .then((res) => {
          dispatch(setUser(res));
          toast.success("thay đổi thành công. ");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error("thay đổi thất bại. ");
    }
  };

  function handleLogout() {
    localStorage.removeItem("token");
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
                      <input defaultValue={proFileUser?.userName} ref={name} />
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
                      <input defaultValue={proFileUser?.email} ref={email} />
                    </td>
                  </tr>
                  <tr
                    className={`${
                      RoleUser === "ROLE_SUPERADMIN"
                        ? "canUpdate"
                        : "cantUpdate"
                    }`}
                  >
                    <td>Password</td>
                    <td>
                      <input
                        defaultValue={proFileUser?.passWordUser}
                        ref={password}
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
                      >
                        <option value="3">SUPER ADMIN</option>
                        <option value="2">ADMIN</option>
                        <option value="1">CLIENT</option>
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
                  <tbody className="table-body">
                    <tr>
                      <th>{item.userName}</th>
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
