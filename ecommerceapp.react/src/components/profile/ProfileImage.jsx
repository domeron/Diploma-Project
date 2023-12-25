import { Avatar } from "@mui/material";
import { useEffect } from "react";

export default function ProfileImage({profileImagePath, userName, dimension}) {
    return (
        profileImagePath ?
        <Avatar src={`https://localhost:7077/${profileImagePath}`} sx={{width: dimension, height: dimension}}/>
        :
        <Avatar sx={{width: dimension, height: dimension}}>
            {userName}
        </Avatar>
    );
}