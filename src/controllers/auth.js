const { User } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.regitrasi = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const data = req.body;

    const schema = joi.object({
      Email: joi.string().email().min(6).required(),
      Password: joi.string().required(),
      Name: joi.string().min(3).required(),
      Phone_number: joi.string().min(8).required(),
    });

    const { error } = await schema.validate(req.body);

    if (error) {
      return res.send({
        status: "Registration Failed",
        message: error.details[0].message,
      });
    }

    const registeredUser = await User.findOne({
      where: {
        Email,
      },
    });

    if (registeredUser) {
      return res.send({
        status: "Failed",
        message: "Email Already Registered",
      });
    }

    const hashStrenght = 10;
    const hashedPassword = await bcrypt.hash(Password, hashStrenght);

    const dataUser = await User.create({
      ...data,
      Password: hashedPassword,
    });

    const secretKey = "myCustomPassword";
    const token = jwt.sign(
      {
        id: dataUser.id,
      },
      secretKey
    );

    res.send({
      status: "Success",
      data: {
        User: {
          Email: dataUser.Email,
          Name: dataUser.Name,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const schema = joi.object({
      Email: joi.string().email().required(),
      Password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const registeredUser = await User.findOne({
      where: {
        Email,
      },
    });

    if (!registeredUser) {
      return res.send({
        status: "Login Failed",
        message: "Email and Password don't match",
      });
    }

    const isValidPassword = await bcrypt.compare(
      Password,
      registeredUser.Password
    );

    if (!isValidPassword) {
      return res.send({
        status: "Login Failed",
        message: "Email and Password don't match",
      });
    }

    const secretKey = "myCustomPassword";

    const token = jwt.sign(
      {
        id: registeredUser.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      data: {
        user: {
          id: registeredUser.id,
          Name: registeredUser.Name,
          Email: registeredUser.Email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
