import { HttpResponse } from "../_ports/http";

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
});

export const noContent = (): HttpResponse => ({
  statusCode: 204
});

export const badRequest = (data: any): HttpResponse => ({
  statusCode: 400,
  body: data
});

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: data
});

export const unprocessableEntity = (data: any): HttpResponse => ({
  statusCode: 422,
  body: data
});

export const serverError = (data: any): HttpResponse => ({
  statusCode: 500,
  body: data
});