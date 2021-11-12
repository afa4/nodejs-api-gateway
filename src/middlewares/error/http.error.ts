import e from 'express';

export class HttpError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
  } 
}