export interface User {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  img?: string,
}

export const USERS: User[] = [
  {
    id: 1,
    firstname: 'Joe',
    lastname: 'Biden',
    email: 'jbiden@april.biz',
    phone: '1-770-736-8031 x56442',
    img: 'https://www.whitehouse.gov/wp-content/uploads/2021/04/P20210303AS-1901-cropped.jpg?resize=768,576',
  },
  {
    id: 2,
    firstname: 'Donald',
    lastname: 'Trump',
    email: 'dtrump@april.biz',
    phone: '1-770-736-8032 x56443',
    img: 'https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg?resize=640,640'
  },
  {
    id: 3,
    firstname: 'Barack',
    lastname: 'Obama',
    email: 'bobama@april.biz',
    phone: '1-770-736-8033 x56444',
    img: 'https://www.whitehouse.gov/wp-content/uploads/2021/01/44_barack_obama.jpg?resize=640,640'
  },
  {
    id: 4,
    firstname: 'George W.',
    lastname: 'Bush',
    email: 'gwbush@april.biz',
    phone: '1-770-736-8034 x56445',
    img: 'https://www.whitehouse.gov/wp-content/uploads/2021/01/43_george_w_bush.jpg?resize=640,640'
  },
  {
    id: 5,
    firstname: 'Bill',
    lastname: 'Clinton',
    email: 'bclinton@april.biz',
    phone: '1-770-736-8035 x56446',
    img: 'https://www.whitehouse.gov/wp-content/uploads/2021/01/42_bill_clinton.jpg?resize=640,640'
  },
  {
    id: 6,
    firstname: 'George H.W.',
    lastname: 'Bush',
    email: 'hwbush@april.biz',
    phone: '1-770-736-8036 x56447',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/George_H._W._Bush_presidential_portrait_%28cropped%29.jpg/1024px-George_H._W._Bush_presidential_portrait_%28cropped%29.jpg'
  }
];
