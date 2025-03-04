import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

/**
 * Middleware qui vérifie les résultats de validation
 * et renvoie une erreur 400 si des erreurs sont trouvées
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Exécuter toutes les validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Vérifier s'il y a des erreurs
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Formater et renvoyer les erreurs
    const errorMessages = errors.array().map((err: any) => {
      // Créer un objet d'erreur simple
      return {
        message: err.msg
      };
    });

    return res.status(400).json({
      status: 'error',
      errors: errorMessages
    });
  };
}; 