import { Calls } from "./call";

export interface Attachment{
    id: number;
    name: string;
    src: string;
    call: Calls
}