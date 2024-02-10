interface CarouselItem {
  id: number;
  picture: string;
  name: string;
}

const authors: CarouselItem[] = [
  {
    id: 1,
    name: 'Gabriel García Márquez',
    picture: 'https://www.biografiasyvidas.com/reportaje/garcia_marquez/fotos/garcia_marquez_420a.jpg'
  },
  {
    id: 2,
    name: 'J.K. Rowling',
    picture: 'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/HJENPANR7VBIBMKOCS4ZWXYVUI.jpg'
  },
  {
    id: 3,
    name: 'Haruki Murakami',
    picture: 'https://media.revistagq.com/photos/61a63d9efe590a137a76124e/1:1/w_2583,h_2583,c_limit/haruki-murakami.jpg'
  },
  {
    id: 4,
    name: 'Rubén Darío',
    picture: 'https://cdn.zendalibros.com/wp-content/uploads/2017/12/5-poemas-de-ruben-dario.jpg'
  },
  {
    id: 5,
    name: 'George Orwell',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/George_Orwell%2C_c._1940_%2841928180381%29.jpg/800px-George_Orwell%2C_c._1940_%2841928180381%29.jpg'
  },
  {
    id: 6,
    name: 'Gabriela Mistral',
    picture: 'https://portaluchile.uchile.cl/.imaging/default/dam/imagenes/Uchile/imagenes-contenidos-generales/6670_1_1951-gabriela-mistral-02-libro-revuelta_S/jcr:content.jpg'
  },
  {
    id: 7,
    name: 'Walter Isaacson',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Walter_Isaacson_VF_2012_Shankbone_2.JPG'
  },
  {
    id: 8,
    name: 'Gioconda Belli',
    picture: 'https://static.dw.com/image/65478079_605.jpg'
  },
  {
    id: 9,
    name: 'Suzanne Collins',
    picture: 'https://m.media-amazon.com/images/M/MV5BMTQyODc5Nzc2MF5BMl5BanBnXkFtZTcwNDAwODgxOA@@._V1_FMjpg_UX1000_.jpg'
  },
  {
    id: 10,
    name: 'Stephen King',
    picture: 'https://images-na.ssl-images-amazon.com/images/S/amzn-author-media-prod/fkeglaqq0pic05a0v6ieqt4iv5.jpg'
  }
];

export default authors;
