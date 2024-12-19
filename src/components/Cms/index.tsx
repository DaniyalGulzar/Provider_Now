"use client";
import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import Button from "../Button";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { fetchData } from "next-auth/client/_utils";

interface CmsProps {
  title: string;
}

const Cms: React.FC<CmsProps> = ({ title }) => {
  const [editorContent, setEditorContent] = useState("");
  const [modalType, setModalType] = useState<string | null>(null);
  const { data: session }: any = useSession();
  const [selectedRow, setSelectedRow] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const [rows, setRows] = useState<
    Array<{ id: number; title: string; content: string }>
  >([]);

  const handleCloseModal = () => setModalType(null);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      try {
        const token = session.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/cms-page/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.result);
        const mappedRows = response.data.result.map(
          (item: { id: number; title: string; content: string }) => ({
            id: item.id,
            title: item.title,
            content: item.content,
          })
        );
        setRows(mappedRows);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = session.token;
      if (selectedRow) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/cms-page/update/${selectedRow.id}`,
          { content: editorContent },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEditorContent("");
        handleCloseModal();
        fetchData;
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (row: any) => {
    console.log(row);
    setSelectedRow(row);
    setModalType("edit");
  };
  return (
    <>
      <div
        className={`xl:mx-8 lg:mx-8 md:mx-8 mx-3 p-4 bg-white rounded-lg mt-5 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex items-center justify-between flex-col md:flex-row mb-2">
          <h2 className="text-center text-xl lg:text-2xl md:text-2xl sm:text-left">
            {title}
          </h2>
        </div>
        <hr className="border-gray-300" />
        <div className="space-y-4">
          {rows && rows.length > 0 ? (
            rows.map((row, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-center p-2 border-b border-gray-200"
              >
                <span className="text-black-700 font-semibold pl-3">
                  {row.title}
                </span>
                <div className="my-3 sm:mt-0">
                  <Button
                    onClick={() => handleEditClick(row)}
                    className="bg-[#631681] border border-[#631681] text-white font-semibold px-6 py-2 rounded-md w-full mx-auto md:w-50"
                  >
                    <FaEdit />
                    &nbsp;Edit
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
      {modalType === "edit" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-[90%] md:w-[80%] lg:w-[60%] shadow-lg">
            <h2 className="flex justify-center item-center text-3xl font-bold mb-4">
              Edit - {selectedRow?.title}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <SunEditor
                  height="300px"
                  setOptions={{
                    buttonList: [
                      ["bold", "underline", "italic"],
                      ["font", "fontSize", "formatBlock"],
                      ["align", "list", "lineHeight"],
                      ["table", "link", "image"],
                    ],
                  }}
                  setContents={selectedRow?.content} // Display the content in SunEditor
                  onChange={handleEditorChange}
                  placeholder="Write your content here..."
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  className="border border-[#751A9B] text-[#751A9B] font-medium h-[40px] rounded-md w-full md:w-[128px]"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#751A9B] text-white font-medium h-[40px]  rounded-md w-full md:w-[128px]"
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cms;
