export interface StoredEquation {
    solutionSteps: object[],
    stringSolution: string,
    solvedEquationTerms: {
        constant: number,
        variable: string
    }
}

export type SaveEquation = {
    name: string,
    _id: string,
    equation: {
        string: string,
        latex: string
    }
}

export type EquationToSvae = Omit<SaveEquation, "_id">

export type EquationStep = {
    description: string,
    equation: {
        string: string,
        latex: string
    }
}

export interface SolvedEquation {
    solvedEquation: string,
    steps: EquationStep[]
}

type user = {
    email: string,
    accountType: string
}

export interface SimpleAuth {
    success: boolean
    user: user
}