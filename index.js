import slack from 'slack';
import { argv } from 'yargs';

const { token, botToken } = argv;

const bot = slack.rtm.client();

slack.channels.create({ token, name: 'test-bot2' }, (err, data) => {
  if (err) {
    console.error('error joining channel', err.message);

    switch (err.message) {
      case 'name_taken': {
        break;
      }
      default: {
        return;
      }
    }
  }

  slack.channels.invite({
    token,
    channel: 'test-bot2',
    user: 'glueconnect'
  }, (err, data) => {
    if (err) {
      console.log('error inviting to channel', err.message);
      return;
    }
    console.log('added user!');
  })
});

bot.listen({ token: botToken });

bot.message(message => {
  switch(message.type) {
    case 'message': {
      slack.users.info({ token, user: message.user }, (err, data) => {
        if (err) {
          console.error('error getting user info', err);
          return;
        }
        console.log('user', data);
      });
    }
  }
  console.log('message', message)
});

console.log('started');
