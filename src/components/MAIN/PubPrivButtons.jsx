import React from "react";
import useProduct from "../hooks/useProduct";

const PubPrivButtons = () => {
  const { types, searchObj, setSearchObj, params, setSearchParams } =
    useProduct();

  return (
    <div>
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
        <div id="typeList">
          {types.map((type, index) => {
            return (
              <button
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

export default PubPrivButtons;
