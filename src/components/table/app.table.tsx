"use client";

import CreateModel from "@/components/modal/create.modal";
import DeleteModal from "@/components/modal/delete.modal";
import UpdateModel from "@/components/modal/update.modal";
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

interface IProps {
  blogs: IBlog[];
}
export default function TableContent(props: IProps) {
  const { blogs } = props;

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number | null>(null);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <h3>Table blogs</h3>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModalCreate(true);
          }}
        >
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((item: IBlog) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link href={`/blogs/${item.id}`} className="btn btn-primary">
                    View
                  </Link>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      setShowModalUpdate(true);
                      setBlog(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowModalDelete(true);
                      setIdDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModel
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModel
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      />
      <DeleteModal
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        idDelete={idDelete}
      />
    </>
  );
}
