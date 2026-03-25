import axios from "axios";

export default function StudentsList() {
  const fetchData = async () => {
    const response = await axios.get("http://server:8000");
    console.log(response);
  };
}
