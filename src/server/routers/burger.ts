import { Router } from 'express';
import { BurgerController } from '../controller';

const burgerRouter = Router();

burgerRouter.route('/')
  .get(BurgerController.getBurgers)
  .post(BurgerController.createBurger);

burgerRouter.route('/:id')
  .get(BurgerController.getBurger)
  .put(BurgerController.updateBurger)
  .delete(BurgerController.deleteBurger);

export { burgerRouter };
