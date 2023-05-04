import { task } from "./task";

export type userProps = {
    name: string;
    email: string;
    password: string;
    tasks: Array<task>;
};
