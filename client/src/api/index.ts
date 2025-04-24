import axios from "axios";
import { type User } from "../store/authContext";

export const fetchUser = async () => {
  try {
    const response = await axios.get<User>("/api/current_user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
