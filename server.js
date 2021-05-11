const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');
const app = express();
const slugify = require('slugify')

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))


app.get('/get_info', async (req, res) => {
    let URL = req.query.URL;
    let data = await ytdl.getInfo(URL)
    res.status(200).send({
        name: data.videoDetails.title,
        img: data.videoDetails.thumbnails.reverse()[0].url
    })
})

app.get('/download_video', (req, res)=>{ 
      let URL = req.query.URL;
      let name = req.query.name;
      let generate = slugify(name, {
          replacement: '-', 
          remove: undefined, 
          lower: false,     
          strict: false,     
          locale: 'vi'       
        })
      res.setHeader('Content-Disposition', `attachment; filename="anonym-${generate}.mp4"`)
      const video = ytdl(URL, {
          quality: 'highestvideo',
          filter: 'videoandaudio',
          format: 'mp4'
      })
      video.pipe(res)
})

app.get('/download_audio', (req, res)=>{ 
    let URL = req.query.URL;
    let name = req.query.name;
    let generate = slugify(name, {
        replacement: '-', 
        remove: undefined, 
        lower: false,     
        strict: false,     
        locale: 'vi'       
      })
    res.setHeader('Content-Disposition', `attachment; filename="anonym-${generate}.mp3"`)
    const audio = ytdl(URL, {
        quality: 'highestaudio',
        filter: "audioonly",
        format: 'mp3'
    })
    audio.pipe(res)
})

app.listen(process.env.POST || 8080, () => {
    console.log('Server Works !!!');
});