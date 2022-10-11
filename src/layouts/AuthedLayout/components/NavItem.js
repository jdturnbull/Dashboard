import { Box, Button, ListItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const rootPath = location.pathname.split("/")[1];
  const rootHref = href.split("/")[1];

  const active = rootPath === rootHref;

  const handleClick = () => {
    navigate(href);
  };

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        component="a"
        onClick={handleClick}
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active && "rgba(255, 255, 255, 0.04)",
          borderRadius: 1,
          color: active ? "neutral.100" : "neutral.300",
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            background: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};

export default NavItem;
