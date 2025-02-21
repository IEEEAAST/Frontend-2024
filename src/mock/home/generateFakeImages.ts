import { faker } from '@faker-js/faker'

export const generateFakeImages = (length: number): string[] => {
  const images: string[] = [];
  for (let i = 0; i < length; i++) {
    images.push(faker.image.imageUrl());
  }
  return images;
};
