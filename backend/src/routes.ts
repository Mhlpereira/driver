import { Router } from "express";

export class Routes{
    const routes = Router();

    routes.use('/user', useroutes)
}