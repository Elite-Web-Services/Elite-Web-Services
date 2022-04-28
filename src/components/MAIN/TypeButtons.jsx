import React from "react";
import useProduct from "../hooks/useProduct";

const TypeButtons = () => {
  const { types, searchObj, setSearchObj, params, setSearchParams } =
    useProduct();

  return (
    <div style={{display: "flex",  justifyContent: "space-evenly"}}>
      {searchObj.type ? (
        <button
          onClick={() => {
            setSearchObj({ ...searchObj, type: "" });
            params.set("type", "");
            setSearchParams(params);
          }}
        >
          See all
        </button>
      ) : null}

      {/* Map out the type buttons */}
      {types ? (
        <div id="typeList" style={{justifyContent: "space-evenly"}}>
          {types.map((type, index) => {
            return (
              <button style={{margin: "2rem"}}
                key={`typeList: ${index}`}
                onClick={() => {
                  setSearchObj({ ...searchObj, type: type.name });
                  params.set("type", type.name);
                  setSearchParams(params);
                }}
              >
                {type.name}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TypeButtons;
