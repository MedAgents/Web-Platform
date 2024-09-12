import { cn } from "@/lib/utils";
// import ChatInterface from "@/my_components/chat-interface/ChatInterface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";


export const ReportLayout = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto gap-3 grid md:auto-rows-[14rem] md:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};


export const ReportLayoutItem = ({
  id,
  previewImgLink,
  reportName,
  reportDate,
  location,
  reportPDFLink,
}: {
  id?: string;
  previewImgLink?: string;
  reportName?: string;
  reportDate?: string;
  location?: string;
  reportPDFLink?: string;
}) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
return (
    <div
        className={cn(
            "group/bento w-[21vw] row-span-1 flex cursor-pointer flex-col justify-between space-y-4 overflow-clip rounded-xl border border-transparent bg-[--fixed-bg-color] p-0",
        )}
        onClick={() => window.open(reportPDFLink, '_blank')}
    >
        <div className="z-10 mt-0 pl-4 pt-4 font-medium text-white">
            {reportName}
        </div>
        <div className="relative -top-5 w-[30vw]">
            <img
                src={previewImgLink}
                alt=""
                className="-z-10 -ml-3 -mt-16 h-[16rem] md:w-[rem]"
            />
            <div className="z-10 -mt-20 pl-4 font-sans font-bold text-[--fixed-bg-color] dark:text-neutral-200">
                {reportDate}
            </div>
            <div className="z-10 pl-4 font-sans text-xs font-bold text-[--fixed-bg-color] dark:text-neutral-300 ">
                {location}
            </div>
        </div>
    </div>
);
};
