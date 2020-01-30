import React, { useState, useEffect } from "react";
import "./styles.css";
import { Form, Input, Textarea } from "@rocketseat/unform";
import Modal from "react-modal";
import { FaGithub, FaExclamationCircle, FaEdit } from "react-icons/fa";
import { MdDelete, MdClear } from "react-icons/md";
import api from "../../services/api";

export default function DevItem({ dev }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDev, setDeleteDev] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      maxWidth: "420px",
      width: "100%",
      transition: "ease-in-out 2s"
    },
    overlay: {
      backgroundColor: "rgba(0,0,0, .9)"
    }
  };
  Modal.setAppElement("#root");

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }

  async function handleEdit(data) {
    const response = await api.put(`/devs/${dev._id}`, data);
  }
  async function handleDelete() {
    const response = await api.delete(`/devs/${dev._id}`);
  }

  return (
    <li className="dev-item">
      <button type="button" className="edit" onClick={openModal}>
        <FaEdit size="20" color="blue" />
      </button>
      <header>
        <div className="content">
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(", ")}</span>
          </div>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div className=" buttons">
        {" "}
        <a target="_blank" href={dev.html_url}>
          <FaGithub size={20} color="#7159c1" />
        </a>
        <button
          type="button"
          onClick={() => setDeleteDev(true)}
          className="buttonDelete"
        >
          {deleteDev === true ? (
            <button type="button" onClick={handleDelete}>
              <h4>click to confirm</h4>
              <FaExclamationCircle size={20} color="#ee4d64" />
            </button>
          ) : (
            <MdDelete size={20} color="#ee4d64" />
          )}
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel=" Modal"
      >
        <div className="modalContainer">
          <button onClick={closeModal} type="button">
            <MdClear size={20} color="red" />
          </button>
          <h2> Editar informações do dev</h2>
          <Form onSubmit={handleEdit}>
            <label htmlFor="name">NOME</label>
            <Input name="name" placeholder={dev.name} />
            <label htmlFor="bio">BIO</label>
            <Textarea name="bio" placeholder={dev.bio} cols="5" />
            <label htmlFor="techs">TECNOlOGIAS</label>
            <Input name="techs" placeholder={dev.techs.join(", ")} />
            <div className="group">
              <div className="input-group">
                <label htmlFor="latitude">LATITUDE</label>
                <Input
                  name="latitude"
                  placeholder={dev.location.coordinates[1]}
                />
              </div>
              <div className="input-group">
                <label htmlFor="longitude">LONGITUDE</label>
                <Input
                  name="longitude"
                  placeholder={dev.location.coordinates[0]}
                />
              </div>
            </div>
            <button type="submit">EDITEI</button>
          </Form>
        </div>
      </Modal>
    </li>
  );
}
