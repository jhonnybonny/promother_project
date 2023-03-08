import express from 'express';
import imsiExceptionController from '../imsi-exception/imsi-exception.controller';

export const imsiExceptionRoute = express.Router()

imsiExceptionRoute.get('', imsiExceptionController.getExceptions)
imsiExceptionRoute.post('', imsiExceptionController.addException)
imsiExceptionRoute.delete('/:imsi', imsiExceptionController.removeException)

export default imsiExceptionRoute