"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { log } from "console";
interface IProp {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function CreateModel(props: IProp) {
  const { showModalCreate, setShowModalCreate } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Not empty title !");
    }
    if (!author) {
      toast.error("Not empty author !");
    }
    if (!content) {
      toast.error("Not empty content !");
    }
    const rawResponse = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    });
    const result = await rawResponse.json();
    if (result && result.title && result.author && result.content) {
      mutate("http://localhost:8000/blogs");
      toast.success("Create news blog success! ");
      setShowModalCreate(false);
    }
  };

  const handleCloseModel = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowModalCreate(false);
  };

  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={handleCloseModel}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="test"
                placeholder="title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="test"
                placeholder="author..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModel}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModel;
