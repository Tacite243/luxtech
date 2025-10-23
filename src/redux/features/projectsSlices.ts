import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import { Project } from '@prisma/client';
import { ProjectOutputValues } from '@/components/ProjectForm';
import axios from 'axios';



// ==================================
// TYPES
// ==================================

type ProjectsState = {
    projects: Project[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

type UpdateProjectPayload = {
    id: string;
    data: Partial<ProjectOutputValues>;
};

// ==================================
// ÉTAT INITIAL
// ==================================

const initialState: ProjectsState = {
    projects: [],
    status: 'idle',
    error: null,
};

// ==================================
// THUNKS ASYNCHRONES
// ==================================

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<Project[]>('/projects');
        return response.data;
    } catch (_error) {
        return rejectWithValue('Erreur lors du chargement des projets.');
    }
});

export const createProject = createAsyncThunk('projects/createProject', async (projectData: ProjectOutputValues, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post<Project>('/projects', projectData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.error || 'Erreur lors de la création.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, data }: UpdateProjectPayload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put<Project>(`/projects/${id}`, data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response?.data?.error || 'Erreur lors de la mise à jour.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: string, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/projects/${projectId}`);
        return projectId;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response?.data?.error || 'Erreur lors de la suppression.');
        }
        return rejectWithValue('Une erreur réseau est survenue.');
    }
});

// ==================================
// SLICE
// ==================================

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
                state.projects.push(action.payload);
            })
            .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
                const index = state.projects.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
                state.projects = state.projects.filter(p => p.id !== action.payload);
            });
    },
});

export default projectsSlice.reducer;
