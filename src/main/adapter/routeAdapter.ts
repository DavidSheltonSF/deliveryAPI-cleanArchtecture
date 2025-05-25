import { Controller } from "../../presentation/controllers/Controller";
import { Request, Response } from "express";
import { HttpRequest, HttpResponse } from "../../presentation/_ports/http";

export const routeAdapter =  (controller: Controller) => {
  return async (req: Request, res: Response) => {
  
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    }
  
    const response: HttpResponse = await controller.handle(httpRequest);

    res.status(response.statusCode).json(response.body);
  }
}