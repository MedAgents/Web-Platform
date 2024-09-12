import { cn } from "@/lib/utils";
import ChatInterface from "@/my_components/chat-interface/ChatInterface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";


export const DocLayout = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid md:auto-rows-[18rem] md:grid-cols-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DocLayoutItem = ({
  id,
  name,
  speciality,
  img,
  qualification,
  experience,
  patientsList,
}: {
  id?: string;
  name?: string;
  speciality?: string;
  img?: string;
  qualification?: string;
  experience?: string;
  patientsList?: Array<string> | any;
}) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className={cn(
        "br-black w-[13.4vw] group/bento row-span-1 flex cursor-pointer flex-col justify-between space-y-4 overflow-clip rounded-xl border border-transparent bg-white p-0 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none ",
      )}
      onClick={onOpen}
    >
      <div className="z-10 mt-0 pl-4 pt-4 font-medium text-[--fixed-bg-color]">
        {name}
      </div>
      <div className="relative -top-4 w-[20rem]">
        <img
          src={img}
          alt="doctor image"
          className="-z-10 -ml-3 -mt-16 h-[19rem] md:w-[rem]"
        />
        <div className="z-10 -mt-20 pl-4 font-sans font-bold text-[--fixed-bg-color] dark:text-neutral-200">
          {speciality}
        </div>
        <div className="z-10 pl-4 font-sans text-xs font-normal text-[--fixed-bg-color] dark:text-neutral-300">
          {qualification}
        </div>
        <div className="z-10 pl-4 font-sans text-xs font-normal text-[--fixed-bg-color] dark:text-neutral-300">
          {experience}yrs Experience
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" closeButton={<button className="sn-close-button  ml-auto mr-4 ">✖</button>}>
      
        <ModalContent>
          {(onClose) => (
            <>
              <ChatInterface name={name} img={img} />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
