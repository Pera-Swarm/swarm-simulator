
// TODO: Add an option to add new subscription / remove subscriptions to the route list even after init

class MQTTRouter {
   constructor(mqttConnection, onError, routes, options, setup) {
      this.mqttClient = mqttConnection;
      this.errorHandler = onError;
      if (Array.isArray(routes)) {
         this.routes = routes;
      } else {
         this.routes = [
            {
               topic: 'v1/',
               subscriber: (mqtt, topic, msg) => {
                  data = JSON.parse(msg);
                  console.log("Default Subscriber picked up the topic", data);
               }
            }
         ];
      }
      if (options !== undefined) {
         this.options = options;
      } else {
         this.options = { qos: 2, rap: true, rh: true };
      }
      if (setup !== undefined) {
         this.setup = setup;
      } else {
         this.setup = null;
      }

   }

   /**
   * method for starting the mqtt handler
   */
   start = () => {
      console.log('start fn');
      this.mqttClient.on('connect', () => {
         console.log('connect fn');
         this.handleRouteSubscriptions();
         if (this.setup !== null) {
            this.setup();
         }

      });

      this.mqttClient.on('error', (err) => {
         console.log('error fn');
         this.errorHandler(err);
      });

      this.mqttClient.on('message', (topic, message, packet) => {
         console.log('message fn');
         var msg = message.toString();
         if (packet.retain === false) {
            console.log('new msg');
            this.retainFalseLogic(topic, msg, packet);
         }else{
            // Also accept older messages
            console.log('older msg');
            this.retainTrueLogic(topic, msg, packet);
         }
      });

   }

   /**
   * method for handling the subscriptions for the topics in the routes list.
   */
   handleRouteSubscriptions = () => {
      for (var i = 0; i < this.routes.length; i++) {
         console.log(this.routes[i]);
         this.mqttClient.subscribe(this.routes[i].topic, this.options);
         console.log('Subscribed to', this.routes[i].topic);
      }
   }

   /**
   * method for handling messages on retain false subscription.
   */
   retainFalseLogic = (topic, message, packet) => {
      for (var i = 0; i < this.routes.length; i += 1) {
         if (this.routes[i].topic === topic) {
            this.routes[i].handler(this.mqttClient, topic, message);
         }
      }
   }

   /**
   * method for handling messages on retain true subscription.
   */
   retainTrueLogic = (topic, message, packet) => {
      console.log('older message handling', message);
   }
}

module.exports = MQTTRouter;
