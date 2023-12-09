import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Container,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlinePlus, AiOutlineFilePdf } from "react-icons/ai";
import { useAuth } from "../auth/auth";
import Navbar from "../header/header";
import LargeWithNewsletter from "../footer/footer";
import Hero from "../hero/hero";
import Widget from "../widget/widget";
import axios from "axios";

export default function Home() {
  const [cardStates, setCardStates] = useState(Array(15).fill(false))
  const { isOpen, onToggle } = useDisclosure();
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedPertemuan, setSelectedPertemuan] = useState("");
  const MySwal = withReactContent(Swal);
  const { isLoggedIn } = useAuth();
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlank, setIsBlank] = useState(true);

  const link = [
    "https://docs.google.com/document/d/1cIC1J7DlbGch_r89Nx16wuIL-DBxEXP8/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
    "https://docs.google.com/document/d/13iQek4d0a6ty1imxViHGMozkuohhsRMS/edit?usp=drive_link&ouid=107526812749782252832&rtpof=true&sd=true",
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
    'https://drive.google.com/drive/folders/16XYydxcDXnYm9Op35JNMiUXpKKB_6p7X'
  ];

  const [pertemuanStatus, setPertemuanStatus] = useState({
    "Tugas pertemuan 1": "Finished",
    "Tugas pertemuan 2": "Finished",
    "Tugas pertemuan 3": "Finished",
    "Tugas pertemuan 4": "Finished",
    "Tugas pertemuan 5": "Finished",
    "Tugas pertemuan 6": "Finished",
    "Tugas pertemuan 7": "Finished",
    "Tugas pertemuan 8": "Finished",
    "Tugas pertemuan 9": "Finished",
    "Tugas pertemuan 10": "Finished",
    "Tugas pertemuan 11": "Finished",
    "Tugas pertemuan 12": "Finished",
    "Batch (1-12)": "Finished",
  });

  const handleSelectChange = (value, index) => {
    const selectedPertemuanTitle = pertemuan[index];
    const selectedPertemuanIndex = pertemuan.indexOf(value);
    if (selectedPertemuanIndex !== -1) {
      const newCardStates = [...cardStates];
      newCardStates[selectedPertemuanIndex] = true;
      setCardStates(newCardStates);
    }
  };

  useEffect(() => {
    const storedPertemuanStatus = localStorage.getItem("pertemuanStatus");
    if (storedPertemuanStatus) {
      setPertemuanStatus(JSON.parse(storedPertemuanStatus));
    }
  }, []);

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("Pilih file terlebih dahulu");
        alert("Pilih file terlebih dahulu");
        return;
      }

      const pertemuanUntukUpload = selectedPertemuan || "Batch (1-12)";

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", selectedFile.type);
      formData.append("pertemuan", pertemuanUntukUpload);

      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:28181/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server Response:", response.data);

      setIsLoading(false);

      const updatedData = [...data];
      updatedData.push({
        index: updatedData.length,
        file: selectedFile,
        title: selectedPertemuan || "Batch (1-12)",
        pertemuan: pertemuanUntukUpload,
        filename: response.data.file.filename,
        downloadUrl: response.data.downloadUrl,
      });
      setData(updatedData);

      console.log(
        `Card ${updatedData.length - 1} updated with file: ${selectedFile.name}`
      );

      // Perbarui status pertemuan setelah mengunggah file
      setPertemuanStatus((prevStatus) => ({
        ...prevStatus,
        [selectedPertemuan || "Batch (1-12)"]: "Finished",
      }));

      MySwal.fire({
        icon: "success",
        title: "Upload Berhasil",
        text: "File berhasil diunggah.",
      });

      // Simpan data yang diperbarui ke penyimpanan lokal
      localStorage.setItem("pertemuanStatus", JSON.stringify(pertemuanStatus));
      localStorage.setItem("uploadedData", JSON.stringify(updatedData));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      MySwal.fire({
        icon: "error",
        title: "Upload Gagal",
        text: "Terjadi kesalahan saat mengunggah file.",
      });
    }
  };

  const handleDownload = (downloadUrl, fileName, title) => {
    if (downloadUrl) {
      axios
        .get(downloadUrl, { responseType: "blob" })
        .then((response) => {
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);

          // Simpan perubahan status ke dalam penyimpanan lokal
          localStorage.setItem("pertemuanStatus", JSON.stringify(pertemuanStatus));
        })
        .catch((error) => {
          console.error("Error downloading file", error);
          alert("Error downloading file.");
        });
    } else {
      console.error("Download URL not found for this item.");
    }
  };

  const openModal = (index) => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCardClick = (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
  };

  const showLoginAlert = () => {
    MySwal.fire({
      icon: "error",
      title: "Akses ditolak",
      text: "Hanya Admin yang dapat memposting tugas / login terlebih dahulu.",
    });
  };

  const pertemuan = [
    "Tugas pertemuan 1",
    "Tugas pertemuan 2",
    "Tugas pertemuan 3",
    "Tugas pertemuan 4",
    "Tugas pertemuan 5",
    "Tugas pertemuan 6",
    "Tugas pertemuan 7",
    "Tugas pertemuan 8",
    "Tugas pertemuan 9",
    "Tugas pertemuan 10",
    "Tugas pertemuan 11",
    "Tugas pertemuan 12",
    "Tugas pertemuan 13",
    "Tugas pertemuan 14",
    "Batch (1-14)",
  ];

  return (
    <React.Fragment>
      <div className="home relative   max-h-screen w-full  h-full bg-white mx-0 my-0 ">
        <div className="w-full h-full">
          <Navbar />
          <main className="h-full w-full">
          <div className="component overflow-hidden block relative h-auto">

              <Hero />
              <Box w={"full"} h={"auto"} px={5} mt={4} py={5}>
                <div className="w-full">
                  <SimpleGrid
                    spacing={4}
                    templateColumns="repeat(auto-fill, minmax(200px, 1fr)"
                  >
                    {pertemuan.map((title, index) => (
                      <React.Fragment key={index}>
                        <Card
                          onClick={() => handleCardClick(index)}
                          className="card mb-3"
                        >
                          <CardHeader
                            w={"full"}
                            h={"auto"}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Heading className="txt" size="md">
                              {title}
                            </Heading>
                            <Box
                              display={"flex"}
                              bg={
                                pertemuanStatus[title] === "Finished"
                                  ? "green.300"
                                  : "green.300"
                              }
                              className="rounded"
                              w={"16"}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Text fontSize={"sm"} color={"whiteAlpha.800"}>
                                {pertemuanStatus[title] === "Finished"
                                  ? "Finished"
                                  : "Finished"}
                              </Text>
                            </Box>
                          </CardHeader>
                          <CardBody>
                            <Text>
                              Tugas ini melibatkan pengiriman materi tugas dalam
                              format PDF.
                            </Text>
                          </CardBody>
                          <CardFooter>
                            <Button onClick={() => onToggle()}>Lihat</Button>
                          </CardFooter>
                        </Card>
                        {cardStates[index] && (
                          <>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              w="full"
                              h={{ md: "full" }}
                              color="white"
                              mt="4"
                              bg="teal.500"
                              rounded="md"
                              shadow="md"
                              className="px-4 py-6 mb-3 w-full"
                            >
                              <span>Download :</span>
                              <Box display="flex">
                                <div className="pdf w-8 h-8  mr-4 hover:rounded-md hover:bg-teal-700">
                                  <a className="flex items-center justify-center w-full h-full"
                                    href={link[index]} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <AiOutlineFilePdf />
                                  </a>
                                  <div className="tooltip">Pdf</div>
                                </div>
                              </Box>
                            </Box>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </SimpleGrid>
                </div>
              </Box>
              <Box className="addTask bottom-24 right-5 fixed w-14 h-14 bg-white border z-60 rounded-full">
                <div className="flex items-center justify-center h-full">
                  <button onClick={!isLoggedIn ? showLoginAlert : openModal}>
                    <AiOutlinePlus />
                  </button>
                </div>
              </Box>
              <Box h={"full "}>
                <Modal isOpen={ModalOpen} onClose={closeModal}>
                  <ModalOverlay />
                  <ModalContent
                    position="modal"
                    roundedBottom="none"
                    roundedTop="2xl"
                    h="full"
                    isCentered
                    className="w-full fixed"
                  >
                    <Container h={" full"} w={"full"}>
                      <ModalBody
                        h="full"
                        position="relative"
                        w={"full"}
                        display="flex"
                        flexDir="column"
                      >
                        <ModalHeader
                          textAlign="start"
                          position="relative"
                          px={0}
                          mb={6}
                          justifyContent="space-between"
                          w={"full"}
                          h={"20"}
                          alignItems="center"
                          display="flex"
                          mt={3}
                        >
                          <span>Unggah file</span>
                          <ModalCloseButton />
                        </ModalHeader>
                        <FormControl isRequired>
                          <FormLabel>Pilih Pertemuan</FormLabel>
                          <Select disabled
                            placeholder="Pilih Pertemuan"
                            onChange={(e) => {
                              const index = pertemuan.indexOf(e.target.value);
                              setSelectedPertemuan(e.target.value);
                              setSelectedTitle(e.target.options[index].text);
                              handleSelectChange(e.target.value, index);
                            }}
                            value={selectedPertemuan}
                            className="h-full"
                          >
                            {pertemuan.map((title, index) => (
                              <option
                              
                                className="mt-4 px-3 py-3"
                                key={index}
                                value={title}
                                disabled
                              >
                                {title}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl mt={4} mb={4} isRequired>
                          <Box className="">
                            <FormLabel>Pilih File</FormLabel>
                            <Input disabled
                              px={1}
                              type="file"
                              py={1}
                              onChange={(e) =>
                                setSelectedFile(e.target.files[0])
                              }
                            />
                          </Box>
                        </FormControl>
                        <ModalFooter px={0}>
                          <Button colorScheme="blue" mr={3} onClick={closeModal}>
                            Tutup
                          </Button>
                          <Button
                            colorScheme="teal"
                            onClick={handleUpload}
                            disabled={!selectedFile || isLoading}
                          >
                            {isLoading ? "Mengunggah..." : "Unggah"}
                          </Button>
                        </ModalFooter>
                      </ModalBody>
                    </Container>
                  </ModalContent>
                </Modal>
              </Box>
            </div>
          </main>
          <Widget />
          <LargeWithNewsletter />
        </div>
      </div>
    </React.Fragment>
  );
}
