export default {
  port: 3000,
  jwt_secret: "altrnativ",
  db: {
    name: "test",
    url: "mongodb://mongo:3BZxkp1rJNDPK93NveZT@containers-us-west-64.railway.app:6058",
  },
};

export function generateSixDigitCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}
