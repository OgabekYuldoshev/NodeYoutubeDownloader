const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const path = require("path");
const app = express();
const slugify = require("slugify");

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("youtube", {
    error: null,
    video: null,
  });
});

app.post("/", async (req, res) => {
  try {
    let data = await ytdl.getInfo(req.body.LINK);
    res.render("youtube", {
      error: null,
      video: {
        name: data.videoDetails.title,
        img: data.videoDetails.thumbnails.reverse()[0].url,
        url: req.body.LINK,
      },
    });
  } catch (error) {
    console.log(error);
    res.render("youtube", {
      error: "Xatolik",
      video: null,
    });
  }
});

app.get("/video", (req, res) => {
  let URL = req.query.LINK;
  let name = req.query.name;
  let generate = slugify(name, {
    replacement: "-",
    remove: undefined,
    lower: false,
    strict: false,
    locale: "vi",
  });
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${generate}-download.mp4"`
  );
  const video = ytdl(URL, {
    quality: "highestvideo",
    filter: "videoandaudio",
    format: "mp4",
  });
  video.pipe(res);
});

app.get("/audio", (req, res) => {
  let URL = req.query.LINK;
  let name = req.query.name;
  let generate = slugify(name, {
    replacement: "-",
    remove: undefined,
    lower: false,
    strict: false,
    locale: "vi",
  });
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${generate}-download.mp3"`
  );
  const audio = ytdl(URL, {
    quality: "highestaudio",
    filter: "audioonly",
    format: "mp3",
  });
  audio.pipe(res);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server Works !!!");
});
