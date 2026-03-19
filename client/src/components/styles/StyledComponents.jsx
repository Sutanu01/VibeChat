import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { greyColor, matBlack } from "../../constants/color";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: #dce8fa;
  padding: 1rem;
  border-radius: 0.9rem;
  transition: background-color 0.25s ease, transform 0.25s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
    transform: translateX(2px);
  }
`;

const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  color: #e6edf7;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);

  &::placeholder {
    color: rgba(230, 237, 247, 0.52);
  }

  &:focus {
    border-color: rgba(78, 205, 196, 0.65);
    box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.2);
  }
`;

const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  color: #e6edf7;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.1rem;

  &::placeholder {
    color: rgba(230, 237, 247, 0.48);
  }
`;

const CurveButton = styled("button")`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${matBlack};
  color: #e6edf7;
  font-size: 1.1rem;
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

export {
  CurveButton,
  SearchField,
  InputBox,
  Link,
  VisuallyHiddenInput,
  BouncingSkeleton,
};