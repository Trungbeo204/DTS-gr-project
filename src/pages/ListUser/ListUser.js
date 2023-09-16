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
<<<<<<< HEAD
import { useSelector } from "react-redux";
import { deleteAPI, getAPI, postAPI, postAPItoken } from "../../configs/api";
=======
import { useDispatch, useSelector } from "react-redux";
import { deleteAPI, getAPI, postAPI, postAPItoken } from "../../configs/api";
import { setUser } from "../../reducer/userProfile";
>>>>>>> e090da1fcf7ddfb42806e9f35f4b08928f62377d

function ListUser(args) {
  const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const RoleUser = localStorage.getItem("roleUser");
  const idRole = localStorage.getItem('idRole')
  const dataUser = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [Data, setData] = useState([]);
  const [proFileUser, setProFileUser] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [count, setCount] = useState(0);
  const name = useRef();
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const next = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (RoleUser === "ROLE_SUPERADMIN" || RoleUser === "ROLE_ADMIN") {
      async function ListUserData() {
        try {
          const response = await getAPI("http://localhost:8080/user/auth/all");
          console.log(2);
          const data = response.data.data;
          setData(data);
        } catch (error) {
          console.error(">>err :", error);
        }
      }
      ListUserData();
    }
  }, [RoleUser, count]);

  console.log(Data);

  const toggle = () => {
    setModal(!modal);
  };

  function handleOpenEdit(a, role) {
    toggle();
    const infor = Data.find((i) => i.id === a);
    setProFileUser(infor);
    setSelectedRole(role);
  }

  const handleSave = async (id) => {
<<<<<<< HEAD
=======
    try {
>>>>>>> e090da1fcf7ddfb42806e9f35f4b08928f62377d
      if (name.current.value === "") {
        toast.error("tên không được để trống.");
      } else if (fullName.current.value === "") {
        toast.error("tên đầy đủ không được để trống.");
      }else if (email.current.value === "") {
        toast.error("email không được để trống.");
      } else if (!regexEmail.test(email.current.value)) {
<<<<<<< HEAD
        toast.error('không đúng định dạng email.')
      }else {
          const response = await postAPItoken(`http://localhost:8080/user/auth/update/${id}`, {
              nameUser: name.current.value,
              fullName: fullName.current.value,
              email: email.current.value,
              })
        
              if (response.status === 200) {
                toast.success("Cập nhật thành công");
                setCount(count + 1);
              } else {
                const data = await response.json();
                toast.error(data.message || "Cập nhật thất bại");
              }
            }

            toggle()
          
      
=======
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
>>>>>>> e090da1fcf7ddfb42806e9f35f4b08928f62377d
  };

  function handleDelete(itemID) {
    console.log(">>itemID : ", itemID);
    deleteAPI("")
      .then((res) => {
        toast.success("Xóa thành công ");
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCancel = () => {
    toggle();
  };

<<<<<<< HEAD
  const handleSaveClient = async (id) => {
    try {  
=======
  const handleSaveClient = async () => {
    try {
>>>>>>> e090da1fcf7ddfb42806e9f35f4b08928f62377d
      if (name.current.value === "") {
        toast.error("tên không được để trống.");
      }
      if (fullName.current.value === "") {
        toast.error("tên đầy đủ không được để trống.");
      }
      if (email.current.value === "") {
        toast.error("email không được để trống.");
      }
<<<<<<< HEAD
      const response = await postAPItoken(`http://localhost:8080/user/auth/update/${id}`, {
      nameUser: name.current.value,
      fullName: fullName.current.value,
      email: email.current.value,
      // passWordUser: password.current.value,
      // role: selectedRole,
    });

    if (response.status === 200) {
      toast.success("Cập nhật thành công");
      setCount(count + 1);
    } else {
      const data = await response.json();
      toast.error(data.message || "Cập nhật thất bại");
    }

=======
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
>>>>>>> e090da1fcf7ddfb42806e9f35f4b08928f62377d
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
          <button onClick={handleLogout}> Log out</button>
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
                          // className="btn-open"
                          className={`${
                            // RoleUser === "ROLE_SUPERADMIN"
                            idRole > item?.idRole
                              ? "btn-open"
                              : "cantUpdate"
                          }`}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        {RoleUser === "ROLE_SUPERADMIN" && (
                          <button
                            className="btn-open"
                            onClick={() => handleDelete(item?.id)}
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
                    <input defaultValue={dataUser?.userName} ref={name} />
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
