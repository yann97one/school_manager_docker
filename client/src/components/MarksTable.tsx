import { useEffect, useState } from "react";
import {
  Sheet,
  Table,
  Typography,
  Button,
  Modal,
  ModalDialog,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Chip,
  Box,
} from "@mui/joy";
import { markService, type Mark } from "../api/services";

export default function MarksTable() {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Mark | null>(null);
  const [form, setForm] = useState<Mark>({});

  const load = async () => setMarks(await markService.getAll());
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async () => {
    if (editing?.id) await markService.update(editing.id, form);
    else await markService.create(form);
    setOpen(false);
    setForm({});
    setEditing(null);
    load();
  };

  const handleEdit = (m: Mark) => {
    setEditing(m);
    setForm(m);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    await markService.delete(id);
    load();
  };

  const getColor = (value?: number) => {
    if (!value) return "neutral";
    if (value >= 14) return "success";
    if (value >= 10) return "warning";
    return "danger";
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography level="h3" sx={{ fontWeight: 700 }}>
          Notes
        </Typography>
        <Button
          onClick={() => {
            setEditing(null);
            setForm({});
            setOpen(true);
          }}
          sx={{ borderRadius: "xl" }}
        >
          + Ajouter
        </Button>
      </Box>

      <Sheet variant="outlined" sx={{ borderRadius: "lg", overflow: "auto" }}>
        <Table hoverRow stickyHeader>
          <thead>
            <tr>
              <th>ID</th>
              <th>Étudiant ID</th>
              <th>Professeur ID</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.id}>
                <td>
                  <Chip size="sm" variant="soft">
                    {m.id}
                  </Chip>
                </td>
                <td>
                  <Chip size="sm" color="primary" variant="soft">
                    #{m.student_id}
                  </Chip>
                </td>
                <td>
                  <Chip size="sm" color="success" variant="soft">
                    #{m.teacher_id}
                  </Chip>
                </td>
                <td>
                  <Chip size="sm" color={getColor(m.value)} variant="solid">
                    {m.value}/20
                  </Chip>
                </td>
                <td>
                  <Stack direction="row" gap={1}>
                    <Button
                      size="sm"
                      variant="soft"
                      onClick={() => handleEdit(m)}
                    >
                      Éditer
                    </Button>
                    <Button
                      size="sm"
                      variant="soft"
                      color="danger"
                      onClick={() => handleDelete(m.id!)}
                    >
                      Supprimer
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ minWidth: 400 }}>
          <Typography level="h4">
            {editing ? "Modifier" : "Ajouter"} une note
          </Typography>
          <Stack gap={2} mt={1}>
            <FormControl>
              <FormLabel>ID Étudiant</FormLabel>
              <Input
                type="number"
                value={form.student_id ?? ""}
                onChange={(e) =>
                  setForm({ ...form, student_id: Number(e.target.value) })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>ID Professeur</FormLabel>
              <Input
                type="number"
                value={form.teacher_id ?? ""}
                onChange={(e) =>
                  setForm({ ...form, teacher_id: Number(e.target.value) })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Note (/20)</FormLabel>
              <Input
                type="number"
                slotProps={{ input: { min: 0, max: 20 } }}
                value={form.value ?? ""}
                onChange={(e) =>
                  setForm({ ...form, value: Number(e.target.value) })
                }
              />
            </FormControl>
            <Stack direction="row" gap={1} justifyContent="flex-end">
              <Button variant="plain" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSubmit}>
                {editing ? "Modifier" : "Créer"}
              </Button>
            </Stack>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
}
