import { ValidationError } from 'express-validator';

// Étendre le type ValidationError pour inclure les propriétés nécessaires
declare module 'express-validator' {
  interface ValidationError {
    type?: string;
    path?: string;
    param?: string;
  }
} 