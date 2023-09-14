import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  // constructor(private readonly auditService: AuditService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // const { user } = req;

    // const audit = new Audit();
    // audit.user = user;
    // audit.method = req.method;
    // audit.path = req.path;
    // audit.body = req.body;
    // audit.query = req.query;
    // audit.params = req.params;

    // await this.auditService.create(audit);

    console.log(`[LOG]: ${req.method} request by ${req.ip}`);
    console.log(`[LOG]: ${req.method} request path ${req.path}`);
    console.log(
      `[LOG]: ${req.method} request headers ${JSON.stringify(
        req.headers,
        null,
        2,
      )}`,
    );

    next();
  }
}
