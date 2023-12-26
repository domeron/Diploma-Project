import { Avatar } from "@mui/material";

export default function ProfileImage({profileImagePath, userName, dimension}) {
    return (
        profileImagePath ?
        <Avatar src={`${process.env.REACT_APP_BASEURL}/${profileImagePath}`} sx={{width: dimension, height: dimension}}/>
        :
        <Avatar sx={{width: dimension, height: dimension}}>
            {userName}
        </Avatar>
    );
}