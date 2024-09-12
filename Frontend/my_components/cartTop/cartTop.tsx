import React, { useEffect, useState, useRef } from "react";
import SectionDisplay from "../Individual/sectionDisplay/sectionDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setOptions,
  setProductData,
  setSearchString,
} from "@/RTK/features/cart";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import axios from "@/utils/axios";
import { BACKEND_URI, RENDER_BACKEND_URI } from "@/CONSTANTS";
import { ToastErrors, ToastInfo } from "@/Helpers/toastError";
import { CircularProgress } from "@nextui-org/react";
import usePreventScroll from '@/Helpers/stopScrollingInput';

interface CustomField {
  key: string;
  value: string;
}

interface Column {
  listId: string;
  colId: string;
  name: string;
  type: "string" | "number";
  utilityVal: number;
  range: Array<{
    value: string|number;
    utility: number;
  }>;
}

interface StateColumn {
  key: string;
  label: string;
  listId: string;
  type: "string" | "number";
  utilityVal: number;
  range: Array<{
    value: string|number;
    utility: number;
  }>;
}

const cols: Column[] = [
  {
    listId: "watch",
    colId: "price",
    name: "Price",
    type: "number",
    range: [{value: 400, utility: 0}, {value: 5000, utility: 0}],
    utilityVal: 0,
  },
];

function CartTop() {
  const inputRef = useRef<HTMLInputElement>(null);
  usePreventScroll(inputRef);
  const listId = useSelector((state: any) => state.sidebar.currentList);
  const dispatcher = useDispatch();
  const searchValue = useSelector((state: any) => state.cart.searchString);
  const [productLink, setProductLink] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const [filterData, setFilterData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  const keyInputRef = useRef<HTMLInputElement>(null);

  const getModalHeader = () => {
    if (addProductModalIsOpen) {
      return "Add Doctor By Code";
    }
  };

  const handleFilterChange = (colId: string, listId: string, value: any) => {
    console.log("value", value);
    if(value.from || value.to){
      setFilterData((prevData) => ({
        ...prevData,
        [listId + "_" + colId]: value,
      }));
    }
    else{
      setFilterData((prevData) => ({
        ...prevData,
        [listId + "_" + colId]: [...value],
      }));
    }
    console.log(filterData);
  };

  return (
    <div className="width-[100%] my-4 flex h-[7%] cursor-pointer items-center justify-between font-medium">
      <div className="flex gap-4">
        <SectionDisplay />
      </div>
      <div className="flex h-[7vh] items-end gap-2">
        <Input
          ref={inputRef}
          isClearable
          radius="sm"
          placeholder="Search Doctors"
          startContent={
            <div>
              <img src="../icons/search.png" className="w-[15px]" alt="logo" />
            </div>
          }
          value={searchValue}
          onChange={(e) => dispatcher(setSearchString(e.target.value))}
        />
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondaryColor"
            onClick={() => {
              onOpen();
              setAddProductModalIsOpen(true);
            }}
          >
            <img src="../icons/additionH.png" className="w-[15px]" alt="logo" />
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center justify-center gap-1 font-medium">
                  {getModalHeader()}
                </ModalHeader>
                <ModalBody>
                  {(loading && (
                    <div className="flex h-full w-full items-center justify-center">
                      <CircularProgress aria-label="Loading..." color="danger" />
                    </div>
                  )) || (
                    <>
                      {addProductModalIsOpen && (
                        <>
                          <Input
                            ref={inputRef}
                            isClearable
                            radius="sm"
                            placeholder="Enter Unique Code"
                            startContent={
                              <div>
                                <img
                                  src="../icons/web.png"
                                  className="w-[15px]"
                                  alt="logo"
                                />
                              </div>
                            }
                            value={productLink}
                            onChange={(e) => setProductLink(e.target.value)}
                          />
                        </>
                      )}
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  {addProductModalIsOpen && (
                    <>
                      <Button
                        className="mx-auto bg-primaryColor text-white"
                        variant="flat"
                        onPress={async () => {
                          try {
                            setLoading(true);
                            const addProductRes = await axios.post(
                              RENDER_BACKEND_URI + "/list/addProductToList",
                              {
                                listId: listId,
                                productLink: productLink,
                                customFields: customFields,
                              },
                            );
                            setCustomFields([]);
                            setKey("");
                            setValue("");
                            setProductLink("");
                            ToastInfo("Doctor added succussfully");
                            const loadCart = async () => {
                              const cartRes = await axios.post(`${BACKEND_URI}/list/getListData`, {
                                listId: listId,
                              });
                              if (cartRes.data.statusCode !== 200) {
                                return;
                              }
                              dispatcher(setProductData(cartRes.data.data.products));
                              dispatcher(setColumns(cartRes.data.data.columns));
                              dispatcher(setOptions(cartRes.data.data.options));
                            };
                            if(listId && listId!=""){
                              loadCart();
                            }
                            onClose();
                          } catch (e) {
                            ToastErrors("Add Doctor Failed");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Add Doctor
                      </Button>
                    </>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default CartTop;
