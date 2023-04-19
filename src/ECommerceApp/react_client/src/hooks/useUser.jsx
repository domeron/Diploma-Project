import { UserContext } from "../App";
import { useContext } from "react";

export default function useUser() {
    const {user, setUser} = useContext(UserContext);
    return {user, setUser}
}