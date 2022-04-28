import React from "react";
import useProduct from "../hooks/useProduct";

const PubPrivButtons = () => {
  const { searchObj, setSearchObj } =
    useProduct();

  return (
    <div>
      {searchObj.isPublic.length ? (
        <button
          onClick={() => {
            setSearchObj({ ...searchObj, isPublic: "" });
          }}
        >
          See all
        </button>
      ) : null}
      <button
        onClick={() => {
          setSearchObj({ ...searchObj, isPublic: "true" });
          console.log(searchObj.isPublic, "hello", searchObj.isPublic.length)
        }}
      >
        Public
      </button>
      <button
        onClick={() => {
          setSearchObj({ ...searchObj, isPublic: "false" });
        }}
      >
        Private
      </button>
    </div>
  );
};

export default PubPrivButtons;
