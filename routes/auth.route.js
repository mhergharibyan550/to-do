const { Router } = require("express");
const router = Router();
const User = require("../models/User");

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");

router.post(
  "/registration",
  [
    check("email", "Incorrect email!").isEmail(),
    check("password", "Incorrect password!").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration!",
        });
      }

      const { email, password } = req.body;

      const isUsed = await User.findOne({ email });

      if (isUsed) {
        return res
          .status(300)
          .json({ message: "The email address is already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "Registered successfully!" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Incorrect email!").isEmail(),
    check("password", "Incorrect password!").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration!",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "The user doesn't exist." });
      }

      const isPasswordMatch = bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      const jwtSecret = "uyg2y83i2783y9dh239hf39un9un3fh34uhf9u3";

      const token = jwtToken.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.json({
        token,
        userId: user.id,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
