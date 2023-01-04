import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (event) => {
    setIsOpen(true);
  };
  const closeModal = (event) => {
    setIsOpen(false);
  };

  return [isOpen, openModal, closeModal];
};

export default useModal;
