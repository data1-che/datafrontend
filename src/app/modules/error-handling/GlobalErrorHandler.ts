import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    // Aquí puedes personalizar la lógica para manejar el error
    console.error('Ocurrió un error:', error);
    // Otras acciones que desees realizar
  }
}
