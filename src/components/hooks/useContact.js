import { ContactContext } from "../context/ContactContext";
import { useContext } from "react";

const useContact = () => {
  const {
    contact,
    setContact,
    newEmail,
    setNewEmail,
    newAddress,
    setNewAddress,
    newAddress2,
    setNewAddress2,
    newCity,
    setNewCity,
    newState,
    setNewState,
    newZip,
    setNewZip,
    addContact,
  } = useContext(ContactContext);

  return {
    contact,
    setContact,
    newEmail,
    setNewEmail,
    newAddress,
    setNewAddress,
    newAddress2,
    setNewAddress2,
    newCity,
    setNewCity,
    newState,
    setNewState,
    newZip,
    setNewZip,
    addContact,
  };
};

export default useContact;
