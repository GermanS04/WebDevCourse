const { API_ROUTES, JWT_ENV, CLIENT_ENV, EMAIL_ENV } = require("../constants");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

router.use("/", (req, res, next) => {
  next();
});

async function encrypt(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

async function validate(inputPassword, hashedPassword) {
  const valid = await bcrypt.compare(inputPassword, hashedPassword);

  return valid;
}

router.post(API_ROUTES.USERS.SIGN_UP, async (req, res) => {
  const { name, password, email, birth } = req.body;

  const hashedPassword = await encrypt(password);

  const newUser = await db.query(
    `INSERT INTO "Users" (user_name, user_email, user_password, user_birth)
        VALUES ($1, $2, $3, $4)`,
    [name, email, hashedPassword, birth]
  );

  res.json(newUser);
});

router.post(API_ROUTES.USERS.SIGN_IN, async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    `SELECT * FROM "Users" 
        WHERE "user_email" = $1`,
    [email]
  );

  const user = result.rows[0];

  const isValidPassword = await validate(password, user.user_password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ user_id: user.user_id }, JWT_ENV.SECRET, {
    expiresIn: JWT_ENV.TIME,
  });

  res.json({ message: "Success", token: token });
});

router.post(API_ROUTES.USERS.FORGOT_PASS, async (req, res) => {
  const { email } = req.body;

  const result = await db.query(
    `SELECT * FROM "Users" 
        WHERE "user_email" = $1`,
    [email]
  );

  if (!result.rows.length) {
    return res.json({ message: "Password reset link sent if user exists" });
  }

  const user = result.rows[0];

  const resetToken = jwt.sign({ email: user.user_email }, JWT_ENV.SECRET, {
    expiresIn: JWT_ENV.RESET_TIME,
  });

  const resetLink = `${CLIENT_ENV.URL}/resetpassword?token=${resetToken}`;

  const transporter = require("../config/email");
  await transporter.sendMail({
    from: EMAIL_ENV.EMAIL_USER,
    to: user.user_email,
    subject: "Password Reset Request",
    html: `
        <p>Click this link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link expires in 15 minutes.</p>
      `,
  });

  res.json({ message: "Password reset link sent if user exists1" });
});

router.post(API_ROUTES.USERS.RESET_PASS, async (req, res) => {
  const { token, newPassword } = req.body;

  const decoded = jwt.verify(token, JWT_ENV.SECRET);

  const result = await db.query(`SELECT * FROM "Users" WHERE user_email = $1`, [
    decoded.email,
  ]);

  if (!result.rows.length) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const hashedPassword = await encrypt(newPassword);

  await db.query(
    `UPDATE "Users" 
       SET user_password = $1 
       WHERE user_email = $2`,
    [hashedPassword, decoded.email]
  );

  res.json({ message: "Password updated successfully" });
});

module.exports = router;
