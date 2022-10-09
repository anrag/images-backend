import { searchImages } from 'pixabay-api';
import pexels from 'pexels';

const pexelsClient = pexels.createClient(process.env.PEXELES_KEY);
export const fetchPixabayImages = async (q: string, page: number, count: number): Promise<imageApiResponse[]> => {
  const getImages = await searchImages(process.env.PIXABAY_KEY, q ? q : 'shiva', {
    image_type: 'all',
    orientation: 'vertical',
    page: page || 1,
    per_page: count || 25,
  });

  return transformResponse(getImages.hits);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchPeexlesImages = async (q: string, page: number, count: number): Promise<imageApiResponse[]> => {
  const getImages = await pexelsClient.photos.search({
    page: page || 1,
    per_page: count || 25,
    query: q ? q : 'shiva',
  });
  return transformResponse(getImages['photos']) || [];
};

// DEFINE INTERFACE AT THE BOTTOM ONLY

export interface ImageResponse {
  /**
   * The total number of hits.
   */
  total: number;
  /**
   * The number of videos accessible through the API. By default, the API is limited to return a
   * maximum of 500 videos per query.
   */
  totalHits: number;
  /**
   * The current images
   */
  hits: ImageHit[];
}

export interface ImageHit {
  /**
   * 	A unique identifier for updating expired image URLs
   */
  id: number;
  /**
   * Source page on Pixabay, which provides a download link for the original image of the
   * dimension imageWidth x imageHeight and the file size imageSize
   */
  pageURL: string;
  /**
   * Type of image
   */
  type: string;
  /**
   * Comma separated list of photo tags
   */
  tags: string;
  /**
   * Low resolution images with a maximum width or height of 150 px (previewWidth x previewHeight)
   */
  previewUrl: string;
  /**
   * Preview image width
   */
  previewWidth: number;
  /**
   * Preview image height
   */
  previewHeight: number;
  /**
   * 	Medium sized image with a maximum width or height of 640 px (webformatWidth x webformatHeight).
   * URL valid for 24 hours.
   */
  webformatURL: string;
  /**
   * Web format width
   */
  webformatWidth: number;
  /**
   * Web format height
   */
  webformatHeight: number;
  /**
   * Image width
   */
  imageWidth: number;
  /**
   * Image height
   */
  imageHeight: number;
  /**
   * Image size (width * height)
   */
  imageSize: number;
  /**
   * Total number of views
   */
  views: number;
  /**
   * 	Total number of downloads
   */
  downloads: number;
  /**
   * Total number of favorites
   */
  favorites: number;
  /**
   * Total number of likes
   */
  likes: number;
  /**
   * Total number of comments
   */
  comments: number;
  /**
   * User ID of the contributor. Profile URL: https://pixabay.com/users/{ USERNAME }-{ ID }
   */
  user_id: number;
  /**
   * User name of the contributor. Profile URL: https://pixabay.com/users/{ USERNAME }-{ ID }
   */
  user: string;
  /**
   * Profile picture URL (250 x 250 px).
   */
  userImageURL: string;
}

interface imageApiResponse {
  id: string;
  previewUrl: string;
  orignalUrl: string;
  author: string;
  name: string;
}

const transformResponse = (response) => {
  const newImageArray: imageApiResponse[] = [];

  response.forEach((element) => {
    newImageArray.push({
      id: element.id,
      previewUrl: element?.webformatURL ? element?.webformatURL : element?.src?.large,
      orignalUrl: element?.webformatURL ? element?.largeImageURL : element?.src?.original,
      author: element?.photographer ? element?.photographer : element?.user,
      name: element?.tags ? element?.tags : element?.alt,
    });
  });

  return newImageArray;
};
