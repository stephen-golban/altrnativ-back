export default {
  port: 3000,
  jwt_secret: "altrnativ",
  db: {
    name: "test",
    // url: "mongodb://mongo:oFXffZHpWPZjG8bb894k@containers-us-west-51.railway.app:6491",
  },
};

export function generateSixDigitCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}
