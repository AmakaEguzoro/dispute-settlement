export class Users{
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    is_admin: any;
    updated_at : Date | string;
    created_at?: Date;
    remember_token?: string;
    default_product?: string;
    role: number;
}