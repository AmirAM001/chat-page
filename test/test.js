const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const dataFilePath = path.join(__dirname, "data.json");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    // مسیر /list → نمایش داده‌ها از JSON
    if (req.url === "/list") {
      fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
          res.end("<h1>هنوز داده‌ای ثبت نشده.</h1>");
          return;
        }

        let users = [];
        try {
          users = JSON.parse(data);
        } catch (e) {
          users = [];
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.write("<h1>لیست کاربران</h1><ul>");
        users.forEach(u => {
          res.write(`<li>${u.name} - ${u.email}</li>`);
        });
        res.write("</ul><a href='/'>بازگشت</a>");
        res.end();
      });
      return;
    }

    // مسیرهای معمولی
    let filePath = "";
    if (req.url === "/") {
      filePath = path.join(__dirname, "index.html");
    } else if (req.url === "/about") {
      filePath = path.join(__dirname, "about.html");
    } else {
      filePath = path.join(__dirname, "404.html");
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=UTF-8" });
        res.end("Server Error");
      } else {
        res.writeHead(req.url === "/about" || req.url === "/" ? 200 : 404, {
          "Content-Type": "text/html; charset=UTF-8"
        });
        res.end(content);
      }
    });

  } else if (req.method === "POST" && req.url === "/submit") {
    // دریافت داده‌ها از فرم
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedData = querystring.parse(body);

      // خواندن فایل JSON و اضافه کردن رکورد جدید
      fs.readFile(dataFilePath, "utf8", (err, data) => {
        let users = [];
        if (!err) {
          try {
            users = JSON.parse(data);
          } catch (e) {
            users = [];
          }
        }

        users.push({ name: parsedData.name, email: parsedData.email });

        fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), err => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=UTF-8" });
            res.end("خطا در ذخیره داده");
          } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
            res.end(`
              <h1>دریافت و ذخیره شد!</h1>
              <p>نام: ${parsedData.name}</p>
              <p>ایمیل: ${parsedData.email}</p>
              <a href="/list">مشاهده لیست کاربران</a>
            `);
          }
        });
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
