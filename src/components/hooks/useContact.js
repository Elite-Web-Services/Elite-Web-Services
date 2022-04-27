import { ContactContext } from "../context/ContactContext";
import { useContext } from "react";

const useContact = () => {
  const {
    contact,
    setContact,
    firstName,
    setFirstName,
    lastName,
    setLastName,
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
    country,
    setCountry,
  } = useContext(ContactContext);

  return {
    contact,
    setContact,
    firstName,
    setFirstName,
    lastName,
    setLastName,
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
    country,
    setCountry,
  };
};

export default useContact;
