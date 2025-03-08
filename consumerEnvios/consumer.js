const amqplib = require("amqplib/callback_api");

const urlServerRabbitMQ = "amqp://ale:ale123@ec2-3-83-91-51.compute-1.amazonaws.com/";
const queue = "envios";

function sendMessageToQueue(message) {
  amqplib.connect(urlServerRabbitMQ, function (error0, connection) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(message));
      console.log(" [x] Sent %s", message);

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  });
}

sendMessageToQueue(message);
