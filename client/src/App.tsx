import { useState } from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import {
  Box,
  Sheet,
  Typography,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Avatar,
} from "@mui/joy";
import StudentsTable from "./components/StudentsTable";
import TeachersTable from "./components/TeachersTable";
import MarksTable from "./components/MarksTable";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: { 500: "#6366f1" },
        background: { body: "#0f1117", surface: "#1a1d2e" },
      },
    },
  },
  typography: {
    h1: { fontSize: "2rem", fontWeight: 800 },
    h3: { fontSize: "1.25rem", fontWeight: 700 },
  },
});

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.body", p: 3 }}>
        {/* Header */}
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "xl",
            p: 3,
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #1a1d2e 0%, #16213e 100%)",
            borderColor: "rgba(99,102,241,0.3)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              size="lg"
              sx={{ bgcolor: "primary.500", fontSize: "1.5rem" }}
            >
              🎓
            </Avatar>
            <Box>
              <Typography level="h1" sx={{ color: "white", lineHeight: 1 }}>
                School Manager
              </Typography>
              <Typography
                level="body-sm"
                sx={{ color: "rgba(255,255,255,0.5)" }}
              >
                Gestion des étudiants, professeurs et notes
              </Typography>
            </Box>
          </Box>
        </Sheet>

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v as number)}>
          <TabList
            sx={{ mb: 3, borderRadius: "lg", bgcolor: "background.surface" }}
          >
            <Tab>Étudiants</Tab>
            <Tab>Professeurs</Tab>
            <Tab>Notes</Tab>
          </TabList>

          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "xl",
              p: 3,
              borderColor: "rgba(99,102,241,0.2)",
            }}
          >
            <TabPanel value={0}>
              <StudentsTable />
            </TabPanel>
            <TabPanel value={1}>
              <TeachersTable />
            </TabPanel>
            <TabPanel value={2}>
              <MarksTable />
            </TabPanel>
          </Sheet>
        </Tabs>
      </Box>
    </CssVarsProvider>
  );
}
