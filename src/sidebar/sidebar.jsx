import React, { useState } from 'react';
import { FaLinkedin, FaHome, FaEnvelope , FaUser, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { chakra } from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Box } from "@chakra-ui/react";
import { FcHome , FcIphone } from "react-icons/fc";

export default function DrawerExample() {
  const [isTasksOpen, setIsTasksOpen] = useState(true);

  const toggleTasks = () => {
    setIsTasksOpen(!isTasksOpen);
  };

  const link = [
    "https://docs.google.com/document/d/1cIC1J7DlbGch_r89Nx16wuIL-DBxEXP8/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1KQa84ub4sFbM1D5YZxGeKYc0eREdWr2W/edit?rtpof=true",
    "https://docs.google.com/document/d/1RDHCd_flT_mCxAwRWp37ZcDKpFXyJ0-H/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1m-vnkWnHqJFqSmT6XNIMQszRHTdc3S9A/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1m-vnkWnHqJFqSmT6XNIMQszRHTdc3S9A/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1vgibc02cAuwjZ13_O_sFQFuF9Wake_j4/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/18MI5PSP_W7R4g7IfcJM45k8lCrgFsiXh/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1uouZo5s9LzZWh806AmmFUt_OdQGVJgS4/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/14EgLffNhgKZXtHikyQL0DmKaIb0vnqsq/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1rkaQ5WOKnGZ_1MUBNmMZgTe4hAUp5INw/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1L-A5QOm4muYopLdW78yuAvluMIAQ1SK2/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/1AKB177lsc0WWJKLR0U0zHzf-mL1ph64v/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/16p0UewwU3bQyewGnknmISxW-zbWZZJe3/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true", 
    'https://docs.google.com/document/d/1PDEITj1BdCQEO64LeKNYG8-dMLej4-Pf/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true' ,
  ];

  return (
    <aside
      id="separator-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 sidebar py-4 overflow-y-auto bg-white">
        <div className="flex px-2 items-center w-full h-12 mb-3">
        <Box fontWeight={"bold"}  className="ss ">
              NUGAS KUY
            </Box>
        </div>
        <ul className="space-y-2 font-medium py-2 mb-3 ">
          <li className=''>
            <a className='p-2 items-center  flex text-gray-900 rounded-lg  hover: dark:hover:bg-gray-100 group cursor-pointer' onClick={toggleTasks}>
              Daftar tugas
              <i><BiChevronDown className='ml-3'/></i>
            </a>
            {isTasksOpen && (
              <div className="tasks-container h-32 mt-4 mb-4  overflow-y-scroll">
                <TaskList links={link} />
              </div>
            )}
          </li>
        
      
         
        
          {/* Home */}
          <li>
            <chakra.div fontSize="sm" fontWeight="normal" className='flex items-center p-2 text-gray-900 rounded-lg  hover: dark:hover:bg-gray-100 group'>
              <FcHome size={24} color="#333" className='mr-4' />
              Home
            </chakra.div>
          </li>
          {/* About Me */}
          <li>
            <chakra.div fontSize="sm" fontWeight="normal" className='flex items-center p-2 text-gray-900 rounded-lg  hover: dark:hover:bg-gray-100 group'>
              <FcIphone size={24} color="#333" className='mr-4' />
              Contact Me
            </chakra.div>
          </li>
        
        </ul>
          {/* LinkedIn */}
          <ul className='space-y-2 font-medium border-t py-4 border-gray-400  mt-2'>
          <li>
            <chakra.div fontSize="sm" fontWeight="normal" className='flex items-center p-2 text-gray-900 rounded-lg  hover: dark:hover:bg-gray-100 group'>
              <FaLinkedin size={24} color="#0A66C2" className='mr-4' />
              LinkedIn
            </chakra.div>
          </li>
           {/* Instagram */}
           <li>
            <chakra.div fontSize="sm" fontWeight="normal" className='flex items-center p-2 text-gray-900 rounded-lg  hover: dark:hover:bg-gray-100 group'>
              <FaInstagram size={24} color="#833AB4" className='mr-4' />
              Instagram
            </chakra.div>
          </li>
          </ul>
      </div>
    </aside>
  );
}

const TaskList = ({ links }) => {
  const totalTasks = links.length;

  return (
    <div className="tasks-container">
      <DrawerBody>
        {links.map((link, index) => (
          <TaskItem key={index} taskNumber={index + 1} link={link} totalTasks={totalTasks} />
        ))}
      </DrawerBody>
    </div>
  );
};




const DrawerBody = ({ children }) => {
  return <div>{children}</div>;
};


const TaskItem = ({ taskNumber, link, totalTasks }) => {
  const isBatch = taskNumber === totalTasks;

  return (
    <chakra.div p={2} borderBottomWidth="1px" _last={{ borderBottomWidth: '0' }}>
     <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-normal">
          Tugas Pertemuan {taskNumber}
        </a>
    </chakra.div>
  );
};
