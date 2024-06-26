import { faker } from '@faker-js/faker';

export const generateFakeImages = (lenght:number)=>{
    const images:string[] = [];
    for(var i=0;i<lenght;i++){
        images.push(faker.image.url());
    }
    return images;
}