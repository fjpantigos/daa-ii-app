export interface StudentInterface {
    uid: string;
    documentNumber: string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    photo?: string | null;
    active: number;
}
