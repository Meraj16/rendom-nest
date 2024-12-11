import { Response } from 'express';
import { Messages } from './messages'; // Import Messages

export class ResponseHandler {
  static success(res: Response, data: any, messageKey: keyof typeof Messages['SUCCESS']) {
    return res.status(200).json({ status: 200, message: Messages.SUCCESS[messageKey], data });
  }

  static created(res: Response, data: any, messageKey: keyof typeof Messages['SUCCESS']) {
    return res.status(201).json({ status: 201, message: Messages.SUCCESS[messageKey], data });
  }

  static badRequest(res: Response, messageKey: keyof typeof Messages['ERROR']) {
    return res.status(400).json({ status: 400, message: Messages.ERROR[messageKey] });
  }

  static unauthorized(res: Response, messageKey: keyof typeof Messages['ERROR']) {
    return res.status(401).json({ status: 401, message: Messages.ERROR[messageKey] });
  }

  static forbidden(res: Response, messageKey: keyof typeof Messages['ERROR']) {
    return res.status(403).json({ status: 403, message: Messages.ERROR[messageKey] });
  }

  static notFound(res: Response, messageKey: keyof typeof Messages['INFO']) {
    return res.status(404).json({ status: 404, message: Messages.INFO[messageKey] });
  }

  static internalServerError(res: Response, messageKey: keyof typeof Messages['ERROR']) {
    return res.status(500).json({ status: 500, message: Messages.ERROR[messageKey] });
  }
}
