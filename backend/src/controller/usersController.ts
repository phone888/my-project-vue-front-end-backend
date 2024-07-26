import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { user } from "../entity/userEntities";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(user);
    const users = await userRepository.find();
    users && res.send(users);
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(user);
    const userSingle = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!userSingle) {
      res.status(404);
      res.send({ message: "not found" });
    }

    userSingle && res.send(userSingle);
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(user);
    const checkUser = await userRepository.findOne({
      where: { username: req.body.username },
    });
    if (checkUser) return res.status(404).send("ມີຜູ້ໃຊ້ແລ້ວ");
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      req.body.password = hash;
      const newUser = await userRepository.create(req.body);
      const result = await userRepository.save(newUser);
      result && res.send("ເພີ່ມຂໍ້ມູນສໍາເລັດ");
    });
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(user);
    const checkUser = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!checkUser) return res.status(404).send("ບໍ່ພົບໄອດີຢູ່ໃນລະບົບ");
    userRepository.merge(checkUser, req.body);
    const result = await userRepository.save(checkUser);
    result && res.send("ແກ້ໄຂຜູ້ໃຊ້ສໍາເລັດ");
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(user);
    const checkUser = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!checkUser) return res.status(404).send("ບໍ່ມີໄອດີໃນລະບົບ");
    bcrypt.compare(
      req.body.password,
      checkUser.password,
      async (err, result) => {
        if (result) {
          bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
            req.body.newPassword = hash;
            const fixPassword = await userRepository
              .createQueryBuilder()
              .update(user)
              .set({ password: req.body.newPassword })
              .where("id = :id", { id: req.params.id })
              .execute();
            if (fixPassword) res.send("ອັບເດດລະຫັດສໍາເລັດ");
          });
        } else {
          return res.status(404).send("ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userRepository = await myDataSource.getRepository(user);
    const checkUser = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!checkUser) return res.send("ບໍ່ມີໄອດີ້ໃນລະົບ");
    const removeUser = await userRepository.delete(req.params.id);
    removeUser && res.send("ລົບຜູ້ໃຊ້ສໍາເລັດ");
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
};
