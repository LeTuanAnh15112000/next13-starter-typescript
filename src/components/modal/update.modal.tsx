"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { log } from "console";
interface IProp {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;

}

function UpdateModel(props: IProp) {
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog]);

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
    if (!blog) {
      toast.error("No blog selected!");
      return;
    }
    try {
      const rawResponse = await fetch(
        `http://localhost:8000/blogs/${blog.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, author, content }),
        }
      );
      const result = await rawResponse.json();
      console.log(result);
      if (result && result.title && result.author && result.content) {
        mutate("http://localhost:8000/blogs");
        toast.warning("Create news blog success! ");
        handleCloseModel();
      }
    } catch (error) {
      toast.error("An error occurred while updating the blog.");
    }
  };

  const handleCloseModel = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowModalUpdate(false);
    setBlog(null);
  };

  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={handleCloseModel}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A Blog</Modal.Title>
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

export default UpdateModel;
