import { Avatar } from "@mui/material";

export default function ProfileImage({user, dimension}) {
    return (
        user.profileImagePath ?
        <Avatar src={`https://localhost:7077/${user.profileImagePath}`} sx={{width: dimension, height: dimension}}/>
        :
        <Avatar sx={{width: dimension, height: dimension}}>
            {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
        </Avatar>
    );
}