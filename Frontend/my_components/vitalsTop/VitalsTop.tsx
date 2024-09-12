import React, { useEffect, useState, useRef } from "react";
import SectionDisplay from "../Individual/sectionDisplay/sectionDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setCustomized,
  setFilterStateData,
  setOptions,
  setProductData,
  setSearchString,
  setUtilityStateData,
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
import { Select, SelectItem } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
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

function VitalsTop() {
  const inputRef = useRef<HTMLInputElement>(null);
  usePreventScroll(inputRef);
  const stateCols = useSelector((state: any) => state.cart.columns);
  const [Cols, setCols] = useState<Column[]>(cols);
  const listId = useSelector((state: any) => state.sidebar.currentList);
  const dispatcher = useDispatch();
  const selectedTab = useSelector((state: any) => state.cart.customized);
  const searchValue = useSelector((state: any) => state.cart.searchString);
  const [productLink, setProductLink] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [utiltyModalIsOpen, setUtilityModalIsOpen] = useState(false);
  const [filterData, setFilterData] = useState<{ [key: string]: any }>({});
  const [utilityData, setUtilityData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  const keyInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let newCols: Column[] = [];
    stateCols.forEach((col:StateColumn) => {
      if(col.key !== "images"){
        const newCol = {
          listId: col.listId,
          colId: col.key,
          name: col.label,
          type: col.type,
          range: col.range,
          utilityVal: col.utilityVal,
        }
        newCols.push(newCol);
      }
    });
    setCols(newCols);
  }, [stateCols]);

  const handleAddField = () => {
    const newField = { key, value };

    setCustomFields((prevFields) => {
      const fieldIndex = prevFields.findIndex((field) => field.key === key);

      if (fieldIndex !== -1) {
        const updatedFields = [...prevFields];
        updatedFields[fieldIndex] = newField;
        return updatedFields.sort((a, b) => a.key.localeCompare(b.key));
      } else {
        const updatedFields = [newField, ...prevFields];
        return updatedFields.sort((a, b) => a.key.localeCompare(b.key));
      }
    });

    setKey("");
    setValue("");
    keyInputRef.current?.focus();
  };

  const handleRemoveField = (indexToRemove: number) => {
    setCustomFields((prevFields) => {
      const updatedFields = prevFields.filter(
        (_, index) => index !== indexToRemove,
      );
      return updatedFields;
    });
  };

  const getModalHeader = () => {
    if (addProductModalIsOpen) {
      return "Add Doctor By Code";
    } else if (filterModalIsOpen) {
      return "Filter products";
    } else if (utiltyModalIsOpen) {
      return "Set Utility";
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

  const handleUtilityChange = (colId: string, listId: string, value: any) => {
    setUtilityData((prevData) => ({
      ...prevData,
      [listId + "_" + colId]: value,
    }));
  };


  return (
    <div className="width-[100%] my-4 flex h-[7%] cursor-pointer items-center justify-between font-medium">
      <div className="flex gap-4">
        <SectionDisplay />
        <div className="flex items-center rounded-[10px] bg-color1">
          
        </div>
      </div>
    </div>
  );
}

export default VitalsTop;
