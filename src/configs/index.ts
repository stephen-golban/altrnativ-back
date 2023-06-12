export default {
  port: 3000,
  jwt_secret: "altrnativ",
  db: {
    name: "test",
  },
};

export function generateSixDigitCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}
