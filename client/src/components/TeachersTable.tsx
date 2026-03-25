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
import { teacherService, type Teacher } from "../api/services";

export default function TeachersTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState<Teacher>({ name: "" });

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await teacherService.getAll();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  const handleSubmit = async () => {
    if (editing?.id) await teacherService.update(editing.id, form);
    else await teacherService.create(form);
    setOpen(false);
    setForm({ name: "" });
    setEditing(null);
  };

  const handleEdit = (t: Teacher) => {
    setEditing(t);
    setForm(t);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    await teacherService.delete(id);
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
          Professeurs
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
              <th>Matière</th>
              <th>Email</th>
              <th>Classe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>
                  <Chip size="sm" variant="soft">
                    {t.id}
                  </Chip>
                </td>
                <td>
                  <Typography fontWeight="md">{t.name}</Typography>
                </td>
                <td>{t.lastname}</td>
                <td>
                  <Chip size="sm" color="success" variant="soft">
                    {t.subject}
                  </Chip>
                </td>
                <td>
                  <Typography level="body-sm" color="neutral">
                    {t.email}
                  </Typography>
                </td>
                <td>
                  <Chip size="sm" color="primary" variant="soft">
                    {t.clazz}
                  </Chip>
                </td>
                <td>
                  <Stack direction="row" gap={1}>
                    <Button
                      size="sm"
                      variant="soft"
                      onClick={() => handleEdit(t)}
                    >
                      Éditer
                    </Button>
                    <Button
                      size="sm"
                      variant="soft"
                      color="danger"
                      onClick={() => handleDelete(t.id!)}
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
            {editing ? "Modifier" : "Ajouter"} un professeur
          </Typography>
          <Stack gap={2} mt={1}>
            {[
              { label: "Nom", key: "name" as keyof Teacher },
              { label: "Prénom", key: "lastname" as keyof Teacher },
              { label: "Matière", key: "subject" as keyof Teacher },
              { label: "Email", key: "email" as keyof Teacher },
              { label: "Classe", key: "clazz" as keyof Teacher },
            ].map(({ label, key }) => (
              <FormControl key={key}>
                <FormLabel>{label}</FormLabel>
                <Input
                  value={form[key] ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                />
              </FormControl>
            ))}
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
