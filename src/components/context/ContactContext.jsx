import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { addContact as editContact } from "../../axios-services";

export const ContactContext = React.createContext();

const ContactProvider = ({ children }) => {
  const { user, token } = useAuth();
  const theUser = user.id;
  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newAddress, setNewAddress] = useState(user.address);
  const [newAddress2, setNewAddress2] = useState(user.address2);
  const [newCity, setNewCity] = useState(user.city);
  const [newState, setNewState] = useState(user.state);
  const [newZip, setNewZip] = useState(user.zip);
  const [country, setCountry] = useState(user.country);

  const addContact = async () => {
    console.log("ZIPZIPZIZPIZPI", newZip);
    const newContactInfo = await editContact(
      token,
      firstName,
      lastName,
      newEmail,
      theUser,
      newAddress,
      newAddress2,
      newCity,
      newState,
      newZip,
      country,
      setCountry
    );
    setContact(newContactInfo);
  };

  return (
    <ContactContext.Provider
      value={{
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
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
export default ContactProvider;
