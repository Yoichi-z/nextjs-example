import { Message } from "ai/react";
import { atom } from "recoil";

export const counterAtom = atom<Message[]>({
    key :'counterAtom',
    default:[]
})