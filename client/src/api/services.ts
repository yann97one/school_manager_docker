import { apiClient } from "./apiClient";

export interface Student {
  id?: number;
  name: string;
  lastname?: string;
  email?: string;
  clazz?: string;
  mark_id?: number;
}

export interface Teacher {
  id?: number;
  name: string;
  lastname?: string;
  subject?: string;
  email?: string;
  clazz?: string;
  student_id?: number;
}

export interface Mark {
  id?: number;
  teacher_id?: number;
  student_id?: number;
  value?: number;
}

export const studentService = {
  getAll: () => apiClient.get<Student[]>("/students/"),
  getById: (id: number) => apiClient.get<Student>(`/students/${id}`),
  create: (data: Student) => apiClient.post<Student>("/students/", data),
  update: (id: number, data: Student) =>
    apiClient.put<Student>(`/students/${id}`, data),
  delete: (id: number) => apiClient.delete(`/students/${id}`),
};

export const teacherService = {
  getAll: () => apiClient.get<Teacher[]>("/teachers/"),
  getById: (id: number) => apiClient.get<Teacher>(`/teachers/${id}`),
  create: (data: Teacher) => apiClient.post<Teacher>("/teachers/", data),
  update: (id: number, data: Teacher) =>
    apiClient.put<Teacher>(`/teachers/${id}`, data),
  delete: (id: number) => apiClient.delete(`/teachers/${id}`),
};

export const markService = {
  getAll: () => apiClient.get<Mark[]>("/marks/"),
  getById: (id: number) => apiClient.get<Mark>(`/marks/${id}`),
  getByStudent: (studentId: number) =>
    apiClient.get<Mark[]>(`/marks/student/${studentId}`),
  create: (data: Mark) => apiClient.post<Mark>("/marks/", data),
  update: (id: number, data: Mark) => apiClient.put<Mark>(`/marks/${id}`, data),
  delete: (id: number) => apiClient.delete(`/marks/${id}`),
};
