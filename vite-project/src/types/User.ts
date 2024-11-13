import { areaEnum } from "./areaEnum"
import { organizasionsEnum } from "./organizasionEnum"

export interface IUser {
    _id?:string
    username: string
    password:string
    organizasion:organizasionsEnum
    area?:areaEnum
}

export interface LoginDTO{
    username: string
    password:string
}