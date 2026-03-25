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
import { studentService, type Student } from "../api/services";

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<Student>({ name: "" });

  const load = async () => setStudents(await studentService.getAll());

  const fetchStudents = async () => {
    try {
      const response = await studentService.getAll();
      setStudents(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (editing?.id) {
      await studentService.update(editing.id, form);
    } else {
      await studentService.create(form);
    }
    setOpen(false);
    setForm({ name: "" });
    setEditing(null);
    load();
  };

  const handleEdit = (s: Student) => {
    setEditing(s);
    setForm(s);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await studentService.delete(id);
    load();
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
          Étudiants
        </Typography>
        <Button
          onClick={() => {
            setEditing(null);
            setForm({ name: "" });
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
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Classe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>
                  <Chip size="sm" variant="soft">
                    {s.id}
                  </Chip>
                </td>
                <td>
                  <Typography fontWeight="md">{s.name}</Typography>
                </td>
                <td>{s.lastname}</td>
                <td>
                  <Typography level="body-sm" color="neutral">
                    {s.email}
                  </Typography>
                </td>
                <td>
                  <Chip size="sm" color="primary" variant="soft">
                    {s.clazz}
                  </Chip>
                </td>
                <td>
                  <Stack direction="row" gap={1}>
                    <Button
                      size="sm"
                      variant="soft"
                      onClick={() => handleEdit(s)}
                    >
                      Éditer
                    </Button>
                    <Button
                      size="sm"
                      variant="soft"
                      color="danger"
                      onClick={() => handleDelete(s.id!)}
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
            {editing ? "Modifier" : "Ajouter"} un étudiant
          </Typography>
          <Stack gap={2} mt={1}>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Prénom</FormLabel>
              <Input
                value={form.lastname ?? ""}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Classe</FormLabel>
              <Input
                value={form.clazz ?? ""}
                onChange={(e) => setForm({ ...form, clazz: e.target.value })}
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
