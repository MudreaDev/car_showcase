import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handlecClick?: MouseEventHandler<HTMLButtonElement>;
}