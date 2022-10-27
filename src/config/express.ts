import { fetchPeexlesImages, fetchPixabayImages } from '@server/utils/pixabay';
import express from 'express';
import fs from 'fs';
import path from 'path';
const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.get('/readNews', (_req, res) => {
    let readFile: any = fs.readFileSync('news.txt', 'utf-8');
    readFile = `[${readFile.substring(0, readFile.length - 1)}]`;
    readFile = JSON.parse(readFile);
    res.jsonp({
      items: readFile.length,
      news: readFile,
    });
  });
  app.post('/addArticle', async (_req, res) => {
    let readFile: any = fs.readFileSync('news.txt', 'utf-8');
    readFile = `[${readFile.substring(0, readFile.length - 1)}]`;
    readFile = JSON.parse(readFile);
    // const indexofNews = Array.prototype.findIndex(readFile);
    const indexofNews = readFile.findIndex((e) => e.title === _req.body?.title);
    if (indexofNews == -1) {
      fs.writeFile(
        `news.txt`,
        `${JSON.stringify({ ..._req.body, createdAt: new Date() }) + ','}`,
        { flag: 'wx' },
        (err) => {
          if (err) console.log(err);
        },
      );
      res.jsonp({ message: 'Article Saved Succesfully' });
      return;
    } else {
      res.jsonp({
        message: 'News Article Already Exists',
        news: readFile[indexofNews],
      });
    }
  });

  app.get('/privacy', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    res.sendFile(path.join(__dirname + '/privacy.html'));
  });

  app.get('/fetch', async (_req, res) => {
    const q: string = (_req.query?.name as string) || 'india';
    const limit: number = _req.query?.name ? 25 : 150;
    const page = parseInt(_req.query?.page as string) || 1;
    if (fs.existsSync(`images.json`) && (q === null || q === undefined || q === 'india')) {
      let readFile = fs.readFileSync('images.json', 'utf-8');
      readFile = JSON.parse(readFile);
      res.send([...readFile]);
    } else {
      Promise.all([fetchPeexlesImages(q, page, limit), fetchPixabayImages(q, page, limit)]).then(async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fs.writeFile(`images.json`, JSON.stringify([...data]), { flag: 'wx' }, (err) => {
          if (err) console.log(err);
        });
        if (data[0].length > 0 || data[1].length > 0) res.send([...data]);
        else res.send([]);
      });
    }
  });

  return app;
};

export { createServer };
