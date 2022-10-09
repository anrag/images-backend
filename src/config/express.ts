import { fetchPeexlesImages, fetchPixabayImages } from '@server/utils/pixabay';
import express from 'express';
import fs from 'fs';
const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.get('/fetch', async (_req, res) => {
    const q: string = (_req.query?.name as string) || 'india';
    const limit: number = _req.query?.name ? 25 : 150;
    const page = parseInt(_req.query?.page as string) || 1;
    if (fs.existsSync(`images.json`) && (q === null || q === undefined || q !== 'india')) {
      let readFile = fs.readFileSync('images.json', 'utf-8');
      readFile = JSON.parse(readFile);
      res.send([...readFile]);
    } else {
      Promise.all([fetchPeexlesImages(q, page, limit), fetchPixabayImages(q, page, limit)]).then(async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fs.writeFile(`images.json`, JSON.stringify([...data]), { flag: 'wx' }, (err) => {
          if (err) console.log(err);
        });
        res.send([...data]);
      });
    }
  });

  return app;
};

export { createServer };
