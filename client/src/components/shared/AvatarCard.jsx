import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { transformImage } from "../../lib/features";
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.1}>
      <AvatarGroup max={max} sx={{position: "relative"}}>
        <Box width={"5rem"} height={"3rem"}></Box>
        {avatar.map((i, index) => (
          <Avatar
            key={Math.random() * 100}
            src={transformImage(i)}
            alt={`avatar ${index}`}
            sx={{ width: "3rem", height: "3rem",
              position: "absolute",
              left:{
                xs:`${index + 0.5}rem`,
                sm:`${index + 1}rem`,
              }
             }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
