import { HttpRequest, HttpResponse } from "../_ports/http";

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}