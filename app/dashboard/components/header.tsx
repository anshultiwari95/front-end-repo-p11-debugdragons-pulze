import React from "react";
//import { Input, Button } from "../../components/button";";
import InviteIcon from "../../../icons/InviteIcon";
import HelpIcon from "../../../icons/HelpIcon";
import SearchIcon from "../../../icons/SearchIcon";

interface Props {
  headerTitle: string;
}
const Header = (props: Props) => {
  return (
    <>
      <div className="container mb-2">
        <div className="flex flex-row grow justify-around  lg:justify-between items-center py-3">
          <div className="font-bold lg:ml-4">{props.headerTitle}</div>
          <div className="search-container ">
            <div className="relative w-96 shadow-2xl shadow-slate-400"></div>
          </div>
          <div className="flex flex-row justify-between px-4">
            <div>
              <button>
                <HelpIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
