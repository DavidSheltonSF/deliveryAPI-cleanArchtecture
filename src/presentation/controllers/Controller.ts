import { HttpRequest, HttpResponse } from '../ports/http';

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
