const handle = require('./dist/api/webhook').default;
const req = {
  method: 'POST',
  body: {"update_id": 1, "message": {"message_id": 1, "chat": {"id": 1387840212, "type": "private"}, "date": 1600000000, "text": "/start", "from": {"id": 1387840212, "is_bot": false, "first_name": "Test"}}}
};
const res = {
  status: (code) => {
    console.log('Status:', code);
    return {
      send: (msg) => console.log('Response:', msg)
    };
  }
};
handle(req, res).then(() => console.log('Done')).catch(console.error);
