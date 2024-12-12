"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { log } from "console";
interface IProp {
  showModalDelete: boolean;
  setShowModalDelete: (value: boolean) => void;
  idDelete: number | null;
}

function DeleteModal(props: IProp) {
  const { showModalDelete, setShowModalDelete, idDelete } = props;

  const handleSubmit = async () => {
    if(!idDelete) {
      toast.error("loi");
      return;
    }
    try {
      const rawResponse = await fetch(
        `http://localhost:8000/blogs/${idDelete}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const result = await rawResponse.json();
      if (result) {
        mutate("http://localhost:8000/blogs");
        toast.success("Delete a blog success! ");
        setShowModalDelete(false);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog.");
    }
  };

  const handleCloseModel = () => {
    setShowModalDelete(false);
  };

  return (
    <>
      <Modal
        show={showModalDelete}
        onHide={handleCloseModel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to delete this blog id({idDelete}) ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModel}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleSubmit();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
