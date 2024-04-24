import React, { useState } from "react";
import Sidebar from "./sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Right = () => {
    const [selected, setSelected] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [notes, setNotes] = useState([])
    const [divInnerText, setDivInnerText] = useState('');


    const handleDivChange = (event) => {
      setDivInnerText(event.target.innerText);
    };
    const selectNote = (name) => {
        setSelected(name);
        const pocketNotes = JSON.parse(localStorage.getItem("pocketNotes")) || [];
        const existingNoteIndex = pocketNotes.findIndex((note) => note.name === name);
        console.log(pocketNotes[existingNoteIndex], existingNoteIndex)
        setNotes(pocketNotes[existingNoteIndex])
        if (window.matchMedia("(max-width: 768px)").matches) {
            let sidebar = document.getElementById("left");
            sidebar.classList.add("hidden");
            let right = document.getElementById("right");
            right.classList.add("w-[100vw]");
            right.classList.remove("w-[0vw]")
        }
    }
    const handleGoBack = () =>{
        let sidebar = document.getElementById("left");
            sidebar.classList.remove("hidden");
            let right = document.getElementById("right");
            right.classList.remove("w-[100vw]");
            right.classList.add("w-[0vw]");
            setSelected("");
    }
    const initialNames= (name)=>{
        const words = name.trim().split(/\s+/);
        const firstInitial = words[0][0] || '';
        const lastInitial = words[words.length - 1][0] || '';
        return firstInitial.toUpperCase() + lastInitial.toUpperCase();
    }
    const handleClickOutside = (event) => {
        if (!event.target.closest('.main_modal_div')) {
            setIsModalVisible(false);
        }
    }
    const openModal = () => {
        setIsModalVisible(true);
    }

    const handleCreateNotes = () => {
        if (!groupName || !selectedColor) {
            console.error("Group name and color are required.");
            return;
        }
        const newGroup = {
            name: groupName,
            color: selectedColor,
            notes: []
        };
        if (localStorage.getItem("pocketNotes")) {
            let existingNotes = JSON.parse(localStorage.getItem("pocketNotes"));
            existingNotes.push(newGroup);
            localStorage.setItem("pocketNotes", JSON.stringify(existingNotes));
        } else {
            localStorage.setItem("pocketNotes", JSON.stringify([newGroup]));
        }

        setIsModalVisible(false)
    };

    const handleAddNote = () => {
        const currentNotes = document.getElementById("currentNotes").innerText;
        if (currentNotes === "Enter your text here......") {
            document.getElementById("currentNotes").innerText = "Enter your text here......";
            console.error("Please enter valid notes.");
            return;
        }
        const pocketNotes = JSON.parse(localStorage.getItem("pocketNotes")) || [];
        const existingNoteIndex = pocketNotes.findIndex((note) => note.name === selected);
        const textData = {
            text: currentNotes,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
        };
        pocketNotes[existingNoteIndex].notes.push(textData);
        setNotes((notes) => {
            const updatedNotes = [...notes.notes];
            updatedNotes.push(textData);
            return { ...notes, notes: updatedNotes };
        });
        localStorage.setItem('pocketNotes', JSON.stringify(pocketNotes));
        document.getElementById("currentNotes").innerText = "Enter your text here......";
    }

    return (
        <>
            <div className={`bg-[#2F2F2FBF] h-screen w-screen fixed top-0 flex z-50 justify-center items-center ${isModalVisible ? '' : 'hidden'}`} onClick={handleClickOutside}>
                <div className="bg-white shadow rounded-lg p-8 main_modal_div">
                    <h2 className="font-mono font-semibold text-2xl my-4">Create New Group</h2>
                    <div className="flex font-mono font-semibold text-md md:text-2xl my-4">
                        <h3 className="mr-8">Group Name</h3>
                        <input
                            type="text"
                            name="grp_name"
                            id="grp_name"
                            value={groupName}
                            className="border border-[#CCCCCC] rounded-2xl text-base pl-2"
                            placeholder="Enter group name"
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <div className="flex my-4">
                        <h3 className="font-mono font-semibold text-md md:text-2xl mr-8">Choose colour</h3>
                        <div className="flex w-60 md:w-72 justify-between">
                            <div className={`bg-[#B38BFA] w-7 h-7 md:p-4 rounded-full cursor-pointer ${selectedColor == "#B38BFA" ? "border-black border-2" : ""}`} onClick={() => setSelectedColor('#B38BFA')}></div>
                            <div className={`bg-[#FF79F2] w-7 h-7 md:p-4 rounded-full cursor-pointer ${selectedColor == "#FF79F2" ? "border-black border-2" : ""}`} onClick={() => setSelectedColor('#FF79F2')}></div>
                            <div className={`bg-[#43E6FC] w-7 h-7 md:p-4 rounded-full cursor-pointer ${selectedColor == "#43E6FC" ? "border-black border-2" : ""}`} onClick={() => setSelectedColor('#43E6FC')}></div>
                            <div className={`bg-[#F19576] w-7 h-7 md:p-4 rounded-full cursor-pointer ${selectedColor == "#F19576" ? "border-black border-2" : ""}`} onClick={() => setSelectedColor('#F19576')}></div>
                            <div className={`bg-[#0047FF] w-7 h-7 md:p-4 rounded-full cursor-pointer ${selectedColor == "#0047FF" ? "border-black border-2" : ""}`} onClick={() => setSelectedColor('#0047FF')}></div>
                            <div className={`bg-[#6691FF] w-7 h-7 md:p-4 rounded-full cursor-pointer ${selectedColor == "#6691FF" ? "border-black border-2" : ""}`} onClick={() => setSelectedColor('#6691FF')}></div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button className=" bg-[#001F8B] text-white flex justify-center items-center w-36 rounded-2xl h-8" onClick={handleCreateNotes}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-[100vw] h-[100vh] md:w-[29vw] overflow-hidden" id="left">
                    <Sidebar modal={openModal} selected={selected} selectFunction={selectNote} />
                </div>
                <div className=" w-[0vw] bg-[#DAE5F5] md:w-[71vw]" id="right">
                    {selected == "" ?
                        <><div className="default_main flex-col justify-center items-center h-[100vh] hidden md:flex">
                            <img src="src\components\main_bg.png" alt="main bg" />
                            <h1 className=" text-3xl font-bold font-mono ">Pocket Notes</h1>
                            <p className=" font-medium font-mono mt-2" >Send and receive messages without keeping your phone online.</p>
                            <p className="font-mono font-medium">Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                        </div></>
                        : <>  <div className="notes_main">
                            <div className="overflow-hidden">
                                <div className=" py-4 flex h-[12vh] items-center pl-6 cursor-pointer bg-[#001F8B]">
                                    <button className="text-white mx-4 text-3xl md:hidden" onClick={handleGoBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
                                    <div className={`bg-[${notes.color}] p-5 rounded-full text-xl text-white font-semibold mr-4`}>{initialNames(notes.name)}</div>
                                    <h1 className=" text-3xl font-medium font-mono text-white">{selected}</h1>
                                </div>
                                <div className="h-[68vh] overflow-y-auto">
                                    <div className="overflow-y-hidden">
                                        {notes.notes.map((note, index) => (
                                            <div className="bg-white m-6 px-4 py-6 font-sans font-medium rounded-lg shadow" key={index}>
                                                {note.text}
                                                <div className="flex justify-end mt-6">
                                                    {note.date} <span className="mx-4 text-4xl mt-[-2vh] font-semibold">.</span> {note.time}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div className=" bg-[#001F8B] h-[20vh] flex justify-center items-center rounded-bl-2xl">
                                    <div
                                        className="bg-white h-[16vh] w-[95%] rounded-lg shadow shadow-[#CCCCCC] p-3 text-xl text-gray-500 font-mono overflow-auto" id="currentNotes"
                                        contentEditable
                                        onClick={(e) => {
                                            if (e.target.innerText === 'Enter your text here......') {
                                                e.target.innerText = '';
                                                e.target.classList.remove('text-gray-500');
                                                e.target.classList.add('text-black');
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (e.target.innerText === '') {
                                                e.target.innerText = 'Enter your text here......';
                                                e.target.classList.remove('text-black');
                                                e.target.classList.add('text-gray-500');
                                            }
                                        }}
                                        onInput={handleDivChange}
                                    >
                                        Enter your text here......
                                    </div>
                                    <button disabled={divInnerText == 'Enter your text here......'} className={`bg-white text-black absolute bottom-5 right-10 text-3xl`} onClick={handleAddNote}><FontAwesomeIcon icon={faPaperPlane} /></button>
                                </div>
                            </div>
                        </div></>}


                </div>
            </div>
        </>
    );
};

export default Right;
