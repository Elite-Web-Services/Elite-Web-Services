import React from "react";
import useProduct from "../hooks/useProduct";

const TypeButtons = () => {
  const { types, searchObj, setSearchObj, params, setSearchParams } =
    useProduct();

  return (
    <div>
      {types ? (
        <div id="typeList" style={{ display: "flex", justifyContent: "space-between" }}>
          {searchObj.type ? (
            <button
            style={{ flexGrow: "1"}}
              onClick={() => {
                setSearchObj({ ...searchObj, type: "" });
                params.set("type", "");
                setSearchParams(params);
              }}
            >
              See All
            </button>
          ) : null}
          {types.map((type, index) => {
            return (
              <button
              style={{ flexGrow: "1"}}
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
