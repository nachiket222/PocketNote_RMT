import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const Sidebar = (props) => {
  const pocketNotes = JSON.parse(localStorage.getItem("pocketNotes")) || [];

  const getInitials = (text) => {
    const words = text.split(" ");
    const firstInitial = words[0][0].toUpperCase();
    const lastInitial = words[words.length - 1][0].toUpperCase();
    return firstInitial + lastInitial;
  };

  return (
    <>
      <div className="flex flex-col h-[100vh] w-[100%] overflow-y-auto">
        <div className="sticky top-0 bg-white p-14 text-4xl font-mono font-semibold">Pocket Notes</div>
        <div>
          {pocketNotes.map((note, index) => (
            <div key={index} className={`py-4 flex h-auto items-center pl-6 cursor-pointer ${props.selected == note.name ? "bg-[#2F2F2F2B]" : ""} rounded-r-2xl`} onClick={() => props.selectFunction(note.name)}>
              <div className={`bg-[${note.color}] p-5 rounded-full text-xl text-white font-semibold mr-4`}>
                {getInitials(note.name)}
              </div>
              <h1 className="text-3xl font-medium font-mono">{note.name}</h1>
            </div>
          ))}
          <div className="fixed bottom-4 right-4 md:left-40 lg:left-64 xl:left-80 left flex items-center">
            <button className="bg-[#16008B] text-white text-4xl py-3 px-4 rounded-full" onClick={props.modal}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
