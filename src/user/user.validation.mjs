import { body, validationResult } from 'express-validator';

const validateUserCreation = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('country').notEmpty().withMessage('Country is required'),
  body('listUsername').notEmpty().withMessage('listUsername is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export default validateUserCreation;
