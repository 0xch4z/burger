import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Burger } from '../entity';

export class BurgerController {

  private static get repository() {
    return getManager().getRepository(Burger);
  }

  public static async createBurger(req: Request, res: Response) {
    const { burgerName, isDevoured } = req.body;

    if (typeof burgerName === 'undefined') {
      return res.send(401).end();
    }

    const burger = BurgerController.repository.create({
      burgerName,
      isDevoured: Boolean(isDevoured),
    });

    await BurgerController.repository.save(burger);

    res.status(201).json({ newBurger: burger });
  }

  public static async getBurgers(_, res: Response) {
    const burgers = await BurgerController.repository.find();
    res.json(burgers);
  }

  public static async getBurger(req: Request, res: Response) {
    const { id } = req.params;
    const burger = await BurgerController.repository.findOneById(id);

    return burger ? res.json(burger) : res.status(404).end();
  }

  public static async updateBurger(req: Request, res: Response) {
    const { id } = req.params;
    const burger = await BurgerController.repository.findOneById(id);

    if (!burger) return res.status(404).end();

    const { burgerName, isDevoured } = req.body;
    
    if (typeof burgerName !== 'undefined') {
      burger.burgerName = burgerName;
    }
    if (typeof isDevoured !== 'undefined') {
      burger.isDevoured = isDevoured;
    }

    await BurgerController.repository.save(burger);

    res.status(200).json({ updatedBurger: burger })
  }

  public static async deleteBurger(req: Request, res: Response) {
    const { id } = req.params;
    const burger = await BurgerController.repository.findOneById(id);
    
    if (!burger) return res.status(404).end();

    await BurgerController.repository.delete(burger);

    res.status(200).json(burger);
  }

}
