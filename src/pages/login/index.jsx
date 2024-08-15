import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// ---------------------
import { useState } from "react";

export default function index() {
  const rootRef = React.useRef(null);
  // --------------------------
  const [userName, setUserName] = useState("");
  return (
    <>
      <div>
        {/* <h2 className="text-center text-semibold text-[32px]">Login</h2>
        <form className="flex flex-col">
          <label className="text-[18px] " htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </form> */}
        <Box
          sx={{
            height: "100vh",
            flexGrow: 1,
            minWidth: 300,
            transform: "translateZ(0)",
            "@media all and (-ms-high-contrast: none)": {
              display: "none",
            },
          }}
          ref={rootRef}
        >
          <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            sx={{
              display: "flex",
              p: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            container={() => rootRef.current}
          >
            <Box
              sx={{
                position: "relative",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: (theme) => theme.shadows[5],
                p: 4,
              }}
            >
              <Typography id="server-modal-title" variant="h6" component="h2">
                Server-side modal
              </Typography>
              <Typography id="server-modal-description" sx={{ pt: 2 }}>
                If you disable JavaScript, you will still see me.
              </Typography>
            </Box>
          </Modal>
        </Box>
      </div>
    </>
  );
}
