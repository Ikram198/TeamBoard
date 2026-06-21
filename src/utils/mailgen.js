import mailgen from 'mailgen';

const mailGenerator = new mailgen({
  theme: 'default',
  product: {
    name: 'TEAMBOARD',
    link: 'https://yourcompany.com',
  },
});

export default mailGenerator;