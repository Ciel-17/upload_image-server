const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/uploads", // 配置文件存储位置
  filename: function (req, file, cb) {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const day = data.getDate();
    const hour = data.getHours();
    const minute = data.getMinutes();
    const second = data.getSeconds();
    const millisecond = data.getMilliseconds();
    const randomNum = Math.floor(Math.random() * 1000000);
    const filename = `${year}-${month}-${day}-${hour}-${minute}-${second}-${millisecond}-${randomNum}`;
    // 获取文件扩展名
    const fileExt = file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null, `${filename}${fileExt}`);
  },
});

const upload = multer({ storage });
/* POST image listing. */
router.post("/upload", upload.single("image"), function (req, res, next) {
  res.send({
    success: true,
  });
  //   res.statusCode = 400;
  //   res.end();
});

router.get("/search", function (req, res) {
  const { page = 1, size = 20 } = req.query;
  //   读取文件
  const imgs = fs.readdirSync(path.join(__dirname, "../public/uploads"));

  res.json(
    imgs
      .slice((page - 1) * size, page * size)
      .map((v) => new URL(`uploads/${v}`, "http://localhost:3001"))
  );
});

module.exports = router;
