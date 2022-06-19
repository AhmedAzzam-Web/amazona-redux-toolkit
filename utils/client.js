import sanityClient from "@sanity/client";
import { config } from "./config";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: '2021-10-21',
  useCdn: true,
})

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source).url()