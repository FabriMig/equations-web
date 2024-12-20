import { api } from '@/lib/api';
import { EquationToSvae, SaveEquation, SolvedEquation } from '@/types';
import { AxiosResponse } from 'axios';

type EditEquationDat = {
    equationId: string
    name: string
    equation: {
        string: string,
        latex: string
    }
}

export const solveEquation = async (equation: string): Promise<AxiosResponse<SolvedEquation>> => {
    return api.get<SolvedEquation>(`solveEquation/${encodeURIComponent(equation)}`);
}

export const saveEquation = async (equation: EquationToSvae): Promise<AxiosResponse<{ success: boolean }>> => {
    return api.post("/equation", equation);
}

export const fetchUserEquations = async (): Promise<AxiosResponse<{ success: boolean, equations: SaveEquation[] }>> => {
    return api.get(`/equation`);
}

export const deleteEquation = async (equationId: string): Promise<AxiosResponse<{ success: boolean }>> => {
    return api.delete(`/equation/${equationId}`);
}

export const editEquation = async (equation: EditEquationDat): Promise<AxiosResponse<{ success: boolean }>> => {
    return api.patch(`/equation/${equation.equationId}`, equation);
}